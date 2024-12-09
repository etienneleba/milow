import FileManipulator from "src/domain/spi/file/FileManipulator.ts";
import { mkdirSync, writeFileSync } from "fs";

export default class FSFileManipulator implements FileManipulator {
  create(path: string, content: string): void {
    this.writeFile(path, content);
  }

  replace(path: string, content: string) {
    this.writeFile(path, content);
  }
  private writeFile(path: string, content: string): void {
    try {
      writeFileSync(path, content);
    } catch (error: any) {
      // directory does not exist, create one
      if (error.code === "ENOENT") {
        const directory = this.extractDirsFromFilePath(path);

        if (!directory) throw error;

        mkdirSync(directory);
        this.create(path, content);
      }
    }
  }

  private extractDirsFromFilePath(filePath: string): string | null {
    const folders = filePath.split("/");

    if (!folders.length) return null;

    const fileName = folders.pop();

    if (!fileName) return null;

    return folders.join("/");
  }
}
