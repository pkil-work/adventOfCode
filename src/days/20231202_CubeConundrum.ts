import { FileLoader } from "../helpers/FileLoader";
import { maximumValueOfArray, sumArray } from "../helpers/mathsUtils";

export interface bagContent {
  red: number;
  green: number;
  blue: number;
}

export class Game {
  number: number;
  rounds: bagContent[];

  constructor(number: number, rounds: bagContent[]) {
    this.number = number;
    this.rounds = rounds;
  }

  private isRoundPossible(subGame: bagContent, bagContent: bagContent): boolean {
    return (subGame.red <= bagContent.red)
      && (subGame.green <= bagContent.green)
      && (subGame.blue <= bagContent.blue);
  }

  public isPossible(knownBag: bagContent): boolean {
    return this.rounds.every(round => this.isRoundPossible(round, knownBag));
  }

  public getPower(): number {
    return maximumValueOfArray(this.rounds.map(round => round.red))
      * maximumValueOfArray(this.rounds.map(round => round.green))
      * maximumValueOfArray(this.rounds.map(round => round.blue));
  }
}

export class GameRunner {
  loader: any;
  content: bagContent;
  gameStrings: string[];
  games: Game[];

  constructor(content: bagContent, loader = FileLoader) {
    this.content = content;
    this.loader = loader;
    this.games = [];
  }

  public loadGameData(path: string): void {
    let fileLoader = new this.loader(path);
    this.extractAllGames(fileLoader.splitByLine());
  }

  public extractAllGames(inputs: string[]) {
    this.games = [];
    inputs.forEach(game => {
      this.games.push(this.extractGame(game))
    })
  }

  public sumGamePowers() {
    return sumArray(this.games.map(game => game.getPower()));
  }

  public sumPossibleGameIds() {
    return sumArray(this.calculatePossibleGames());
  }

  public calculatePossibleGames() {
    return this.games.filter(game => game.isPossible(this.content)).map(game => game.number)
  }

  // --- Private Methods --- //

  private extractGame(input: string): Game {
    const gameRegexp = /Game (\d+):/g;
    const gameMatch = [...input.matchAll(gameRegexp)];
    const gameNumber = parseInt(gameMatch[0][1]);

    let gameString = input.split(": ")[1];
    let rounds = gameString.split("; ").map(this.convertGameToBag)

    return new Game(
      gameNumber,
      rounds
    );
  }

  private convertGameToBag(input: string): bagContent {
    const redRegexp = /(\d+) red/g;
    const greenRegexp = /(\d+) green/g;
    const blueRegexp = /(\d+) blue/g;

    const redMatch = [...input.matchAll(redRegexp)];
    const greenMatch = [...input.matchAll(greenRegexp)];
    const blueMatch = [...input.matchAll(blueRegexp)];

    const output = {
      red: redMatch[0]?.length ? parseInt(redMatch[0][1]) : 0,
      green: greenMatch[0]?.length ? parseInt(greenMatch[0][1]) : 0,
      blue: blueMatch[0]?.length ? parseInt(blueMatch[0][1]) : 0,
    }
    return output;
  }

}
