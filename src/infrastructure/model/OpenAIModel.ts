import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import ModelResponse from "src/domain/model/ModelResponse.ts";
import FunctionCall from "src/domain/function/FunctionCall.ts";
import OpenAI from "openai";
import {spawnSync} from "bun";

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

    async call(context: Context, functionSchema: object): Promise<ModelResponse> {
        const tools = functionSchema as Array<OpenAI.ChatCompletionTool>
        const params = {
            messages: [],
            model: this.modelName,
        };

        const completion = await this.client.chat.completions.create(params);

        const message = completion.choices[0].message;

        return new ModelResponse(message.content === null ? "" : message.content, []);

    }
}