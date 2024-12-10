import ConfigProvider from "src/infrastructure/config/ConfigProvider.ts";
import Config from "src/infrastructure/config/Config.ts";
import FSFileReader from "src/infrastructure/file/FSFileReader.ts";
import { readFileSync } from "fs";

export default class FileConfigProvider implements ConfigProvider {
  constructor() {}
  get(): Config {
    const configContent = readFileSync("./milow.config.json").toString();

    if (configContent === null) {
      throw new Error("config file does not exist");
    }

    return JSON.parse(configContent) as Config;
  }
}
