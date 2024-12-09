import ConfigProvider from "src/infrastructure/config/ConfigProvider.ts";
import Config from "src/infrastructure/config/Config.ts";
import FSFileReader from "src/infrastructure/file/FSFileReader.ts";

export default class FileConfigProvider implements ConfigProvider {
  constructor(private readonly fsFileReader: FSFileReader) {}
  get(): Config {
    const configContent = this.fsFileReader.read("./milow.config.json");

    if (configContent === null) {
      throw new Error("config file does not exist");
    }

    return JSON.parse(configContent) as Config;
  }
}
