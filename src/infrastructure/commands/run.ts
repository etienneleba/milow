import {intro} from "@clack/prompts";
import {command} from "cleye";
import {COMMANDS} from "./enums.ts";

export const runCommand = command(
    {
        name: COMMANDS.run,
        parameters: ["[testFilePath]"],
    },
    async (argv) => {
        intro("milow is spinning 🪩");


        process.exit(0);

    }
);
