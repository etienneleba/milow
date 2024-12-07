import AssistantChat from "src/domain/context/AssistantChat.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import FunctionResult from "src/domain/context/FunctionResult.ts";
import SystemChat from "src/domain/context/SystemChat.ts";

export default interface UserInteraction {

    print(conversationItem: AssistantChat | AssistantToolCalls | FunctionResult | SystemChat): void;
}