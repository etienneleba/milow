import FileReader from "src/domain/spi/file/FileReader.ts";
import { readFileSync } from "fs";

export default class FSFileReader implements FileReader {
  read(path: string): string | null {
    try {
      return readFileSync(path).toString();
    } catch (e) {
      return null;
    }
  }
}
