import {test} from "bun:test";
import GlobFileExplorer from "src/infrastructure/file/GlobFileExplorer.ts";

test("should return all the files in a folder", async () => {
    const globFileExplorer = new GlobFileExplorer("./{src,tests}/**");
    console.log(globFileExplorer.getViewableFiles());
})