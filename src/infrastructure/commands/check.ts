import {command} from "cleye";
import {intro, log, outro} from "@clack/prompts";
import {COMMANDS} from "src/infrastructure/commands/enums.ts";
import {outroError, outroSuccess} from "src/infrastructure/utils/prompts.ts";
import FileConfigProvider from "src/infrastructure/config/FileConfigProvider.ts";
import chalk from "chalk";
import {ContextFactory} from "src/domain/context/ContextFactory.ts";
import GlobFileExplorer from "src/infrastructure/file/GlobFileExplorer.ts";
import ModelResolver from "src/infrastructure/model/ModelResolver.ts";

enum OBJECT {
  config = "config",
  files = "files",
  models = "models"
}
export const configCommand = command(
  {
    name: COMMANDS.check,
    parameters: ["<object>"],
  },
  async (argv) => {
    intro("Milow — check");

    const { object } = argv._;

    if(object === OBJECT.config) {
      const config = new FileConfigProvider().get();
      log.message([
        "Config :",
        JSON.stringify(config, null, 2)
      ].join("\n"));

    } else if (object === OBJECT.models) {

      const models = new ModelResolver().getModelNames();
      log.message([
        "Models :",
        models.map((model) => `   - ${chalk.green(model)}\n`).join("")
      ].join("\n"));

    } else if (object === OBJECT.files) {
      const config = new FileConfigProvider().get();
      const files = (new GlobFileExplorer(config.viewableFilesPattern, config.contextFilesPattern)).getViewableFiles();

      log.message([
        "Files :",
        files.map((file) => `   - ${chalk.green(file)}\n`).join("")
      ].join("\n"));
    } else {
      outroError(`Unsupported object: ${object}. Valid objects are: "config", "files", and "models"`);
      return;
    }

    outroSuccess("");
  }
);