import {log, intro, outro} from "@clack/prompts";
import {command} from "cleye";
import {COMMANDS} from "./enums.ts";
import fs from "fs";
import chalk from "chalk";

export const initCommand = command(
  {
    name: COMMANDS.init,
  },
  async (argv) => {
    intro("Milow is initializing 🐣");

    const configFilePath = 'milow.config.json';

    if (!fs.existsSync(configFilePath)) {
      fs.writeFileSync(configFilePath, JSON.stringify(
        {
          testCommand: "",
          model: "",
          viewableFilesPattern: "./{src,tests}/**",
          contextFilesPattern: "./docs/milow/**"
        }, null, 2
      ));

      log.step("The milow.config.json file has been created, take the time to specify the right value for your project\n");
    } else {
      log.step("The milow.config.json file already exist, next step is milow run");
    }

    log.step("Next step :\n" + [
      `   ☐ Create the documentation files in the ${chalk.green("./docs/milow")} directory to help Milow understand the context of your project (Business context, folder structure, architecture, test strategy, examples)`,
      "   ☐ Export the api key : ",
      `         - Open Ai : ${chalk.green("export OPENAI_API_KEY=[your api key]")}`
    ].join("\n"));

    outro("Initialization finished 🐥");
  },
);
