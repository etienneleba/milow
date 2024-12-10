import ConfigProvider from "src/infrastructure/config/ConfigProvider.ts";
import Config from "src/infrastructure/config/Config.ts";
import {existsSync, readFileSync} from "fs";
import {log, outro} from "@clack/prompts";
import chalk from "chalk";
import {outroError} from "src/infrastructure/utils/prompts.ts";
import * as process from "node:process";
import ModelResolver from "src/infrastructure/model/ModelResolver.ts";


enum CONFIG_PROPERTIES {
  testCommand = "testCommand",
  model = "model",
  viewableFilesPattern = "viewableFilesPattern",
  contextFilesPattern = "contextFilesPattern",
}


export default class FileConfigProvider implements ConfigProvider {

  private readonly configFilePath: string = "./milow.config.json";

  constructor() {
  }


  get(): Config {
    let configContent: string;
    if (existsSync(this.configFilePath)) {
      configContent = readFileSync(this.configFilePath).toString();
    } else {
      outroError(`Config file milow.config.json does not exist. Run ${chalk.green("milow init")} to create the config file`);
      process.exit();
    }

    if (!configContent) {
      outroError(`Config file milow.config.json is empty.Delete it and run ${chalk.green("milow init")} to create the config file`);
      process.exit();
    }

    const configObject = JSON.parse(configContent);

    this.checkPropertiesExist(configObject);

    const modelResolver = new ModelResolver();

    const modelNames = modelResolver.getModelNames();

    if(!modelNames.includes(configObject.model)) {
      outroError(`The model ${chalk.green(configObject.model)} is not supported yet by Milow. Check all the supported models with the command ${chalk.green("milow check models")}. Feel free to contribute to the project to add new models 🚀`);
      process.exit();
    }

    const modelProviderAPIKeyName = modelResolver.resolve(configObject.model).getAPIKeyName();

    const apiKey = process.env[modelProviderAPIKeyName];

    if(!apiKey) {
      outroError(`Please expose your api key. ${chalk.green("export " + modelProviderAPIKeyName +"=[your api key]")}`);
      process.exit();
    }


    return new Config(
      apiKey,
      configObject[CONFIG_PROPERTIES.testCommand],
      configObject[CONFIG_PROPERTIES.model],
      configObject[CONFIG_PROPERTIES.viewableFilesPattern],
      configObject[CONFIG_PROPERTIES.contextFilesPattern],
    );
  }

  private checkPropertiesExist(configObject: object) {
    const errors = [];
    for (const configProperty of Object.values(CONFIG_PROPERTIES)) {
      if (!configObject.hasOwnProperty(configProperty) || !configObject[configProperty]) {
        errors.push(configProperty)
      }
    }

    if (errors.length > 0) {
      for (const error of errors) {
        log.error(`The property ${error} is not defined or is empty in your config file. Check your config file and update it`);
      }

      outroError("Please update your config file")
      process.exit(0);
    }

  }
}


