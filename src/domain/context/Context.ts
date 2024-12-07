import FunctionResult from "src/domain/function/FunctionResult.ts";
import ConversationItem from "src/domain/context/ConversationItem.ts";

export default class Context {

    private _version = 1;
    private _conversations: Array<ConversationItem> = [];

    push(functionResult: FunctionResult) {
        this._conversations.push(functionResult);
        this._version++;
    }


    get version(): number {
        return this._version;
    }


    get conversations(): Array<ConversationItem> {
        return this._conversations;
    }

}