import { CalorieCounter } from "../../src/days/20221201_CalorieCounting";

describe("2022 Day 1 - Calorie Counting", () => {
    const exampleStrings: string[] = ["hello", "goodbye", "ciao"];
    const exampleDataSetFilePath: string = "../resources/20221201-example.txt";
    const inputSnippetFilePath: string = "../../test/resources/20221201-example2.txt";
    const inputDataSetFilePath: string = "../resources/20221201-input.txt";
    const exampleElf: string = "7234\n3510\n7728\n1569\n";

    it("has loaded properly", () => {
        expect(1 + 1).toEqual(2);
    });

    describe("CalorieCounter", () => {
        describe(".getMaximumElfCalorieValue", () => {
            it("returns 24000 for the example data set", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                counter.loadCaloriesFromFile(exampleDataSetFilePath);
                counter.parseElves();
                expect(counter.getMaximumElfCalorieValue()).toEqual(24000);
            });
            it("returns 71124 for the input data set [PART 1 ANSWER]", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                counter.loadCaloriesFromFile(inputDataSetFilePath);
                counter.parseElves();
                expect(counter.getMaximumElfCalorieValue()).toEqual(71124);
            });
        });

        describe(".displayLines", () => {
            it("logs the lines to the terminal", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                counter.displayLines();
            });
        });

        describe(".displayElfCalories", () => {
            it("logs the elves to the terminal", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                counter.loadCaloriesFromFile(inputSnippetFilePath);
                counter.parseElves();
                counter.displayElfCalories();
            });
        });

        describe(".parseElves", () => {
            it("populates the elfCalories instance variable using the inputLines", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                counter.loadCaloriesFromFile(inputSnippetFilePath);
                counter.parseElves();
                expect(counter.getElfCalories()).toEqual([
                    [4423, 8869, 3562, 6597],
                    [4038, 9038, 1352, 8005, 4811, 6281, 3961, 4023],
                    [7234, 3510, 7728, 1569, 0]
                ]);
            });
            it("populates the elfCalorieTotals instance variable using the inputLines", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                counter.loadCaloriesFromFile(inputSnippetFilePath);
                counter.parseElves();
                expect(counter.getElfCalorieTotals()).toEqual([23451, 41509, 20041]);
            });
        });

        describe(".convertElfCaloriesStringToNumbers", () => {
            it("converts a string of calories into an array of calorie numbers", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                expect(counter.convertElfCaloriesStringToNumbers(exampleElf)).toEqual([7234, 3510, 7728, 1569, 0]);
            });
        });

        describe(".getTopThreeElves", () => {
            it("returns the three elves carrying the most calories", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                counter.loadCaloriesFromFile(inputSnippetFilePath);
                counter.parseElves();
                expect(counter.getTopThreeElves()).toEqual([41509, 23451, 20041]);
            });
        });
        describe(".getTotalCaloriesCarriedByTopThreeElves", () => {
            it("returns the sum of the calories carried by the three elves carrying the most calories", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                counter.loadCaloriesFromFile(inputSnippetFilePath);
                counter.parseElves();
                expect(counter.getTotalCaloriesCarriedByTopThreeElves()).toEqual(85001);
            });

            it("returns 45000 for the example data set", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                counter.loadCaloriesFromFile(exampleDataSetFilePath);
                counter.parseElves();
                expect(counter.getTotalCaloriesCarriedByTopThreeElves()).toEqual(45000);
            });

            it("returns 204639 for the input data set", () => {
                let counter: CalorieCounter = new CalorieCounter(exampleStrings);
                counter.loadCaloriesFromFile(inputDataSetFilePath);
                counter.parseElves();
                expect(counter.getTotalCaloriesCarriedByTopThreeElves()).toEqual(204639);
            });
        });
    });

});