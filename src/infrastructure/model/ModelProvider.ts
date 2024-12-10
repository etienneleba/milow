export default interface ModelProvider {
  getModelNames(): string[];
  modelName: string;
  apiKey: string;
}
