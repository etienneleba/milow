import FunctionResult from "src/domain/context/FunctionResult.ts";
import SystemChat from "src/domain/context/SystemChat.ts";
import AssistantChat from "src/domain/context/AssistantChat.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import UserInteraction from "src/domain/spi/user/UserInteraction.ts";
import FunctionCall from "src/domain/function/FunctionCall.ts";

export default class Context {
  private readonly MAX_CONVERSATION_SIZE: number = 30;
  private _version = 1;
  private _conversations: Array<
    AssistantChat | AssistantToolCalls | FunctionResult | SystemChat
  > = [];
  private _foundation: Array<
    AssistantChat | AssistantToolCalls | FunctionResult | SystemChat
  > = [];

  constructor(private readonly userInteraction: UserInteraction) {
  }

  push(
    conversationItem:
      | AssistantChat
      | AssistantToolCalls
      | FunctionResult
      | SystemChat,
  ): Context {

    this.removeOutdatedTestCalls(conversationItem);

    this.pruneConversation();
    this._conversations.push(conversationItem);
    this._version++;

    this.userInteraction.print(conversationItem);

    return this;
  }

  pushInFoundation(
    conversationItem:
      | AssistantChat
      | AssistantToolCalls
      | FunctionResult | SystemChat,
  ): Context {
    this._foundation.push(conversationItem);

    return this;
  }

  get version(): number {
    return this._version;
  }

  get conversations(): Array<
    AssistantChat | AssistantToolCalls | FunctionResult | SystemChat
  > {
    return this._foundation.concat(this._conversations);
  }

  private pruneConversation() {
    while (this._conversations.length > this.MAX_CONVERSATION_SIZE) {
      const removedConversationItem = this._conversations.shift();

      if (removedConversationItem === undefined) {
        break;
      }

      this.checkForRelatedConversationItems(removedConversationItem);
    }
  }

  private checkForRelatedConversationItems(
    conversationItem:
      | AssistantChat
      | AssistantToolCalls
      | FunctionResult | SystemChat,
  ): void {
    if (conversationItem instanceof AssistantToolCalls) {
      for (const functionCall of conversationItem.functionCalls) {
        for (const currentConversationItem of this._conversations) {
          if (
            currentConversationItem instanceof FunctionResult &&
            functionCall.id === currentConversationItem.tool_call_id
          ) {
            const index = this._conversations.indexOf(currentConversationItem);
            if (index > -1) {
              this._conversations.splice(index, 1);
            }
          }
        }
      }
    }
  }

  private removeOutdatedTestCalls(conversationItem:
                                    | AssistantChat
                                    | AssistantToolCalls
                                    | FunctionResult
                                    | SystemChat): void {
    if (conversationItem instanceof AssistantToolCalls && conversationItem.functionCalls.some(call => call.name === 'test')) {
      this._conversations = this._conversations.filter(item => {
        if (item instanceof AssistantToolCalls) {
          return !item.functionCalls.some(call => call.name === 'test');
        }
        if (item instanceof FunctionResult) {
          return !this._conversations.some(conversation =>
            conversation instanceof AssistantToolCalls &&
            conversation.functionCalls.some(call => call.id === item.tool_call_id && call.name === 'test')
          );
        }
        return true;
      });
    }
  }
}
