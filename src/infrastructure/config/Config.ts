export default class Config {
    constructor(
        public readonly testCommand: string,
        public readonly apiKey: string,
        public readonly model: string,
        public readonly viewableFilesPattern: string,
        public readonly contextFilesPattern: string,
    ) {
    }
}