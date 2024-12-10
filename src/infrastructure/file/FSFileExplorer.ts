import FileExplorer from "src/domain/spi/file/FileExplorer.ts";
import { Glob } from "bun";
import File from "src/domain/file/File.ts";
import {existsSync, readFileSync} from "fs";

export default class FSFileExplorer implements FileExplorer {
  constructor(
    private viewFilesGlobPattern: string,
    private contextFilesGlobPattern: string,
  ) {}
  getViewableFiles(): string[] {
    const glob = new Glob(this.viewFilesGlobPattern);

    const files = [];
    for (const file of glob.scanSync()) {
      files.push(file);
    }

    return files;
  }

  getContextFiles(): File[] {
    const glob = new Glob(this.contextFilesGlobPattern);

    const files = [];
    for (const filePath of glob.scanSync()) {
      const file = new File(filePath, readFileSync(filePath).toString());
      files.push(file);
    }

    return files;
  }

  read(path: string): string | null {
    if (existsSync(path)) {
      return readFileSync(path).toString();
    }

    return null;
  }

}
