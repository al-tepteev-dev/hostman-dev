<template>
  <NewContent
    :color-subtitle="isPricingPage ? 'primary' : 'secondary'"
    data-test-id="tariffs-container"
    :header="header"
    header-justify="center"
    :size-title="$attrs['size-title']"
    width="996"
  >
    <template #tabs>
      <div :class="$style.controls">
        <div :class="$style.selectors">
          <NewSelect
            v-if="isPricingPage"
            v-model="service"
            :class="$style.productSelect"
            :options="serviceList"
            option-key="value"
            option-icon="icon"
            option-title="name"
            rounded
            @input="onServiceChange"
          />

          <NewSelect
            v-if="isAppsPage"
            v-model="service"
            :class="$style.productSelect"
            :options="appsTypes"
            option-key="value"
            option-title="name"
            rounded
            @input="onChangeAppsType"
          />

          <NewSelect
            v-if="isDbs"
            v-model="dbType"
            :class="$style.dbSelect"
            :options="dbaasTypes"
            option-key="value"
            option-icon="icon"
            option-title="name"
            rounded
            @input="onChangeDbaasType"
          />

          <NewSelect
            v-model="selectedLocation"
            :class="$style.countrySelect"
            :options="filteredLocationsList"
            option-key="code"
            option-icon="icon"
            option-title="name"
            rounded
            @input="onLocationChange"
          />
        </div>

        <NewTariffsPeriodSwitch :has-separator="!$isMobile" />
      </div>
    </template>

    <div v-if="hasTariffs">
      <section :class="$style.tariffs">
        <NewTariffsItem
          v-for="item in filteredTariffs"
          :key="item.id"
          :item="item"
          :apps-type="appsType"
          :default-bandwidth="isDbs ? '200' : undefined"
          :selected-region="selectedLocation"
          :selected-service="service"
          :tariffs="filteredTariffs"
        />

        <NewTariffsConfigurator v-if="isVds" :selected-region="selectedLocation" :selected-service="service" />
      </section>
    </div>
  </NewContent>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";

import PricingBase from "@/components/Pricing/pricing.vue";
import NewContent from "@/components/New/Content/index.vue";
import NewSelect from "@/elements/New/Select/index.vue";
import NewTariffsConfigurator from "@/components/New/Tariffs/Configurator/index.vue";
import NewTariffsItem from "@/components/New/Tariffs/Item/index.vue";
import NewTariffsPeriodSwitch from "@/components/New/Tariffs/Period/Switch/index.vue";
import type { Header } from "@/types/Header";
import type { ProductSeoData } from "@/types/ProductSeoData";

export default Vue.extend({
  name: "NewTariffs",

  components: { NewContent, NewSelect, NewTariffsConfigurator, NewTariffsItem, NewTariffsPeriodSwitch },

  extends: PricingBase,

  props: {
    productSeoData: {
      type: Object as () => ProductSeoData,
      required: true,
    },
    header: {
      type: Object as () => Header,
      required: true,
    },
  },

  computed: {
    seoOffersCount() {
      return this.tariffs.length;
    },
    seoOffersLowPrice() {
      return this.tariffs.at(0).price;
    },
    seoOffersHighPrice() {
      return this.tariffs.at(-1).price;
    },
  },

  created() {
    this.setType(true);
  },

  methods: {
    ...mapMutations(["setType"]),
  },
});
</script>

<style lang="scss" module>
@import "assets/styles/new/mixins";

.controls {
  display: grid;

  @include mobile {
    width: 100%;
    gap: 24px;
    padding: 0 var(--padding-content-y);
  }

  @include desktop {
    display: flex;
    align-items: center;
  }
}
.selectors {
  display: grid;
  gap: 8px;

  @include mobile {
    width: 100%;
  }

  @include desktop {
    display: flex;
    gap: 12px;
  }
  .productSelect {
    @include desktop {
      width: 255px;
    }
  }
  .dbSelect,
  .countrySelect {
    @include desktop {
      width: 197px;
    }
  }
}
.tariffs {
  display: grid;
  gap: 8px;

  @include desktop {
    gap: 12px;
  }
}
.tariffsInfo {
  display: none;

  @include desktop {
    display: block;
    margin-top: 32px;
    text-align: center;
  }
}
</style>
