import { cli } from "cleye";

import packageJSON from "./package.json";

import { configCommand } from "src/infrastructure/commands/check.js";
import { runCommand } from "src/infrastructure/commands/run.js";
import { initCommand } from "src/infrastructure/commands/init.js";

const extraArgs = process.argv.slice(2);

cli(
  {
    version: packageJSON.version,
    name: "milow",
    commands: [initCommand, runCommand, configCommand],
    flags: {},
    ignoreArgv: (type) => type === "unknown-flag" || type === "argument",
    help: { description: packageJSON.description },
  },
  async () => {
    // TODO
  },
  extraArgs
);
