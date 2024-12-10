export default class Config {
  constructor(
    public readonly apiKey: string,
    public readonly testCommand: string,
    public readonly model: string,
    public readonly viewableFilesPattern: string,
    public readonly contextFilesPattern: string,
  ) {}
}
