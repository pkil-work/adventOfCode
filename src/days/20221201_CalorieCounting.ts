import { FileLoader } from "../helpers/FileLoader";
import { maximumValueOfArray, sumArray } from "../helpers/mathsUtils";

export class CalorieCounter {
  loader: any;
  inputLines: string[];
  elfCalories: number[][] = [];
  elfCalorieTotals: number[] = [];

  constructor(inputLines: string[], loader = FileLoader) {
    this.inputLines = inputLines;
    this.loader = loader;
  }

  public getElfCalories(): number[][] {
    return this.elfCalories;
  }

  public getElfCalorieTotals(): number[] {
    return this.elfCalorieTotals;
  }

  public getMaximumElfCalorieValue(): number {
    return maximumValueOfArray(this.elfCalorieTotals);
  }

  public getTotalCaloriesCarriedByTopThreeElves(): number {
    return sumArray(this.getTopThreeElves());
  }

  public loadCaloriesFromFile(path: string) {
    let fileLoader = new this.loader(path);
    this.inputLines = fileLoader.splitByBlankLine();
  }

  public convertElfCaloriesStringToNumbers(strings: string): number[] {
    let elfCalories: number[];
    let calorieArray = strings.split("\n");
    elfCalories = calorieArray.map(Number);
    return elfCalories;
  }

  public parseElves(): void {
    this.elfCalories = this.inputLines.map(this.convertElfCaloriesStringToNumbers);
    this.elfCalories.forEach((elf) => {
      this.elfCalorieTotals.push(sumArray(elf));
    });
  }

  public getTopThreeElves(): number[] {
    let elvesSortedDescending = this.elfCalorieTotals;
    elvesSortedDescending.sort((a, b) => b - a);
    return elvesSortedDescending.slice(0, 3);
  }
}
