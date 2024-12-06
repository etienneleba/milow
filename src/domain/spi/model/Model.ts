import Context from "src/domain/context/Context.ts";
import ModelResponse from "src/domain/model/ModelResponse.ts";

export default interface Model {
    call: (context: Context) => ModelResponse;
}