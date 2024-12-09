import Model from "src/domain/spi/model/Model.ts";
import Context from "src/domain/context/Context.ts";
import FunctionCaller from "src/domain/function/FunctionCaller.ts";
import { sleepSync } from "bun";
import FunctionResolver from "src/domain/function/FunctionResolver.ts";
import FileReader from "src/domain/spi/file/FileReader.ts";
import FileManipulator from "src/domain/spi/file/FileManipulator.ts";
import TestRunner from "src/domain/spi/test/TestRunner.ts";
import AssistantChat from "src/domain/context/AssistantChat.ts";
import AssistantToolCalls from "src/domain/context/AssistantToolCalls.ts";
import { ContextFactory } from "src/domain/context/ContextFactory.ts";
import FileExplorer from "src/domain/spi/file/FileExplorer.ts";
import UserInteraction from "src/domain/spi/user/UserInteraction.ts";
import ExitException from "src/domain/exception/ExitException.ts";

export default class Milow {
  constructor(
    private readonly model: Model,
    private readonly fileReader: FileReader,
    private readonly fileManipulator: FileManipulator,
    private readonly testRunner: TestRunner,
    private readonly fileExplorer: FileExplorer,
    private readonly userInteraction: UserInteraction,
  ) {
    this.model = model;
  }

  async fixTests() {
    const context = new ContextFactory(
      this.fileExplorer,
      this.userInteraction,
    ).setup();

    const functionResolver = new FunctionResolver(
      this.fileReader,
      this.fileManipulator,
      this.testRunner,
      this.userInteraction,
    );

    const functionSchema = functionResolver.getSchema();

    const functionCaller = new FunctionCaller(functionResolver);

    let keepGoing: boolean = true;

    while (keepGoing) {
      this.userInteraction.startThinking();

      const modelResponse = await this.model.call(context, functionSchema);

      this.userInteraction.stopThinking();

      if (modelResponse.message !== null) {
        context.push(new AssistantChat(modelResponse.message));
      }
      if (modelResponse.functionCalls.length > 0) {
        context.push(new AssistantToolCalls(modelResponse.functionCalls));
        try {
          const functionResults = await functionCaller.call(
            modelResponse.functionCalls,
          );
          for (const functionResult of functionResults) {
            context.push(functionResult);
          }
        } catch (e: ExitException) {
          keepGoing = false;
        }
      }
    }
  }
}
