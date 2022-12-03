import { FileLoader } from "../../src/helpers/FileLoader";

describe("FileLoader Helper functions", () => {
    it("has loaded properly", () => {
        expect(1 + 1).toEqual(2);
    });

    describe("FileLoader", () => {
        let singleLineExampleFilePath = "../../test/resources/fileLoader-test-input.txt"
        let multipleLineExampleFilePath = "../../test/resources/fileLoader-test-input-multiple-lines.txt"
        describe(".logFilePath", () => {
            it("returns nothing", () => {
                let loader: FileLoader = new FileLoader(singleLineExampleFilePath);
                expect(loader.logFilePath()).toEqual(undefined);
            });
        });

        describe(".csvToNumbers", () => {
            it("returns an array of numbers", () => {
                let loader: FileLoader = new FileLoader(singleLineExampleFilePath);
                expect(loader.csvToNumbers()).toEqual([1101, 1, 29, 67]);
            });
        });

        describe(".splitByLine", () => {
            it("returns an array of strings", () => {
                let loader: FileLoader = new FileLoader(multipleLineExampleFilePath);
                expect(loader.splitByLine()).toEqual(["1101", "1", "29", "", "67", ""]);
            });
            it("returns an array of strings", () => {
                let snippetFrom20221201Input = "../../test/resources/20221201-example2.txt"
                let loader: FileLoader = new FileLoader(snippetFrom20221201Input);
                expect(loader.splitByLine()).toEqual([
                    "4423",
                    "8869",
                    "3562",
                    "6597",
                    "",
                    "4038",
                    "9038",
                    "1352",
                    "8005",
                    "4811",
                    "6281",
                    "3961",
                    "4023",
                    "",
                    "7234",
                    "3510",
                    "7728",
                    "1569",
                    ""
                ]);
            });
            it("returns an array of strings", () => {
                let snippetFrom20221201Input = "../../test/resources/20221201-example2.txt"
                let loader: FileLoader = new FileLoader(snippetFrom20221201Input);
                expect(loader.splitByBlankLine()).toEqual([
                    "4423\n8869\n3562\n6597",
                    "4038\n9038\n1352\n8005\n4811\n6281\n3961\n4023",
                    "7234\n3510\n7728\n1569\n"
                ]);
            });
        });
    });

});
