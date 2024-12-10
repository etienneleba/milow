import { intro, outro } from "@clack/prompts";
import { command } from "cleye";
import { COMMANDS } from "./enums.ts";
import Milow from "src/domain/api/Milow.ts";
import FSFileReader from "src/infrastructure/file/FSFileReader.ts";
import FSFileManipulator from "src/infrastructure/file/FSFileManipulator.ts";
import BunTestRunner from "src/infrastructure/test/BunTestRunner.ts";
import FileConfigProvider from "src/infrastructure/config/FileConfigProvider.ts";
import GlobFileExplorer from "src/infrastructure/file/GlobFileExplorer.ts";
import ConsoleUserInteraction from "src/infrastructure/ui/ConsoleUserInteraction.ts";
import chalk from "chalk";
import ModelResolver from "src/infrastructure/model/ModelResolver.ts";
import { outroError, outroSuccess } from "src/infrastructure/utils/prompts.ts";
import ExitException from "src/domain/exception/ExitException.ts";

export const runCommand = command(
  {
    name: COMMANDS.run,
    parameters: ["[testFilePath]"],
  },
  async (argv) => {
    intro(`Hey ! I'm Milo${chalk.green("w")}, let me help you ! 🚀`);

    const config = new FileConfigProvider().get();

    const model = new ModelResolver().resolve(config.model);
    model.modelName = config.model;
    model.apiKey = config.apiKey;

    const milow = new Milow(
      model,
      new FSFileReader(),
      new FSFileManipulator(),
      new BunTestRunner(config.testCommand),
      new GlobFileExplorer(
        config.viewableFilesPattern,
        config.contextFilesPattern,
      ),
      new ConsoleUserInteraction(),
    );

    try {
      await milow.fixTests();
    } catch (e: Error) {
      outroError(e.message);
    }

    outro(`🤖 : ${chalk.whiteBright("Bye ! Have a good day !")}`);

    process.exit(0);
  },
);
