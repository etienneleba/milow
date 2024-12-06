import {expect, test} from "bun:test";
import Milow from "src/domain/api/Milow.ts";
import OpenAIModel from "src/infrastructure/model/OpenAIModel.ts";
import FSFileReader from "src/infrastructure/file/FSFileReader.ts";
import FSFileManipulator from "src/infrastructure/file/FSFileManipulator.ts";

test("call milow fix tests function", async () => {
    const milow = new Milow(
        new OpenAIModel(),
        new FSFileReader(),
        new FSFileManipulator()
    );
    milow.fixTests();
});