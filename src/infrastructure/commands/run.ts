import {intro} from "@clack/prompts";
import {command} from "cleye";
import {COMMANDS} from "./enums.ts";
import Milow from "src/domain/api/Milow.ts";
import OpenAIModel from "src/infrastructure/model/OpenAIModel.ts";
import FSFileReader from "src/infrastructure/file/FSFileReader.ts";

export const runCommand = command(
    {
        name: COMMANDS.run,
        parameters: ["[testFilePath]"],
    },
    async (argv) => {
        intro("milow is spinning 🪩");

        const milow = new Milow(
            new OpenAIModel(),
            new FSFileReader(),
        );

        process.exit(0);

    }
);
