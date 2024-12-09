import UserInteraction from "src/domain/spi/user/UserInteraction.ts";
import AssistantChat from "src/domain/context/AssistantChat.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import FunctionResult from "src/domain/context/FunctionResult.ts";
import SystemChat from "src/domain/context/SystemChat.ts";

export default class UserInteractionTestDecorator implements UserInteraction {

  constructor(
        private readonly userInteraction: UserInteraction
  ) {
  }

  ask(question: string): Promise<string> {
    return Promise.resolve("exit");
  }

  print(conversationItem: AssistantChat | AssistantToolCalls | FunctionResult | SystemChat): void {
  }

  startThinking(): void {
  }

  stopThinking(): void {
  }


}