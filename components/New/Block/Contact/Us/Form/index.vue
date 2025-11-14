<template>
  <NewCard :class-content="contentClasses">
    <form :class="$style.core" @submit.prevent="sendMessage">
      <div :class="$style.grid">
        <NewInput v-model="letter.name" type="text" :label="labels.name" :errors="isNameValid" name="name" />
        <NewInput
          v-model="letter.email"
          type="text"
          :label="labels.email"
          :errors="isEmailValid"
          autocomplete="on"
          name="email"
        />
      </div>

      <div :class="$style.grid">
        <NewInput v-model="letter.country" type="text" :label="labels.country" name="country" />
        <NewInput v-model="letter.companyName" type="text" :label="labels.companyName" name="company" />
      </div>

      <NewTextarea
        v-model="letter.message"
        :label="labels.message"
        rows="6"
        type="text"
        :errors="isMessageValid"
        name="message"
      />

      <div :class="$style.btn">
        <NewButton type="submit" :disabled="disabled">Send Message</NewButton>
      </div>
    </form>
  </NewCard>
</template>

<script lang="ts">
import Vue from "vue";
import NewButton from "@/elements/New/Button/index.vue";
import NewCard from "@/elements/New/Card/index.vue";
import { ContactsService } from "@/api/api.service";
import NewInput from "@/elements/New/Input/index.vue";
import NewTextarea from "@/elements/New/Textarea/index.vue";
import { required, email } from "vuelidate/lib/validators";

export default Vue.extend({
  name: "NewBlockContactUsForm",

  components: { NewButton, NewCard, NewInput, NewTextarea },

  data() {
    return {
      disabled: false,
      letter: {
        name: "",
        email: "",
        message: "",
        country: "",
        companyName: "",
      },
      labels: {
        name: "Your name",
        country: "Country",
        companyName: "Company Name",
        message: "Anything we should know about your needs?",
        email: "Your email address",
      },
    };
  },

  validations: {
    letter: {
      name: { required },
      email: { required, email },
      message: { required },
    },
  },

  computed: {
    isNameValid() {
      return this.isValid("name", "Name must not be blank");
    },
    isEmailValid() {
      return this.isValid("email", "Must be a valid email");
    },
    isMessageValid() {
      return this.isValid("message", "Message must not be blank");
    },
    contentClasses() {
      return `${this.$style.content}`;
    },
  },

  methods: {
    async sendMessage() {
      if (this.$v.letter.$invalid) {
        this.$v.letter.$touch();
        return;
      }
      this.disabled = true;

      await ContactsService.sendMessage({
        name: this.letter.name,
        email: this.letter.email,
        message: `Country: ${this.letter.country} \nCompany: ${this.letter.companyName}\nMessage: ${this.letter.message}`,
      });

      this.letter.name = "";
      this.letter.email = "";
      this.letter.message = "";
      this.$v.letter.$reset();
      this.disabled = false;

      alert("You message was sent! We will answer soon. Thank you!");
    },
    isValid(field: string | number, message: string) {
      if (field === "email") {
        return this.$v.letter[field].$dirty && (!this.$v.letter[field].required || !this.$v.letter[field].email)
          ? [message]
          : [];
      } else {
        return this.$v.letter[field].$dirty && !this.$v.letter[field].required ? [message] : [];
      }
    },
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";
.content {
  @include desktop {
    padding: 48px !important;
  }
}
.core {
  display: grid;
  row-gap: 24px;
}
.grid {
  display: grid;
  gap: 16px;

  @include desktop {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}
.btn {
  display: grid;

  @include desktop {
    grid-template-columns: 158px;
  }
}
</style>
