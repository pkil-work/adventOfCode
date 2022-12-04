import * as fs from "fs";
import * as path from "path";

export class FileLoader {
  private filePath: string;
  private actualPath: string;

  constructor(relativePath: string) {
    this.filePath = relativePath;
    this.actualPath = path.resolve(__dirname, this.filePath);
  }

  public logFilePath(): void {
    console.log(`File Path: ${this.filePath}`);
    console.log(`Actual File Path: ${this.actualPath}`);
  }

  public csvToNumbers(): number[] {
    return this.fileContent().split(",").map(Number);
  }

  public splitByLine(): string[] {
    return this.fileContent().split("\n");
  }

  public splitByBlankLine(): string[] {
    return this.fileContent().split("\n\n");
  }

  // Private Methods
  private fileContent(): string {
    return fs.readFileSync(this.actualPath, { encoding: "utf-8" });
  }
}
