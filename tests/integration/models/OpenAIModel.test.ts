import { describe, it, expect, beforeEach } from "bun:test";
import OpenAIModel from "../../../src/infrastructure/model/models/OpenAIModel";
import Context from "../../../src/domain/context/Context";
import AssistantToolCalls from "../../../src/domain/context/AssistantToolCalls";
import FunctionCall from "../../../src/domain/function/FunctionCall";
import FunctionResult from "../../../src/domain/context/FunctionResult";
import AssistantChat from "../../../src/domain/context/AssistantChat";
import * as process from "node:process";
import UserInteractionMock from "../../utils/decorator/UserInteractionMock.ts";



describe('OpenAIModel', () => {
  let model: OpenAIModel;
  let context: Context;

  beforeEach(() => {
    model = new OpenAIModel();
    context = new Context(new UserInteractionMock());
    model.apiKey = process.env.OPENAI_API_KEY; // Set a test API key
    model.modelName = "gpt-4o"; // Set a default model name
  });

  it('should return a valid ModelResponse when called', async () => {
    // push 10 different conversationItem in the context
    for (let i = 0; i < 3; i++) {
      const functionCall = new FunctionCall(`${i}`, 'test', {});
      const toolCall = new AssistantToolCalls([functionCall]);
      context.push(toolCall);

      const functionResult = new FunctionResult(`${i}`, 'Result content');
      context.push(functionResult);

      const assistantChat = new AssistantChat(`Assistant message ${i}`);
      context.push(assistantChat);
    }

    const functionSchema = [{
      name: "test",
      description: "Run the test of the project. Return the test result",
      parameters: {},
    }];
    const response = await model.call(context, functionSchema);

    expect(response).toBeDefined();
    expect(response.message).toBeDefined();
    expect(response.functionCalls).toBeInstanceOf(Array);
  });
});
