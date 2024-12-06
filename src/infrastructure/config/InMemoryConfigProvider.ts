import ConfigProvider from "src/domain/config/ConfigProvider.ts";
import Config from "src/domain/config/Config.ts";

export default class InMemoryConfigProvider implements ConfigProvider {
    get(): Config {
        return new Config(
            "ls"
        );
    }

}