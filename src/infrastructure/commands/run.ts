import {intro} from "@clack/prompts";
import {command} from "cleye";
import {COMMANDS} from "./enums.ts";
import Milow from "src/domain/api/Milow.ts";
import OpenAIModel from "src/infrastructure/model/OpenAIModel.ts";
import FSFileReader from "src/infrastructure/file/FSFileReader.ts";
import FSFileManipulator from "src/infrastructure/file/FSFileManipulator.ts";
import BunTestRunner from "src/infrastructure/test/BunTestRunner.ts";
import FileConfigProvider from "src/infrastructure/config/FileConfigProvider.ts";

export const runCommand = command(
    {
        name: COMMANDS.run,
        parameters: ["[testFilePath]"],
    },
    async (argv) => {
        intro("milow is spinning 🪩");

        const config = (new FileConfigProvider()).get();




        const milow = new Milow(
            new OpenAIModel(),
            new FSFileReader(),
            new FSFileManipulator(),
            new BunTestRunner(config.testCommand)
        );

        process.exit(0);

    }
);
