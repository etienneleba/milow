import AssistantChat from "src/domain/context/AssistantChat.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import FunctionResult from "src/domain/context/FunctionResult.ts";
import SystemChat from "src/domain/context/SystemChat.ts";
import FunctionCall from "src/domain/function/FunctionCall.ts";

export default class GenericTranslator {
  public translateContextToMessages(
    conversations: Array<
      AssistantChat | AssistantToolCalls | FunctionResult | SystemChat
    >,
  ) {
    const messages = [];

    for (const conversationItem of conversations) {
      if (conversationItem instanceof AssistantToolCalls) {
        const toolCalls = this.translateFunctionCallsToToolCalls(
          conversationItem.functionCalls,
        );
        messages.push({
          role: conversationItem.role,
          tool_calls: toolCalls,
        });
      } else if (conversationItem instanceof FunctionResult) {
        messages.push({
          role: conversationItem.role,
          tool_call_id: conversationItem.tool_call_id,
          content: conversationItem.content,
        });
      } else if (conversationItem instanceof AssistantChat || SystemChat) {
        messages.push({
          role: conversationItem.role,
          content: conversationItem.content,
        });
      }
    }
    return messages;
  }

  public translateFunctionCallsToToolCalls(functionCalls: FunctionCall[]) {
    const toolCalls = [];

    for (const functionCall of functionCalls) {
      toolCalls.push({
        type: "function",
        id: functionCall.id,
        function: {
          name: functionCall.name,
          arguments: JSON.stringify(functionCall.parameters),
        },
      });
    }

    return toolCalls;
  }

  public translateFunctionsToTools(functionSchema: object[]) {
    const tools = [];

    for (const functionCallable of functionSchema) {
      tools.push({
        type: "function",
        function: functionCallable,
      });
    }

    return tools;
  }

  public translateToolsToFunctions(toolCalls) {
    const functionCalls = [];
    for (const toolCall of toolCalls) {
      functionCalls.push(
        new FunctionCall(
          toolCall.id,
          toolCall.function.name,
          JSON.parse(toolCall.function.arguments),
        ),
      );
    }

    return functionCalls;
  }
}
