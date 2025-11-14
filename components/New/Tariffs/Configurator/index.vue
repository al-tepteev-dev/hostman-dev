<template>
  <NewCard :class-content="$style.core">
    <div :class="$style.tariffItem">
      <div :class="$style.controls">
        <NewInputSlider
          v-for="configurator in [cpu, ram, memory]"
          :key="configurator.caption.title"
          v-model="configurator.slider.value"
          :class="$style.control"
          :max="configurator.slider.max"
          :min="configurator.slider.min"
          new-design
          :step="configurator.slider.step"
          :caption="configurator.caption"
          :is-loading="isLoading"
          @change="getPrice"
        />

        <div :class="[$style.ipSwitch, $style.controlThin]">
          <div class="body2 semibold">Public IP</div>
          <NewSwitch v-model="hasIp" />
        </div>
      </div>

      <div :class="$style.price">
        <div :class="$style.priceValue">
          <div class="semibold" :class="priceClasses">${{ totalPrice }}</div>
          <span :class="pricePeriodClasses">&nbsp;/mo</span>
        </div>
        <div v-if="hasSaveText" class="body4" :class="$style.saveText">Save 10%</div>
        <NewButton v-if="!$isMobile" :class="$style.action" size="md" @click="handleTariffClick(item)">
          Sign Up
        </NewButton>
      </div>

      <NewButton v-if="$isMobile" exponded size="md" @click="handleTariffClick(item)"> Sign Up </NewButton>
    </div>
  </NewCard>
</template>

<script lang="ts">
import Vue from "vue";
import Parent from "@/components/Pricing/PriceCard/priceCard.vue";
import NewButton from "@/elements/New/Button/index.vue";
import NewCard from "@/elements/New/Card/index.vue";
import NewInputSlider from "@/elements/New/Input/Slider/index.vue";
import NewSwitch from "@/elements/New/Switch/index.vue";
import { ConfiguratorSlider, ConfiguratorType } from "./Slider";
import type { Header } from "@/types/Header";
import type { ServerRequirements } from "@/services/configurator/types/ServerRequirements";
import type { ConfiguratorServer } from "@/services/configurator/types/ConfiguratorServerList";
import { configuratorApi } from "@/services/configurator/configuratorApi";

interface Data {
  hasIp: boolean;
  cpu: {
    slider: ConfiguratorSlider;
    caption: Header;
  };
  ram: {
    slider: ConfiguratorSlider;
    caption: Header;
  };
  memory: {
    slider: ConfiguratorSlider;
    caption: Header;
  };
  configuratorId: number;
  totalPrice: string;
  isLoading: boolean;
  server: ConfiguratorServer | null;
}

export default Vue.extend({
  name: "NewTariffsConfigurator",

  components: { NewButton, NewCard, NewInputSlider, NewSwitch },

  extends: Parent,

  props: {
    diskType: {
      type: String,
      default: "nvme",
    },
  },

  // TODO: убрать класс для слайдеров, т.к. это мешает запросу тарифов через fetch и рендеру конифгуратора из SSR
  data(): Data {
    return {
      hasIp: true,
      cpu: {
        slider: new ConfiguratorSlider(ConfiguratorType.cpu),
        caption: {
          title: "CPU",
          subtitle: "",
        },
      },
      ram: {
        slider: new ConfiguratorSlider(ConfiguratorType.ram),
        caption: { title: "RAM", subtitle: "Gb" },
      },
      memory: {
        slider: new ConfiguratorSlider(ConfiguratorType.memory),
        caption: { title: `${this.diskType === "nvme" ? "NVMe" : "SSD"}`, subtitle: "Gb" },
      },
      configuratorId: 0,
      totalPrice: "0",
      isLoading: false,
      server: null,
    };
  },

  computed: {
    hasSaveText() {
      return this.$isMobile && this.type;
    },
    priceClasses() {
      return this.$isMobile ? "h2" : "h3";
    },
    pricePeriodClasses() {
      return this.$isMobile ? "body1 medium" : "body2 semibold";
    },
  },

  watch: {
    hasIp() {
      this.getPrice();
    },
    type() {
      this.getPrice();
    },
    selectedRegion() {
      this.setup();
    },
  },

  created() {
    this.setup();
  },

  methods: {
    handleTariffClick() {
      this.openRegistrationModalWithConfigurator({
        configurator_id: this.configuratorId,
        cpu: this.cpu.slider?.selectedConfiguration,
        ram: this.ram.slider?.selectedConfiguration,
        disk: this.memory.slider?.selectedConfiguration * 1024,
        hasIp: this.hasIp,
      });
    },

    async setup() {
      this.isLoading = true;

      this.server = await this.getServer();
      this.setRequirements(this.server.requirements);
      this.getPrice();

      this.isLoading = false;
    },
    async getServer() {
      const server = await configuratorApi.getServer(this.selectedRegion, this.diskType);
      this.configuratorId = server.id;
      return server;
    },

    setRequirements(requirements: ServerRequirements) {
      this.cpu.slider.setCPURequirements(requirements);
      this.ram.slider.setRAMRequirements(requirements);
      this.memory.slider.setMemoryRequirements(requirements);
    },

    getPrice() {
      if (this.cpu.slider === null || this.ram.slider === null || this.memory.slider === null) {
        this.totalPrice = "0";
        return;
      }

      if (this.server?.prices) {
        const cpuPrice = (this.server.prices?.cpu || 0) * this.cpu.slider.selectedConfiguration;
        const drivePrice = (this.server.prices?.disk || 0) * this.memory.slider.selectedConfiguration;
        const ramPrice = (this.server.prices?.ram || 0) * (this.ram.slider.selectedConfiguration / 1024);
        const floatingIpPrice = this.hasIp ? 2 : 0;
        const calced = cpuPrice + drivePrice + ramPrice + floatingIpPrice;
        this.totalPrice = (this.type ? calced * 0.9 : calced).toFixed(1);
      }
      this.cpu.caption.subtitle = `${this.server?.cpu_frequency}Ghz`;
    },
  },
});
</script>

<style lang="scss" module>
@import "../Item/index";

.controls {
  display: grid;
  gap: 16px;
  @include mobile {
    margin: 16px 0;
  }
  @include desktop {
    display: flex;
    gap: 12px;
  }
}

.control {
  @include desktop {
    width: 164px;
  }
}

.controlThin {
  @include desktop {
    width: 154px;
  }
}

.ipSwitch {
  height: 48px;
  position: relative;
  background-color: var(--surface-secondary);
  border-radius: var(--border-control);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
</style>
