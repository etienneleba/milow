import {expect, test} from "bun:test";
import Milow from "src/domain/api/Milow.ts";
import FSFileManipulator from "src/infrastructure/file/FSFileManipulator.ts";
import BunTestRunner from "src/infrastructure/test/BunTestRunner.ts";
import FSFileExplorer from "src/infrastructure/file/FSFileExplorer.ts";
import * as process from "node:process";
import ConsoleUserInteraction from "src/infrastructure/ui/ConsoleUserInteraction.ts";
import copyDirectory from "../utils/copyDirectory.ts";
import cleanCurrentDir from "../utils/cleanCurrentDir.ts";
import VCRModelDecorator from "../utils/decorator/VCRModelDecorator.ts";
import UserInteractionTestDecorator from "../utils/decorator/UserInteractionTestDecorator.ts";
import {readFileSync, } from "fs";

test("should fix the test and create the generatePrimeNumbers function", async () => {


  process.chdir("./tests/sandbox");

  const vcrModel = new VCRModelDecorator(null);

  vcrModel.snapshotPath = "../functional/snapshots/snapshot-1.json";

  await cleanCurrentDir();
  copyDirectory("../example/1", ".");


  const milow = new Milow(
    vcrModel,
    new FSFileManipulator(),
    new BunTestRunner("bun run test"),
    new FSFileExplorer("./{src,tests}/**", "./docs/**"),
    new UserInteractionTestDecorator(new ConsoleUserInteraction())
  );
  await milow.fixTests(null);

  expect(readFileSync("./src/index.ts").toString()).toEqualIgnoringWhitespace(`const generatePrimeNumbers = (limit: number): Array<number> => {
        if (limit < 2) return [];

        const primes = [];
        const isPrime = Array(limit + 1).fill(true);
        isPrime[0] = isPrime[1] = false;

        for (let i = 2; i <= limit; i++) {
            if (isPrime[i]) {
                primes.push(i);
                for (let j = i * i; j <= limit; j += i) {
                    isPrime[j] = false;
                }
            }
        }

        return primes;
    }

    export default generatePrimeNumbers;`);

  await cleanCurrentDir();

  process.chdir("../..");


});

