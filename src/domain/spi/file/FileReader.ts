export default interface FileReader {
  read(path: string): string | null;
}
