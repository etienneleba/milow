import FunctionResult from "src/domain/context/FunctionResult.ts";
import SystemChat from "src/domain/context/SystemChat.ts";
import AssistantChat from "src/domain/context/AssistantChat.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import UserInteraction from "src/domain/spi/user/UserInteraction.ts";

export default class Context {

    private _version = 1;
    private _conversations: Array<AssistantChat|AssistantToolCalls|FunctionResult|SystemChat> = [];

    constructor(
        private readonly userInteraction: UserInteraction
    ) {
    }

    push(conversationItem: AssistantChat|AssistantToolCalls|FunctionResult|SystemChat): Context {
        this._conversations.push(conversationItem);
        this._version++;

        this.userInteraction.print(conversationItem);

        return this;
    }


    get version(): number {
        return this._version;
    }


    get conversations(): Array<AssistantChat|AssistantToolCalls|FunctionResult|SystemChat> {
        return this._conversations;
    }

}