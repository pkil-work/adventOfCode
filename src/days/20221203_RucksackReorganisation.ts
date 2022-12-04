import { groupIntoChunks } from "../helpers/arrayUtils";
import { FileLoader } from "../helpers/FileLoader";
import { sumArray } from "../helpers/mathsUtils";
import { characterValues } from "../resources/characterValues";

export class RucksackReorganisation {
  loader: any;
  inputLines: string[];

  constructor(loader = FileLoader) {
    this.loader = loader;
  }

  public loadRucksackContents(path: string) {
    let fileLoader = new this.loader(path);
    this.inputLines = fileLoader.splitByLine();
  }

  public getSumOfPriorities(): number {
    let characters: string[] = this.mapRucksacksToRepeatedCharacter(this.inputLines);
    let values: number[] = characters.map(this.getCharacterValue);
    return sumArray(values);
  }

  public getSumOfBadgePriorities(): number {
    let characters: string[] = this.mapRucksackGroupsToBadgeCharacter(this.inputLines);
    let values: number[] = characters.map(this.getCharacterValue);
    return sumArray(values);
  }

  public getCharacterValue(character: string): number {
    return characterValues[character];
  }

  public splitRucksackIntoCompartments(rucksack: string): string[] {
    let lineLength: number = rucksack.length;
    let firstCompartment: string = rucksack.slice(0, lineLength / 2);
    let secondCompartment: string = rucksack.slice(lineLength / 2, lineLength);

    return [firstCompartment, secondCompartment];
  }

  public findRepeatedCharacter(rucksack: string): string {
    let compartments = this.splitRucksackIntoCompartments(rucksack);
    let firstCompartment: string[] = compartments[0].split("");
    let secondCompartment: string[] = compartments[1].split("");
    let repeatedCharacter = firstCompartment.filter((character) => {
      return secondCompartment.indexOf(character) !== -1;
    });

    return repeatedCharacter[0];
  }

  public findBadgeCharacter(rucksackGroup: string[]): string {
    let firstBag: string[] = rucksackGroup[0].split("");
    let secondBag: string[] = rucksackGroup[1].split("");
    let thirdBag: string[] = rucksackGroup[2].split("");
    let repeatedCharacters = firstBag.filter((character) => {
      return secondBag.indexOf(character) !== -1;
    });
    let badgeCharacters = repeatedCharacters.filter((character) => {
      return thirdBag.indexOf(character) !== -1;
    });

    return badgeCharacters[0];
  }

  public mapRucksacksToRepeatedCharacter(rucksacks: string[]): string[] {
    return rucksacks.map((rucksack) => this.findRepeatedCharacter(rucksack));
  }

  public mapRucksackGroupsToBadgeCharacter(rucksacks: string[]): string[] {
    let rucksackGroups = groupIntoChunks(rucksacks, 3) as string[][];
    return rucksackGroups.map((rucksackGroup) => this.findBadgeCharacter(rucksackGroup));
  }
}
