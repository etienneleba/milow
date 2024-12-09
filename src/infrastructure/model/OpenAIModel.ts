import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import ModelResponse from "src/domain/model/ModelResponse.ts";
import FunctionCall from "src/domain/function/FunctionCall.ts";
import OpenAI from "openai";
import AssistantChat from "src/domain/context/AssistantChat.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import FunctionResult from "src/domain/context/FunctionResult.ts";
import SystemChat from "src/domain/context/SystemChat.ts";

export default class OpenAIModel implements Model {
    private readonly client: OpenAI;

    constructor(
        private readonly apiKey: string,
        private readonly modelName: string,
    ) {

        this.client = new OpenAI({
            apiKey: apiKey,
        })
    }

    async call(context: Context, functionSchema: object[]): Promise<ModelResponse> {
        const messages = this.translateToOpenAIMessages(context.conversations);
        const tools = this.translateToOpenAITools(functionSchema);

        const params = {
            messages: messages,
            model: this.modelName,
            tools: tools,
            temperature: 0.3,
            top_p: 0.1
        };

        const completion = await this.client.chat.completions.create(params);

        const message = completion.choices[0].message;

        const functionCalls = [];
        if (message.tool_calls) {
            for (const openAIToolCall of message.tool_calls) {
                functionCalls.push(new FunctionCall(
                    openAIToolCall.id,
                    openAIToolCall.function.name,
                    JSON.parse(openAIToolCall.function.arguments)
                ));
            }
        }

        return new ModelResponse(message.content, functionCalls);

    }

    private translateToOpenAIMessages(conversations: Array<AssistantChat | AssistantToolCalls | FunctionResult | SystemChat>): OpenAI.Chat.ChatCompletionMessageParam[] {
        let messages = [];

        for (const conversationItem of conversations) {

            if (conversationItem instanceof AssistantToolCalls) {
                const toolCalls = this.functionCallsToToolCalls(conversationItem.functionCalls);
                messages.push({
                    role: conversationItem.role,
                    tool_calls: toolCalls
                } as OpenAI.Chat.ChatCompletionAssistantMessageParam);
            } else if (conversationItem instanceof  FunctionResult) {
                messages.push({
                    role: conversationItem.role,
                    tool_call_id: conversationItem.tool_call_id,
                    content: conversationItem.content
                } as OpenAI.Chat.ChatCompletionMessageToolCall)
            } else if (conversationItem instanceof AssistantChat||SystemChat) {
                messages.push({
                    role: conversationItem.role,
                    content: conversationItem.content,
                } as OpenAI.Chat.ChatCompletionAssistantMessageParam)
            }
        }
        return messages;

    }

    private functionCallsToToolCalls(functionCalls: FunctionCall[]): OpenAI.Chat.ChatCompletionMessageToolCall[] {
        let toolCalls = [];

        for (const functionCall of functionCalls) {
            toolCalls.push({
                type: "function",
                id: functionCall.id,
                function: {
                    name: functionCall.name,
                    arguments: JSON.stringify(functionCall.parameters)
                }
            } as OpenAI.Chat.ChatCompletionMessageToolCall)
        }

        return toolCalls;
    }

    private translateToOpenAITools(functionSchema: object[]) {
        let tools = [];

        for (const functionCallable of functionSchema) {
            tools.push({
                type: "function",
                function: functionCallable
            });
        }

        return tools;
    }
}