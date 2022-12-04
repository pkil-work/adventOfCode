import { FileLoader } from "../helpers/FileLoader";
import { minimumValueOfArray, maximumValueOfArray, sumArray } from "../helpers/mathsUtils";

export class FuelCalculator {
  crabPositions: number[];
  loader;

  constructor(crabPositions: number[], loader = FileLoader) {
    this.crabPositions = crabPositions;
    this.loader = loader;
  }

  public loadCrabPositionsFromFile(path: string) {
    let fileLoader = new this.loader(path);
    this.crabPositions = fileLoader.csvToNumbers();
  }

  public absoluteDistance(startPoint: number, destination: number): number {
    return Math.abs(destination - startPoint);
  }

  public furthestRightPosition(arrayOfNumbers: number[]): number {
    return maximumValueOfArray(arrayOfNumbers);
  }

  public costsToMatchToEachPosition(linearCost: boolean = true): number[] {
    let arrayOfCosts = this.crabPositions.map((position) => (linearCost ? this.fuelCost(position) : this.fuelCostIncreased(position)));
    return arrayOfCosts;
  }

  public indexOfMinimumValue(arrayOfNumbers: number[]): number {
    let minimumValue: number = minimumValueOfArray(arrayOfNumbers);
    return arrayOfNumbers.findIndex((number) => number === minimumValue);
  }

  public fuelCost(destination: number): number {
    let distances: number[] = this.crabPositions.map((position: number) => this.absoluteDistance(position, destination));
    return sumArray(distances);
  }

  public fuelCostIncreased(destination: number): number {
    let distances: number[] = this.crabPositions.map((position: number) => {
      let linearFuelCost = this.absoluteDistance(position, destination);
      return linearFuelCost + this.sumOfPrecedingValues(linearFuelCost);
    });
    return sumArray(distances);
  }

  public sumOfPrecedingValues(topNumber: number): number {
    let accumulator: number = 0;
    for (let i: number = topNumber; i--; i < 0) {
      accumulator += i;
    }
    return accumulator;
  }

  public minimumFuelCost(linearCost: boolean = true): number {
    return minimumValueOfArray(this.costsToMatchToEachPosition(linearCost));
  }
}
