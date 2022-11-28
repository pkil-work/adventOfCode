import { FileLoader } from "../../src/helpers/FileLoader";

describe("FileLoader Helper functions", () => {
    it("has loaded properly", () => {
        expect(1 + 1).toEqual(2);
    });

    describe("FileLoader", () => {
        let exampleFilePath = "../resources/fileLoader-test-input.txt"
        describe(".logFilePath", () => {
            it("returns nothing", () => {
                let loader: FileLoader = new FileLoader(exampleFilePath);
                expect(loader.logFilePath()).toEqual(undefined);
            });
        });

        describe(".csvToNumbers", () => {
            it("returns an array of numbers", () => {
                let loader: FileLoader = new FileLoader(exampleFilePath);
                expect(loader.csvToNumbers()).toEqual([1101, 1, 29, 67]);
            });
        });
    });

});
