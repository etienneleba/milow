import File from "src/domain/file/File.ts";
export default interface FileExplorer {
  getViewableFiles(): string[];

  getContextFiles(): File[];

  read(path: string): string | null;
}
