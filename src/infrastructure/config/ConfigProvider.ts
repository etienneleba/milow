import Config from "src/infrastructure/config/Config.ts";

export default interface ConfigProvider {
  get: () => Config;
}
