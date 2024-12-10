import Context from "src/domain/context/Context.ts";
import FileExplorer from "src/domain/spi/file/FileExplorer.ts";
import SystemChat from "src/domain/context/SystemChat.ts";
import UserInteraction from "src/domain/spi/user/UserInteraction.ts";
import File from "src/domain/file/File.ts";
import UserChat from "src/domain/context/UserChat.ts";

export class ContextFactory {
  constructor(
    private readonly fileExplorer: FileExplorer,
    private readonly userInteraction: UserInteraction,
  ) {}
  setup(testFilePath: string | null, prompt: string | null): Context {
    const context = new Context(this.userInteraction);

    const fileTree = this.fileExplorer.getViewableFiles();
    const contextFiles = this.fileExplorer.getContextFiles();

    const systemMessage = this.getSystemMessage(fileTree, contextFiles);

    context.pushInFoundation(new SystemChat(systemMessage));

    const testFile = this.getTestFile(testFilePath);
    if (testFile !== null) {
      context.pushInFoundation(new UserChat(this.getTestFileMessage(testFile)));
    }

    if (prompt !== null) {
      context.pushInFoundation(new UserChat(prompt));
    }

    return context;
  }

  private getSystemMessage(fileTree: string[], contextFiles: File[]): string {
    return [
      "You act as an expert software engineer that solves tests in Read-Eval-Print Loop mode as per the Test-Driven Development (TDD) practices.",
      "",
      "## Instructions :",
      "- Always launch the tests first. Fix the tests, you're done when the test are green. Ask the supervisor what to do when you are done",
      "- You can read as many files as you need to understand the context",
      "- Always read a file before write in it",
      "- The supervisor might use wishful thinking programming, so some files/classes use in the test might not exist. In this case, create them and import them in the test if needed",
      "- You can view the test files as much as you need to understand what to do, but ask your supervisor before updating a test file",
      "- If you need more context or you are stuck, ask a question to your supervisor",
      "- Adhere strictly to Test-Driven Development (TDD) practices, ensuring that all code written is robust, efficient, passes the tests and is production ready.",
      "- Use the examples to understand the coding style of the team and the context of the project",
      "",
      "## Project :",
      ...contextFiles.map((file) => [file.content]),
      "",
      "## The path of all the files you can view :",
      ...fileTree.map((path) => ["- " + path]),
    ].join("\n");
  }

  private getTestFileMessage(testFile: File): string {
    return [
      "The test file to focus on : " + testFile.path,
      "```",
      testFile.content,
      "```",
    ].join("\n");
  }

  private getTestFile(testFilePath: string | null): File | null {
    if (testFilePath === null) {
      return null;
    }
    const testFileContent = this.fileExplorer.read(testFilePath);
    if (testFileContent === null) {
      return null;
    }

    return new File(testFilePath, testFileContent);
  }
}
