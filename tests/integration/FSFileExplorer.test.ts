import {expect, test} from "bun:test";
import FSFileExplorer from "src/infrastructure/file/FSFileExplorer.ts";
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
  const fsFileExplorer = new FSFileExplorer("./**", "./**");
  const viewableFiles = fsFileExplorer.getViewableFiles();
  const contextFiles = fsFileExplorer.getContextFiles();

  // Assert
  const viewableFilesResult = [
    "./test.ts",
    "./test2.ts",
    "./test3.ts",
  ];
  expect(viewableFiles).toContainAllValues(viewableFilesResult);

  const contextFileResults = viewableFilesResult.map((path) => new File(path, "test"));

  expect(contextFiles).toContainAllValues(contextFileResults);

  await cleanCurrentDir();
  process.chdir("../..");
});