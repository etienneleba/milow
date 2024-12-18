import {Glob} from "bun";
import { unlink } from "node:fs/promises";

export default async () => {
  await clean("./**");
};
const clean = async (globPattern: string ) => {
  const files = getFiles(globPattern);

  await Promise.all(files.map(unlink));
};

const getFiles = (globPattern: string): string[] => {
  const glob = new Glob(globPattern);

  const files = [];
  for (const file of glob.scanSync({dot: false})) {
    files.push(file);
  }

  return files;
};