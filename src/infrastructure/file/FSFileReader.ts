import FileReader from "src/domain/spi/file/FileReader.ts";
import {readFileSync} from "fs";

export default class FSFileReader implements FileReader {
    read(path: string): string {
        return readFileSync(path).toString();
    }


}