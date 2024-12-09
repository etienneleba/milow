import FileReader from "src/domain/spi/file/FileReader.ts";
import {readFileSync, existsSync} from "fs";

export default class FSFileReader implements FileReader {
  read(path: string): string | null {
    if (existsSync(path)) {
      return readFileSync(path).toString();
    }

    return null;

  }
}
