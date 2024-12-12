import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import ModelResponse from "src/domain/model/ModelResponse.ts";
import ModelProvider from "src/infrastructure/model/ModelProvider.ts";
import {Mistral} from "@mistralai/mistralai";

export default class MistralModel implements Model, ModelProvider {
  private client: Mistral;
  private _modelName: string;

  constructor() {
  }

  async call(
    context: Context,
    functionSchema: object[],
  ): Promise<ModelResponse> {

  }

  getModelNames(): string[] {
    return ["mistral-large-latest", "codestral-latest" , "ministral-8b-latest"];
  }

  set modelName(value: string) {
    this._modelName = value;
  }

  set apiKey(value: string) {
    this.client = new Mistral({
      apiKey: value
    });
  }

  getAPIKeyName(): string {
    return "MISTRAL_API_KEY";
  }
}
