import Config from "src/domain/config/Config.ts";

export default interface ConfigProvider {
    get: () => Config;
}