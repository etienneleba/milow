import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import ModelResponse from "src/domain/model/ModelResponse.ts";
import FunctionCall from "src/domain/function/FunctionCall.ts";
import OpenAI, { OpenAI } from "openai";
import AssistantChat from "src/domain/context/AssistantChat.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import FunctionResult from "src/domain/context/FunctionResult.ts";
import SystemChat from "src/domain/context/SystemChat.ts";
import ModelProvider from "src/infrastructure/model/ModelProvider.ts";
import GenericTranslator from "src/infrastructure/model/GenericTranslator.ts";

export default class OpenAIModel implements Model, ModelProvider {
  private client: OpenAI;
  private _modelName: string;
  private translator: GenericTranslator;

  constructor() {
    this.translator = new GenericTranslator();
  }

  async call(
    context: Context,
    functionSchema: object[],
  ): Promise<ModelResponse> {
    const messages = this.translator.translateContextToMessages(
      context.conversations,
    );
    const tools = this.translator.translateFunctionsToTools(functionSchema);

    const params = {
      messages: messages,
      model: this._modelName,
      tools: tools,
      temperature: 0.3,
      top_p: 0.1,
      tool_choice: "required",
    };

    const completion = await this.client.chat.completions.create(params);

    const message = completion.choices[0].message;

    let functionCalls = [];
    if (message.tool_calls) {
      functionCalls = this.translator.translateToolsToFunctions(
        message.tool_calls,
      );
    }

    return new ModelResponse(message.content, functionCalls);
  }

  getModelNames(): string[] {
    return ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-4"];
  }

  set modelName(value: string) {
    this._modelName = value;
  }

  set apiKey(value: string) {
    this.client = new OpenAI({
      apiKey: value,
    });
  }

  getAPIKeyName(): string {
    return "OPENAI_API_KEY";
  }
}
