import FileExplorer from "src/domain/spi/file/FileExplorer.ts";
import {Glob} from "bun";

export default class GlobFileExplorer implements FileExplorer {
    constructor(
        private viewFilesGlobPattern: string
    ) {
    }
    getViewableFiles(): string[] {
        const glob = new Glob(this.viewFilesGlobPattern);

        let files = [];
        for (const file of glob.scanSync()) {
            files.push(file);
        }

        return files;
    }

}