import ConversationItem from "src/domain/context/ConversationItem.ts";

export default class SystemChat implements ConversationItem {
  public readonly role: string = "system";

  constructor(public readonly content: string) {}
}
