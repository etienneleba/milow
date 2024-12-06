import {test} from "bun:test";
import BunTestRunner from "src/infrastructure/test/BunTestRunner.ts";

test("should run a command", async () => {
    const testRunner = new BunTestRunner();
    console.log(testRunner.run("ls"));
})