import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import ModelResponse from "src/domain/model/ModelResponse.ts";
import OpenAI, { OpenAI } from "openai";
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
      //tool_choice: "required"
    };

    

    const completion = await this.client.chat.completions.create(params);

    console.log(completion);

    if(completion.error ==! undefined) {
      console.log(completion.error.message);
    }



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
    return ["openai/gpt-4o", "openai/gpt-4.5-preview", "anthropic/claude-3.5-sonnet", "anthropic/claude-3.7-sonnet"];
  }

  set modelName(value: string) {
    this._modelName = value;
  }

  set apiKey(value: string) {
    this.client = new OpenAI({
      apiKey: value,
      baseURL: "https://openrouter.ai/api/v1"
    });
  }

  getAPIKeyName(): string {
    return "OPEN_ROUTER_API_KEY";
  }
}
