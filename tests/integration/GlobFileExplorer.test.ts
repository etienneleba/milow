import {expect, test} from "bun:test";
import GlobFileExplorer from "src/infrastructure/file/GlobFileExplorer.ts";
import cleanSandbox from "../utils/cleanCurrentDir.ts";
import createFile from "../utils/createFile.ts";
import File from "src/domain/file/File.ts";
import * as process from "node:process";
import cleanCurrentDir from "../utils/cleanCurrentDir.ts";

test("should return all the files in a folder", async () => {
    // Arrange

    process.chdir("./tests/sandbox");
    await cleanCurrentDir();

    createFile("test.ts", "test");
    createFile("test2.ts", "test");
    createFile("test3.ts", "test");

    // Act
    const globFileExplorer = new GlobFileExplorer("./**", "./**");
    const viewableFiles = globFileExplorer.getViewableFiles();
    const contextFiles = globFileExplorer.getContextFiles();

    // Assert
    const viewableFilesResult = [
        './test.ts',
        './test3.ts',
        './test2.ts',
    ]
    expect(viewableFiles).toEqual(viewableFilesResult)

    const contextFileResults = viewableFilesResult.map((path) => new File(path, "test"));

    expect(contextFiles).toEqual(contextFileResults)

    await cleanCurrentDir();
    process.chdir('../..');
})