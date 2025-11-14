import type { ServerRequirements } from "@/services/types/ServerRequirements";

export enum ConfiguratorType {
  cpu = "CPU",
  memory = "MEMORY",
  ram = "RAM",
}

export class ConfiguratorSlider {
  name: string;
  min: number = 0;
  max: number = 0;
  step: number = 1;
  value: number = 0;

  constructor(type: ConfiguratorType) {
    this.name = type;
  }

  public setCPURequirements(requirements: ServerRequirements) {
    ({ min: this.min, max: this.max, step: this.step } = ConfiguratorSlider.getCPURequirements(requirements));
    this.setCurrentValue(this.min);
  }

  public setRAMRequirements(requirements: ServerRequirements) {
    ({ min: this.min, max: this.max, step: this.step } = ConfiguratorSlider.getRAMRequirements(requirements));
    this.setCurrentValue(this.min);
  }

  public setMemoryRequirements(requirements: ServerRequirements) {
    ({ min: this.min, max: this.max, step: this.step } = ConfiguratorSlider.getMemoryRequirements(requirements));
    this.setCurrentValue(this.min);
  }

  private setCurrentValue(value: number) {
    this.value = value;
  }

  private static getCPURequirements(requirements: ServerRequirements) {
    return {
      min: requirements.cpu_min,
      max: requirements.cpu_max,
      step: requirements.cpu_step,
    };
  }

  private static getRAMRequirements(requirements: ServerRequirements) {
    return {
      min: ConfiguratorSlider.convertRamToGb(requirements.ram_min),
      max: ConfiguratorSlider.convertRamToGb(requirements.ram_max),
      step: ConfiguratorSlider.convertRamToGb(requirements.ram_step),
    };
  }

  private static getMemoryRequirements(requirements: ServerRequirements) {
    /*
     * TODO:
     * Проблема была всегда, это так старые BIOS работают, которые мы и эмулируем.
     * Они не умеют работать с таблицей разделов GPT, только MBR.
     * А MBR понимает размеры только до 2тб включительно.
     */
    const convertedMin = ConfiguratorSlider.convertRamToGb(requirements.disk_min);
    const convertedMax = ConfiguratorSlider.convertRamToGb(requirements.disk_max);
    const convertedStep = ConfiguratorSlider.convertRamToGb(requirements.disk_step);
    let limit = 2 * 1000; // 2 Tb
    limit = limit - (limit % convertedStep);

    return {
      min: convertedMin,
      max: convertedMax > limit ? limit : convertedMax,
      step: convertedStep,
    };
  }

  private static convertRamToGb(value: number) {
    return value / 1024;
  }

  private static convertRamToMb(value: number) {
    return value * 1024;
  }

  get selectedConfiguration() {
    if (this.name === ConfiguratorType.ram) {
      return ConfiguratorSlider.convertRamToMb(this.value);
    }

    return this.value;
  }
}
