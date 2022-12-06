import { FileLoader } from "../helpers/FileLoader";

export class SupplyStacks {
  loader: any;
  inputLines: string[];
  procedure: number[][];
  stacks: string[][];

  constructor(loader = FileLoader) {
    this.loader = loader;
  }

  public loadStacks(path: string): void {
    let fileLoader = new this.loader(path);
    let stacks: string[] = fileLoader.splitByLine();
    this.stacks = stacks.map((line) => line.split(","));
  }

  public loadProcedure(path: string): void {
    let fileLoader = new this.loader(path);
    this.inputLines = fileLoader.splitByLine();
    this.procedure = this.inputLines.map((line) => this.extractNumbers(line));
  }

  public extractNumbers(instruction: string): number[] {
    let matches = instruction.match(/move (\d*) from (\d*) to (\d*)/);
    let actualMatches = matches.slice(1).map(Number);
    return actualMatches;
  }

  public listTopCrates(): string {
    let topCrateArray = this.stacks.map((stack) => stack[0]);
    return topCrateArray.join("");
  }

  public carryOutInstruction(instruction: number[], crateMover9001: boolean): void {
    let numberOfCrates: number = instruction[0];
    let startStackIndex: number = instruction[1] - 1;
    let endStackIndex: number = instruction[2] - 1;

    let pickedUpCrates = this.stacks[startStackIndex].splice(0, numberOfCrates);
    let craneCargo: string[] = crateMover9001 ? pickedUpCrates : pickedUpCrates.reverse();
    this.stacks[endStackIndex] = [...craneCargo, ...this.stacks[endStackIndex]];
  }

  public carryOutProcedure(crateMover9001: boolean = false): void {
    this.procedure.forEach((instruction) => this.carryOutInstruction(instruction, crateMover9001));
  }
}
