import { FileLoader } from "../helpers/FileLoader";

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
    
    public loadFromFile(path: string): void {
        console.debug(path);
    }

    public mean(): number {
        return this.sumArray(this.crabPositions) / this.crabPositions.length;
    }

    public sumArray(arrayOfNumbers: number[]): number {
        return arrayOfNumbers.reduce((accumulator, number) => accumulator + number, 0);
    }

    public furthestRightPosition(arrayOfNumbers: number[]): number {
        return Math.max(...arrayOfNumbers);
    }

    public costsToMatchToEachPosition(): number[] {
        let arrayOfCosts = this.crabPositions.map(position => this.fuelCost(position));
        return arrayOfCosts;
    }

    public minimumValue(arrayOfNumbers: number[]): number {
        return Math.min(...arrayOfNumbers);
    }

    public indexOfMinimumValue(arrayOfNumbers: number[]): number {
        let minimumValue: number = this.minimumValue(arrayOfNumbers);
        return arrayOfNumbers.findIndex(number => number === minimumValue );
    }

    public fuelCost(destination: number): number {
        let distances: number[] = this.crabPositions.map((position: number) => this.absoluteDistance(position, destination))
        return this.sumArray(distances);
    }

    public minimumFuelCost(): number {
        return this.minimumValue(this.costsToMatchToEachPosition());
    }
}