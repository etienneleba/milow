import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import ModelResponse from "src/domain/model/ModelResponse.ts";
import FunctionCall from "src/domain/function/FunctionCall.ts";

export default class OpenAIModel implements Model {
    call(context: Context): ModelResponse {
        return new ModelResponse('Hey comment ça va ?', [
            new FunctionCall(
                "1",
                "replace_file",
                {
                    "path": "./tests/sandbox/test.php",
                    "content": "<?php echo 'hey'"
                }
            )
        ]);
    }
}