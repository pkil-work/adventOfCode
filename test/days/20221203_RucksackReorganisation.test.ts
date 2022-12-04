import { RucksackReorganisation } from "../../src/days/20221203_RucksackReorganisation";

describe("2022 Day 3 - Rucksack Reorganisation", () => {
  const exampleDataSetFilePath: string = "../resources/20221203-example.txt";
  const inputSnippetFilePath: string = "../resources/20221203-snippet.txt";
  const inputDataSetFilePath: string = "../resources/20221203-input.txt";

  describe("RucksackReorganisation", () => {
    describe(".getSumOfPriorities", () => {
      it("returns 157 for the example data set", () => {
        let organiser: RucksackReorganisation = new RucksackReorganisation();
        organiser.loadRucksackContents(exampleDataSetFilePath);
        expect(organiser.getSumOfPriorities()).toEqual(157);
      });
      it("returns 192 for the input snippet", () => {
        let organiser: RucksackReorganisation = new RucksackReorganisation();
        organiser.loadRucksackContents(inputSnippetFilePath);
        expect(organiser.getSumOfPriorities()).toEqual(192);
      });
      it("returns 7917 for the input data set", () => {
        let organiser: RucksackReorganisation = new RucksackReorganisation();
        organiser.loadRucksackContents(inputDataSetFilePath);
        expect(organiser.getSumOfPriorities()).toEqual(7917);
      });
    });
    describe(".getSumOfBadgePriorities", () => {
      it("returns 70 for the example data set", () => {
        let organiser: RucksackReorganisation = new RucksackReorganisation();
        organiser.loadRucksackContents(exampleDataSetFilePath);
        expect(organiser.getSumOfBadgePriorities()).toEqual(70);
      });
      it("returns 52 for the input snippet", () => {
        let organiser: RucksackReorganisation = new RucksackReorganisation();
        organiser.loadRucksackContents(inputSnippetFilePath);
        expect(organiser.getSumOfBadgePriorities()).toEqual(52);
      });
      it("returns 2585 for the input data set", () => {
        let organiser: RucksackReorganisation = new RucksackReorganisation();
        organiser.loadRucksackContents(inputDataSetFilePath);
        expect(organiser.getSumOfBadgePriorities()).toEqual(2585);
      });
    });
    describe(".getCharacterValue", () => {
      let organiser: RucksackReorganisation = new RucksackReorganisation();
      it("returns 1 for the character 'a'", () => {
        organiser.loadRucksackContents(exampleDataSetFilePath);
        expect(organiser.getCharacterValue("a")).toEqual(1);
      });
      it("returns 27 for the character 'A'", () => {
        organiser.loadRucksackContents(inputSnippetFilePath);
        expect(organiser.getCharacterValue("A")).toEqual(27);
      });
    });
    describe(".splitRucksackIntoCompartments", () => {
      let organiser: RucksackReorganisation = new RucksackReorganisation();
      it("returns the string sliced in half as an array of two strings", () => {
        expect(organiser.splitRucksackIntoCompartments("aaaabbbb")).toEqual(["aaaa", "bbbb"]);
      });
      it("returns the string sliced in half as an array of two strings", () => {
        expect(organiser.splitRucksackIntoCompartments("QLFdFCdlLcVqdvFLnFLSSShZwptfHHhfZZZpSwfmHp")).toEqual(["QLFdFCdlLcVqdvFLnFLSS", "ShZwptfHHhfZZZpSwfmHp"]);
      });
    });
    describe(".findRepeatedCharacter", () => {
      let organiser: RucksackReorganisation = new RucksackReorganisation();
      it("returns a single character that is repeated in both halves of a string", () => {
        expect(organiser.findRepeatedCharacter("aapaabbbpb")).toEqual("p");
      });
    });
    describe(".mapRucksacksToRepeatedCharacter", () => {
      let organiser: RucksackReorganisation = new RucksackReorganisation();
      it("returns an array of repeated characters from a single rucksack string in an array", () => {
        let rucksackArray = ["acaaabbbcb"];
        expect(organiser.mapRucksacksToRepeatedCharacter(rucksackArray)).toEqual(["c"]);
      });
      it("returns an array of repeated characters from multiple rucksack strings in an array", () => {
        let rucksackArray = ["acaaabbbcb", "aaajajbbbb", "QaaaaQbbbb", "aaaLabbbLb"];
        expect(organiser.mapRucksacksToRepeatedCharacter(rucksackArray)).toEqual(["c", "j", "Q", "L"]);
      });
    });
    describe(".mapRucksackGroupsToBadgeCharacter", () => {
      let organiser: RucksackReorganisation = new RucksackReorganisation();
      it("returns an array of arrays of three strings", () => {
        let rucksacks = ["111a11", "22a222", "3a3333", "4B4444", "55555B", "6666B6"];
        let expectedOutput = ["a", "B"];
        expect(organiser.mapRucksackGroupsToBadgeCharacter(rucksacks)).toEqual(expectedOutput);
      });
    });
  });
});
