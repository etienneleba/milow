import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import ModelResponse from "src/domain/model/ModelResponse.ts";
import FSFileManipulator from "src/infrastructure/file/FSFileManipulator.ts";
import FSFileReader from "src/infrastructure/file/FSFileReader.ts";
import FunctionCall from "src/domain/function/FunctionCall.ts";
import * as console from "node:console";
import {readFileSync, writeFileSync} from "fs";

export default class VCRModelDecorator implements Model{
  private responses: [{
        version: number,
        modelResponse: ModelResponse
    }] = [];
  private _snapshotPath: string = "./tests/functional/snapshots/snapshot.json";
  private forceReplay: boolean;

  constructor(
        private readonly model: Model|null,

  ) {
    if(model === null) {
      this.forceReplay = true;
    }
  }
  async call(context: Context, functionSchema: FunctionCall[]): Promise<ModelResponse> {
    this.retrieveResponses();

    for (const response of this.responses) {
      if(response.version === context.version) {
        return response.modelResponse;
      }
    }

    if(this.forceReplay) {
      throw Error("In replay mode VCRModelDecorator do not use the real model. The snapshot doesn't match");
    }

    const modelResponse = await this.model.call(context, functionSchema);

    this.responses.push({version: context.version, modelResponse: modelResponse});

    this.saveResponses();

    return modelResponse;

  }


  public set snapshotPath(value: string) {
    this._snapshotPath = value;
  }

  private retrieveResponses(): void {
    try {
      const snapshotContent = readFileSync(this._snapshotPath);
      this.responses = JSON.parse(snapshotContent.toString());
    } catch (e) {
      this.responses = [];
    }


  }

  private saveResponses() {
    console.log(this.responses);
    writeFileSync(this._snapshotPath, JSON.stringify(this.responses,));
  }
}