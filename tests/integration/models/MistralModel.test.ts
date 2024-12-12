import { describe, it, expect, beforeEach } from "bun:test";
import OpenAIModel from "../../../src/infrastructure/model/models/OpenAIModel";
import Context from "../../../src/domain/context/Context";
import AssistantToolCalls from "../../../src/domain/context/AssistantToolCalls";
import FunctionCall from "../../../src/domain/function/FunctionCall";
import FunctionResult from "../../../src/domain/context/FunctionResult";
import AssistantChat from "../../../src/domain/context/AssistantChat";
import * as process from "node:process";
import UserInteractionMock from "../../utils/decorator/UserInteractionMock.ts";
import MistralModel from "src/infrastructure/model/models/MistralModel.ts";



describe('MistralModel', () => {
  let model: MistralModel;
  let context: Context;

  beforeEach(() => {
    model = new MistralModel();
    context = new Context(new UserInteractionMock());
    model.apiKey = process.env.MISTRAL_API_KEY; // Set a test API key
    model.modelName = "mistral-large-latest"; // Set a default model name
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
