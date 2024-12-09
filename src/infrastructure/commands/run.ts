import {intro} from "@clack/prompts";
import {command} from "cleye";
import {COMMANDS} from "./enums.ts";
import Milow from "src/domain/api/Milow.ts";
import OpenAIModel from "src/infrastructure/model/OpenAIModel.ts";
import FSFileReader from "src/infrastructure/file/FSFileReader.ts";
import FSFileManipulator from "src/infrastructure/file/FSFileManipulator.ts";
import BunTestRunner from "src/infrastructure/test/BunTestRunner.ts";
import FileConfigProvider from "src/infrastructure/config/FileConfigProvider.ts";
import GlobFileExplorer from "src/infrastructure/file/GlobFileExplorer.ts";
import ConsoleUserInteraction from "src/infrastructure/ui/ConsoleUserInteraction.ts";
import chalk from "chalk";

export const runCommand = command(
    {
        name: COMMANDS.run,
        parameters: ["[testFilePath]"],
    },
    async (argv) => {
        intro(`Hey ! I'm Milo${chalk.green("w")}, let me help you ! 🚀`);

        const config = (new FileConfigProvider(new FSFileReader())).get();

        const milow = new Milow(
            new OpenAIModel(
                config.apiKey,
                config.model
            ),
            new FSFileReader(),
            new FSFileManipulator(),
            new BunTestRunner(config.testCommand),
            new GlobFileExplorer(config.viewableFilesPattern),
            new ConsoleUserInteraction()
        );

        await milow.fixTests();

        process.exit(0);

    }
);
