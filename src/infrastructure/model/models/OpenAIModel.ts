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

export default class OpenAIModel implements Model, ModelProvider {
  private client: OpenAI;
  private _modelName: string;

  async call(
    context: Context,
    functionSchema: object[],
  ): Promise<ModelResponse> {
    const messages = this.translateToOpenAIMessages(context.conversations);
    const tools = this.translateToOpenAITools(functionSchema);

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

    const functionCalls = [];
    if (message.tool_calls) {
      for (const openAIToolCall of message.tool_calls) {
        functionCalls.push(
          new FunctionCall(
            openAIToolCall.id,
            openAIToolCall.function.name,
            JSON.parse(openAIToolCall.function.arguments),
          ),
        );
      }
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

  private translateToOpenAIMessages(
    conversations: Array<
      AssistantChat | AssistantToolCalls | FunctionResult | SystemChat
    >,
  ): OpenAI.Chat.ChatCompletionMessageParam[] {
    const messages = [];

    for (const conversationItem of conversations) {
      if (conversationItem instanceof AssistantToolCalls) {
        const toolCalls = this.functionCallsToToolCalls(
          conversationItem.functionCalls,
        );
        messages.push({
          role: conversationItem.role,
          tool_calls: toolCalls,
        } as OpenAI.Chat.ChatCompletionAssistantMessageParam);
      } else if (conversationItem instanceof FunctionResult) {
        messages.push({
          role: conversationItem.role,
          tool_call_id: conversationItem.tool_call_id,
          content: conversationItem.content,
        } as OpenAI.Chat.ChatCompletionMessageToolCall);
      } else if (conversationItem instanceof AssistantChat || SystemChat) {
        messages.push({
          role: conversationItem.role,
          content: conversationItem.content,
        } as OpenAI.Chat.ChatCompletionAssistantMessageParam);
      }
    }
    return messages;
  }

  private functionCallsToToolCalls(
    functionCalls: FunctionCall[],
  ): OpenAI.Chat.ChatCompletionMessageToolCall[] {
    const toolCalls = [];

    for (const functionCall of functionCalls) {
      toolCalls.push({
        type: "function",
        id: functionCall.id,
        function: {
          name: functionCall.name,
          arguments: JSON.stringify(functionCall.parameters),
        },
      } as OpenAI.Chat.ChatCompletionMessageToolCall);
    }

    return toolCalls;
  }

  private translateToOpenAITools(functionSchema: object[]) {
    const tools = [];

    for (const functionCallable of functionSchema) {
      tools.push({
        type: "function",
        function: functionCallable,
      });
    }

    return tools;
  }
}
