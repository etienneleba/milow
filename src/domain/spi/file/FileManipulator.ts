export default interface FileManipulator {
    create(path: string, content: string): void;

    replace(path: string, content: string): void;
}
