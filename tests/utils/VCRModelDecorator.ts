import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import ModelResponse from "src/domain/model/ModelResponse.ts";
import FSFileManipulator from "src/infrastructure/file/FSFileManipulator.ts";
import FSFileReader from "src/infrastructure/file/FSFileReader.ts";

export default class VCRModelDecorator implements Model{
    private responses: [{
        version: number,
        modelResponse: ModelResponse
    }] = [];
    private snapshotPath: string = "./tests/functional/snapshots/snapshot.json"
    private readonly fsFileManipulator: FSFileManipulator;
    private readonly fsFileReader: FSFileReader;

    constructor(
        private readonly model: Model,

    ) {
        this.fsFileManipulator = new FSFileManipulator();
        this.fsFileReader = new FSFileReader();
    }
    call(context: Context): ModelResponse {
        this.retrieveResponses();

        for (const response of this.responses) {
            if(response.version === context.version) {
                return response.modelResponse;
            }
        }

        const modelResponse = this.model.call(context);

        this.responses.push({version: context.version, modelResponse: modelResponse});

        this.saveResponses();

        return modelResponse;

    }


    private retrieveResponses(): void {
        try {
            const snapshotContent = this.fsFileReader.read(this.snapshotPath);
            this.responses = JSON.parse(snapshotContent);
        } catch (e) {
            this.responses = [];
        }


    }

    private saveResponses() {
        console.log(this.responses);
        this.fsFileManipulator.replace(this.snapshotPath, JSON.stringify(this.responses,));
    }
}