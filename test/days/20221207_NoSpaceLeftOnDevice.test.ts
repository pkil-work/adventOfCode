import { NoSpaceOnDevice } from "../../src/days/20221207_NoSpaceLeftOnDevice";

describe("2022 Day 7 - No Space Left on Device", () => {
  const exampleFilePath: string = "../resources/20221207-example.txt";
  const inputFilePath: string = "../resources/20221207-input.txt";

  describe("NoSpaceOnDevice", () => {
    describe(".loadTerminalOutput", () => {
      it("loads the terminal output into an array of strings (23 lines)", () => {
        let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
        scanner.loadTerminalOutput(exampleFilePath);
        expect(scanner.terminal.length).toEqual(23);
      });
    });
    describe(".listAllDirectories", () => {
      it("returns an array of unique directories from the terminal input example", () => {
        let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
        let expectedDirectories: string[] = ["a", "d", "e"];
        scanner.loadTerminalOutput(exampleFilePath);
        expect(scanner.listAllDirectories()).toEqual(expectedDirectories);
        expect(scanner.listAllDirectories().length).toEqual(3);
      });
      it("returns an array of unique directories from the terminal input for the input", () => {
        let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
        scanner.loadTerminalOutput(inputFilePath);
        expect(scanner.listAllDirectories().length).toEqual(139);
      });
    });
    describe(".extractDirectoryContent", () => {
      it("returns an array of the items within the directory as strings", () => {
        let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
        let expectedContent: string[] = ["dir e", "29116 f", "2557 g", "62596 h.lst"];
        scanner.loadTerminalOutput(exampleFilePath);
        expect(scanner.extractDirectoryContent("a")).toEqual(expectedContent);
      });
      it("returns an array of the items within the directory as strings when the file is ending", () => {
        let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
        let expectedContent: string[] = ["4060174 j", "8033020 d.log", "5626152 d.ext", "7214296 k"];
        scanner.loadTerminalOutput(exampleFilePath);
        expect(scanner.extractDirectoryContent("d")).toEqual(expectedContent);
      });
    });
    describe(".replaceSubDirectoryWithContent", () => {
      it("returns an array of the items within the directory as strings", () => {
        let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
        let expectedContent: string[] = ["dir e", "29116 f", "2557 g", "62596 h.lst"];
        scanner.loadTerminalOutput(exampleFilePath);
        expect(scanner.extractDirectoryContent("a")).toEqual(expectedContent);
      });
    });
    describe(".populateDirectoriesObject", () => {
      it("runs a first pass to add keys representing the directories with values representing their content", () => {
        let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
        let expectedDirectories = {
          a: ["dir e", "29116 f", "2557 g", "62596 h.lst"],
          d: ["4060174 j", "8033020 d.log", "5626152 d.ext", "7214296 k"],
          e: ["584 i"],
        };
        scanner.loadTerminalOutput(exampleFilePath);
        scanner.populateDirectoriesObject();
        expect(scanner.directories).toEqual(expectedDirectories);
      });
    });
    describe(".replaceSubDirectoriesWithContent", () => {
      it("does something I guess", () => {
        let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
        let expectedDirectories = {
          a: ["584 i", "29116 f", "2557 g", "62596 h.lst"],
          d: ["4060174 j", "8033020 d.log", "5626152 d.ext", "7214296 k"],
          e: ["584 i"],
        };
        scanner.loadTerminalOutput(exampleFilePath);
        scanner.populateDirectoriesObject();
        scanner.replaceSubDirectoriesWithContent();
        expect(scanner.directories).toEqual(expectedDirectories);
      });
    });
    describe(".getTotalSize", () => {
      it("returns a total size when given an array of files", () => {
        let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
        scanner.loadTerminalOutput(exampleFilePath);
        scanner.populateDirectoriesObject();
        scanner.replaceSubDirectoriesWithContent();
        expect(scanner.getTotalSize("d")).toEqual(24933642);
      });
    });
    describe(".getTotalSizes", () => {
      it("returns an array of directory sizes", () => {
        let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
        scanner.loadTerminalOutput(exampleFilePath);
        scanner.populateDirectoriesObject();
        scanner.replaceSubDirectoriesWithContent();
        expect(scanner.getTotalSizesWithUpperLimit(100000)).toEqual([94853, 584]);
      });
    });
    describe(".getSumOfTotalSizes", () => {
      describe("with an upper limit of 100000", () => {
        it("returns 95437 for the example dataset", () => {
          let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
          scanner.loadTerminalOutput(exampleFilePath);
          scanner.populateDirectoriesObject();
          scanner.replaceSubDirectoriesWithContent();
          expect(scanner.getSumOfTotalSizes(100000)).toEqual(95437);
        });
        it("returns 920996 for the example dataset", () => {
          let scanner: NoSpaceOnDevice = new NoSpaceOnDevice();
          scanner.loadTerminalOutput(inputFilePath);
          scanner.populateDirectoriesObject();
          scanner.replaceSubDirectoriesWithContent();
          // scanner.replaceSubDirectoriesWithContent();
          // scanner.replaceSubDirectoriesWithContent();
          // scanner.replaceSubDirectoriesWithContent();
          // scanner.replaceSubDirectoriesWithContent();
          expect(scanner.getSumOfTotalSizes(100000)).toEqual(920996);
        });
      });
    });
  });
});
