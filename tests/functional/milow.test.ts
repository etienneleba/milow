import {expect, test} from "bun:test";
import Milow from "src/domain/api/Milow.ts";
import OpenAIModel from "src/infrastructure/model/OpenAIModel.ts";
import FSFileReader from "src/infrastructure/file/FSFileReader.ts";
import FSFileManipulator from "src/infrastructure/file/FSFileManipulator.ts";
import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import ModelResponse from "src/domain/model/ModelResponse.ts";
import VCRModelDecorator from "../utils/VCRModelDecorator.ts";
import BunTestRunner from "src/infrastructure/test/BunTestRunner.ts";
import FileConfigProvider from "src/infrastructure/config/FileConfigProvider.ts";
import GlobFileExplorer from "src/infrastructure/file/GlobFileExplorer.ts";

test("call milow fix tests function", async () => {

    const config = new FileConfigProvider(new FSFileReader()).get();

    const model = new OpenAIModel(
        config.apiKey,
        config.model
    );

    const milow = new Milow(
        model,
        new FSFileReader(),
        new FSFileManipulator(),
        new BunTestRunner("ls"),
        new GlobFileExplorer("./{src,tests}/**")
    );
    await milow.fixTests();
});
