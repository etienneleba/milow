export default class FunctionCall {

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly parameters: object
    ) {
    }
}
