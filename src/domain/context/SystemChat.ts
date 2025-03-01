
export default class SystemChat {
  public readonly role: string = "system";

  constructor(public readonly content: string) {}
}
