<template>
  <div v-if="error">{{ error }}</div>
  <div v-else>Processing...</div>
</template>

<script>
import { OAUTH_HASH_ATTRIBUTE, OAUTH_REG_EVENT, OAUTH_SERVICE_ATTRIBUTE } from "@/utils/OAuth";
import { OAuthService, RegistrationService } from "@/api/api.service";
import gtmEventFactory from "@/mixins/gtmEventFactory";
import { gtmAnalytics } from "@/utils/GTMAnalytics";
import { isSafari } from "@/utils/isSafari";

export default {
  mixins: [gtmEventFactory],

  layout: "oauth",

  asyncData({ query, redirect }) {
    if (!query.code) {
      redirect({
        path: "/",
      });
    }
  },

  data() {
    return {
      error: null,
    };
  },

  mounted() {
    const code = this.getIdentityCode();
    const state = this.getState();

    if (state.sHash !== localStorage.getItem(OAUTH_HASH_ATTRIBUTE)) return;
    const service = JSON.parse(localStorage.getItem(OAUTH_SERVICE_ATTRIBUTE));
    localStorage.removeItem(OAUTH_SERVICE_ATTRIBUTE);
    const event = localStorage.getItem(OAUTH_REG_EVENT);
    // eslint-disable-next-line
    console.log("Event from LS", event);
    localStorage.removeItem(OAUTH_REG_EVENT);
    const { provider, login } = state;
    this.authorize(provider, code, login, code, state, service, event);
  },
  methods: {
    autoLoginAfterOAuth(token, isMobile) {
      if (isSafari() || isMobile) {
        window.location.replace(`${process.env.APP_DOMAIN}/my/login/auto-login?token=${token}`);
      } else {
        window.opener.location.replace(`${process.env.APP_DOMAIN}/my/login/auto-login?token=${token}`);
        window.close();
      }
    },
    deleteOauthHash() {
      return localStorage.removeItem(OAUTH_HASH_ATTRIBUTE);
    },
    async authorize(provider, identity, login, code, state, service, event) {
      const redirect_uri = window.location.origin + window.location.pathname;
      const response = await OAuthService.authorization(provider, redirect_uri, identity, login);
      if (response?.token !== undefined) {
        this.deleteOauthHash();
        this.autoLoginAfterOAuth(response.token, this.$isMobile);
        return;
      }
      if (response?.customers !== undefined && response?.hash !== undefined) {
        const autologinURL = `${process.env.APP_DOMAIN}/my/oauth${window.location.search}`;
        if (!window.opener) {
          window.location.replace(autologinURL);
        } else {
          window.opener.location.replace(autologinURL);
          window.close();
        }
        return;
      }

      await this.register(state, code, service, event);
    },
    async register(state, code, service, event) {
      const { provider, path } = state;

      const userinfo = await OAuthService.getUserInfo({
        provider,
        code,
        redirect_uri: window.location.origin + window.location.pathname,
      });

      if (!userinfo.email) {
        this.error = "Your email in GitHub account is private. Please make it public and try again.";
      }

      const firstVisit = this.$cookis.get("aors_fc");
      const lastVisit = this.$cookis.get("aors_lc");
      const utmUser = this.$cookis.get("aors_user");

      const partnerCode = Number(this.form?.partnerCode) || this.$cookis.get("wmid") || utmUser?.UTM_Source;

      let partnerType;
      if (this.$cookis.get("wmid")) {
        partnerType = "webmaster";
      } else if (utmUser?.UTM_Medium === "hostman") {
        partnerType = "hosting_friend";
      }

      await this.$recaptchaLoaded();
      const recaptchaToken = await this.$recaptcha();
      const userData = await RegistrationService.registerUser({
        token: recaptchaToken,
        email: userinfo.email,
        full_name: userinfo.username,
        oauth_provider: userinfo.provider,
        oauth_key: userinfo.provider_key,
        partner_code: partnerCode,
        partner_type: partnerType,
        tags: this.getTags(provider),
        ...(service && { service }),
      });
      const { credentials, service: registrationServices } = userData?.registration;

      try {
        await RegistrationService.sendStatistics({
          customer_id: credentials.username,
          referer: {
            firstVisit,
            lastVisit,
          },
          utmUser,
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }

      const { token } = await RegistrationService.access({ ...credentials });

      let redirect = "/servers/create";
      if (registrationServices?.server) {
        redirect = registrationServices?.server ? "/servers/" + registrationServices?.server.id : "/servers/create";
      }

      if (registrationServices?.dbs) {
        redirect = "/database";
      }

      if (path?.includes("database") && !registrationServices?.dbs) {
        redirect = "/database/create";
      }

      if (service?.apps) {
        redirect = `/apps/create?type=${service.apps.type}&location=${service.apps.location}&preset=${service.apps.preset}`;
      } else if (path?.includes("paas")) {
        redirect = "/apps/create";
      }

      if (registrationServices?.balancer) {
        redirect = "/balancer";
      }

      const urlParams = new URLSearchParams({
        token,
        ...(redirect && { redirect }),
      });

      const autologinURL = `${process.env.APP_DOMAIN}/my/login/auto-login?${urlParams}`;

      const pageEvent = this.makePageEvent(path);
      if (pageEvent) {
        gtmAnalytics.send(pageEvent);
      }
      // eslint-disable-next-line no-console
      console.log(pageEvent);
      // eslint-disable-next-line no-console
      console.log(event);
      if (event?.includes("reg_popup")) {
        gtmAnalytics.send(event, {
          tutorials_event_url: "https://hostman.com" + path,
        });
      } else if (event === "popup_opentime_submitted") {
        gtmAnalytics.send(event, {
          url: "https://hostman.com" + path,
        });
      } else if (event) {
        gtmAnalytics.send(event, {
          url: "https://hostman.com" + path,
        });
      }

      this.deleteOauthHash();
      if (event || pageEvent) {
        setTimeout(() => this.redirectAfterSignUp(autologinURL), 300);
      } else {
        this.redirectAfterSignUp(autologinURL);
      }
    },

    redirectAfterSignUp(autologinURL) {
      if (!window.opener) {
        window.location.replace(autologinURL);
      } else {
        window.opener.location.replace(autologinURL);
        window.close();
      }
    },

    getIdentityCode() {
      return this.$route.query.code;
    },

    getState() {
      const decodedState = window.atob(String(this.$route.query.state));
      return JSON.parse(decodedState);
    },

    getTags(provider) {
      switch (provider) {
        case "github":
          return ["registration_github"];
        case "google":
          return ["registration_google"];
        default:
          return [""];
      }
    },

    deleteKeys(object) {
      const keys = ["path", "code", "provider"];
      Object.keys(object).forEach((key) => keys.includes(key) && delete object[key]);
      return object;
    },
  },
};
</script>
