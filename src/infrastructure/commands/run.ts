import {intro, outro} from "@clack/prompts";
import {command} from "cleye";
import {COMMANDS} from "./enums.ts";
import Milow from "src/domain/api/Milow.ts";
import FSFileManipulator from "src/infrastructure/file/FSFileManipulator.ts";
import BunTestRunner from "src/infrastructure/test/BunTestRunner.ts";
import FileConfigProvider from "src/infrastructure/config/FileConfigProvider.ts";
import FSFileExplorer from "src/infrastructure/file/FSFileExplorer.ts";
import ConsoleUserInteraction from "src/infrastructure/ui/ConsoleUserInteraction.ts";
import chalk from "chalk";
import ModelResolver from "src/infrastructure/model/ModelResolver.ts";
import {outroError, outroSuccess} from "src/infrastructure/utils/prompts.ts";
import ExitException from "src/domain/exception/ExitException.ts";
import {existsSync} from "fs";
import * as process from "node:process";

export const runCommand = command(
  {
    name: COMMANDS.run,
    flags: {
      testFilePath: {
        type: String,
        description: 'The path of the test file you want to focus on. This file is added after the test command you specify when running the tests',
        alias: "f"
      },
      prompt: {
        type: String,
        description: 'The prompt Milow will be focus on. This prompt will be kept in the context all the time',
        alias: "p"
      }
    }
  },
  async (argv) => {
    intro(`Hey ! I'm Milo${chalk.green("w")}, let me help you ! 🚀`);

    const {testFilePath, prompt} = validateFlags(argv.flags);

    const config = new FileConfigProvider().get();

    const model = new ModelResolver().resolve(config.model);
    model.modelName = config.model;
    model.apiKey = config.apiKey;

    const milow = new Milow(
      model,
      new FSFileManipulator(),
      new BunTestRunner(config.testCommand, testFilePath),
      new FSFileExplorer(
        config.viewableFilesPattern,
        config.contextFilesPattern,
      ),
      new ConsoleUserInteraction(),
    );

    try {
      await milow.fixTests(testFilePath, prompt);
    } catch (e: Error) {
      outroError(e.message);
    }

    outro(`🤖 : ${chalk.whiteBright("Bye ! Have a good day !")}`);

    process.exit(0);
  },
);

const validateFlags = (flags): {testFilePath: string|null, prompt: string|null} => {
  let { testFilePath, prompt} = flags;

  if(testFilePath === undefined) {
    testFilePath = null;
  }
  if(testFilePath !== null && testFilePath !== undefined) {
    if(!existsSync(testFilePath)) {
      outroError("The test file provided does not exist");
      process.exit(0)
    }
  }
  if(prompt === undefined) {
    prompt = null;
  }

  return {testFilePath, prompt};
}
