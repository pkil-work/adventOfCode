import { FuelCalculator } from "../../src/days/20211207_TheTreacheryOfWhales";

describe("2021 Day 7 - The Treachery of Whales", () => {
    const exampleDataSet: number[] = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
    const exampleDataSetFilePath: string = "../resources/20211207-example.txt";
    const inputDataSetFilePath: string = "../resources/20211207-input.txt";

    it("has loaded properly", () => {
        expect(1 + 1).toEqual(2);
    });

    describe("FuelCalculator", () => {
        describe(".loadCrabPositionsFromFile", () => {
            it("overwrites the crabPositions from a file", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator(exampleDataSet);
                fuelCalculator.loadCrabPositionsFromFile("../resources/fileLoader-test-input.txt");
                expect(fuelCalculator.crabPositions).toEqual([1101, 1, 29, 67]);
            });
        });

        describe(".minimumFuelCost", () => {
            let fuelCalculator: FuelCalculator;
            beforeEach(() => {
                fuelCalculator = new FuelCalculator(exampleDataSet);
            });
            it("returns 37 for the example data", () => {
                expect(fuelCalculator.minimumFuelCost()).toEqual(37);
            });

            it("returns 339321 for the input data", () => {
                fuelCalculator.loadCrabPositionsFromFile(inputDataSetFilePath);
                expect(fuelCalculator.minimumFuelCost()).toEqual(339321);
            });
        });

        describe(".fuelCost", () => {
            it("returns 37 for the example data heading to position 2", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([]);
                fuelCalculator.loadCrabPositionsFromFile(exampleDataSetFilePath);
                expect(fuelCalculator.fuelCost(2)).toEqual(37);
            });
            it("returns 41 for the example data heading to position 1", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator(exampleDataSet);
                expect(fuelCalculator.fuelCost(1)).toEqual(41);
            });
            it("returns 39 for the example data heading to position 3", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator(exampleDataSet);
                expect(fuelCalculator.fuelCost(3)).toEqual(39);
            });
            it("returns 71 for the example data heading to position 10", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator(exampleDataSet);
                expect(fuelCalculator.fuelCost(10)).toEqual(71);
            });
        });
        
        describe(".absoluteDistance", () => {
            let fuelCalculator: FuelCalculator
            beforeEach(() => {
                fuelCalculator = new FuelCalculator([]);
            });
    
            it("returns the absolute distance between two points when a crab needs to move left", () => {
                let startPoint: number = 16;
                let destination: number = 3;
                let distance: number = 13;
                
                expect(fuelCalculator.absoluteDistance(startPoint, destination)).toEqual(distance);
            });
            
            it("returns the absolute distance between two points when a crab needs to move right", () => {
                let startPoint: number = 1;
                let destination: number = 26;
                let distance: number = 25;
                
                expect(fuelCalculator.absoluteDistance(startPoint, destination)).toEqual(distance);
            });
            
            it("returns zero when the crab is already at the destination", () => {
                let startPoint: number = 5;
                let destination: number = 5;
                let distance: number = 0;
    
                expect(fuelCalculator.absoluteDistance(startPoint, destination)).toEqual(distance);
            });
        });

        describe(".sumArray", () => {
            it("returns 6 when given [1,2,3]", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([]);
                let arrayOfNumbers: number[] = [1,2,3];
    
                expect(fuelCalculator.sumArray(arrayOfNumbers)).toEqual(6);
            });
        });
        
        describe(".mean", () => {
            it("returns the arithmetic mean of the crabPositions with a small data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([1,2,3]);
                expect(fuelCalculator.mean()).toEqual(2);
            });
            it("returns the arithmetic mean of the crabPositions with a larger data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([1,2,3,5]);
                expect(fuelCalculator.mean()).toEqual(2.75);
            });
            it("returns the arithmetic mean of the crabPositions with the example data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator(exampleDataSet);
                expect(fuelCalculator.mean()).toEqual(4.9);
            });
        });

        describe(".furthestRightPosition", () => {
            it("returns the furthest right (largest) of the crabPositions with a small data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([]);
                expect(fuelCalculator.furthestRightPosition([1,2,3])).toEqual(3);
            });
            it("returns the furthest right (largest) of the crabPositions with a larger data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([]);
                expect(fuelCalculator.furthestRightPosition([1,2,3,5])).toEqual(5);
            });
            it("returns the furthest right (largest) of the crabPositions with the example data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([]);
                expect(fuelCalculator.furthestRightPosition(exampleDataSet)).toEqual(16);
            });
        });

        describe(".indexOfMinimumValue", () => {
            it("returns the first index with a small data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([]);
                expect(fuelCalculator.indexOfMinimumValue([1,2,3])).toEqual(0);
            });
            it("returns the third index with a larger data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([]);
                expect(fuelCalculator.indexOfMinimumValue([3,2,1,5])).toEqual(2);
            });
            it("returns the fourth index with the example data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([]);
                expect(fuelCalculator.indexOfMinimumValue(exampleDataSet)).toEqual(3);
            });
        });

        describe(".costsToMatchToEachPosition", () => {
            let expectedCostsForEachPosition: number[];
            it("returns an array of costs with a small data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([1, 2, 3]);
                expectedCostsForEachPosition = [3, 2, 3];
                expect(fuelCalculator.costsToMatchToEachPosition()).toEqual(expectedCostsForEachPosition);
            });
            it("returns an array of costs with a larger data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator([1, 3, 5, 7, 9]);
                expectedCostsForEachPosition = [20, 14, 12, 14, 20];
                expect(fuelCalculator.costsToMatchToEachPosition()).toEqual(expectedCostsForEachPosition);
            });
            it("returns an array of costs with the example data set", () => {
                let fuelCalculator: FuelCalculator = new FuelCalculator(exampleDataSet);
                expectedCostsForEachPosition = [111, 41, 37, 49, 41, 37, 53, 41, 37, 95];
                expect(fuelCalculator.costsToMatchToEachPosition()).toEqual(expectedCostsForEachPosition);
            });
        });

    });

});
