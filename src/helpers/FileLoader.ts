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

    private fileContent(): string {
        return fs.readFileSync(this.actualPath, { encoding: 'utf-8' });
    }
    
    public csvToNumbers(): number[] {
        return this.fileContent().split(",").map(Number);
    }
    
}