import { removeDuplicates } from "../helpers/arrayUtils";
import { FileLoader } from "../helpers/FileLoader";
import { sumArray } from "../helpers/mathsUtils";

const DIR: string = "dir";

export class NoSpaceOnDevice {
  loader: any;
  terminal: string[];
  directoryNames: string[];
  directories: { [key: string]: (string | number)[] } = {};

  constructor(loader = FileLoader) {
    this.loader = loader;
  }

  public loadTerminalOutput(path: string): void {
    let fileLoader = new this.loader(path);
    this.terminal = fileLoader.splitByLine();
  }

  public populateDirectoriesObject(): void {
    this.directoryNames = this.listAllDirectories();
    this.directoryNames.forEach((directoryName) => {
      this.directories[directoryName] = this.extractDirectoryContent(directoryName);
    });
  }

  public listAllDirectories(): string[] {
    let directoryStrings: string[] = this.terminal.filter((line) => {
      let output: string = line.slice(0, 3);
      return output === DIR;
    });
    directoryStrings = removeDuplicates(directoryStrings) as string[];
    return directoryStrings.map((line) => line.split(" ")[1]);
  }

  public replaceSubDirectoriesWithContent(): void {
    this.directoryNames.forEach((directory) => this.replaceAnySubDirectoryWithContent(directory));
  }

  public getTotalSizesWithUpperLimit(upperLimit: number): number[] {
    let allDirectorySizes = this.directoryNames.map((directory) => this.getTotalSize(directory));
    return allDirectorySizes.filter((size) => size <= upperLimit);
  }

  public getSumOfTotalSizes(upperLimit: number): number {
    return sumArray(this.getTotalSizesWithUpperLimit(upperLimit));
  }

  public getTotalSize(directory: string): number {
    let fileSizes = this.directories[directory].map((item) => {
      let itemString = item as string;
      let fileSize = itemString.split(" ")[0];
      return Number(fileSize);
    });
    return sumArray(fileSizes);
  }

  public replaceAnySubDirectoryWithContent(directory: string): boolean {
    let subDirectoryFound = false;
    let iteratingCopy = [...this.directories[directory]];
    let workingCopy = [];
    iteratingCopy.forEach((item) => {
      let itemString = item as string;
      if (itemString.slice(0, 3) === DIR) {
        // console.debug(`There's a dir in ${directory}`);
        let dirName: string = itemString.split(" ")[1];
        // console.debug(`It's ${dirName}`);
        subDirectoryFound = true;
        workingCopy.push(...this.directories[dirName]);
      } else {
        workingCopy.push(item);
      }
    });
    this.directories[directory] = workingCopy;
    return subDirectoryFound;
  }

  public extractDirectoryContent(directoryName: string): string[] {
    // find the string `$ cd ${directoryName}`
    let indexOfChangeDirCommand = this.terminal.findIndex((line) => line === `$ cd ${directoryName}`);
    // console.debug(`Index of cd: ${indexOfChangeDirCommand}`);
    // ensure the string is `$ ls`
    // console.debug(`Next Line is '$ ls': ${this.terminal[indexOfChangeDirCommand + 1] === "$ ls"}`);
    // collect all the following strings until either a $ character, or the end of the file
    // return the strings after the ls command as an array
    return this.returnStringsUntilNextCommand(indexOfChangeDirCommand + 2);
  }

  public returnStringsUntilNextCommand(startIndex: number): string[] {
    let returnStrings: string[] = [];
    while (startIndex <= this.terminal.length && this.terminal[startIndex] && this.terminal[startIndex][0] !== "$") {
      returnStrings.push(this.terminal[startIndex]);
      startIndex += 1;
    }
    // console.debug(returnStrings);
    return returnStrings;
  }
}

// should maintain an object of already calculated directories for lookup purposes
