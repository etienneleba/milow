import {mkdirSync, writeFileSync} from "fs";

export default (path: string, content: string): void => {
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
};