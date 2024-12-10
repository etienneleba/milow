import Model from "src/domain/spi/model/Model.ts";
import OpenAIModel from "src/infrastructure/model/models/OpenAIModel.ts";
import ModelProvider from "src/infrastructure/model/ModelProvider.ts";

export default class ModelResolver {
  private modelProviders: (ModelProvider & Model)[] = [];

  constructor() {
    this.modelProviders = [new OpenAIModel()];
  }

  resolve(modelName: string): Model & ModelProvider {
    for (const modelProvider of this.modelProviders) {
      if (modelProvider.getModelNames().includes(modelName)) {
        return modelProvider;
      }
    }

    throw Error("Model name is not valid");
  }

  getModelNames(): string[] {
    let modelNames = [];
    for (const modelProvider of this.modelProviders) {
      modelNames = modelNames.concat(modelProvider.getModelNames());
    }
    return modelNames;
  }
}
