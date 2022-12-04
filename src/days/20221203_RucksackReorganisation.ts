import { Console } from "console";
import { FileLoader } from "../helpers/FileLoader";
import { sumArray } from "../helpers/mathsUtils";

const PLAYER_WINS: string = "Player wins";
const OPPONENT_WINS: string = "Opponent wins";
const DRAW: string = "Draw";

const ROCK: string = "Rock";
const PAPER: string = "Paper";
const SCISSORS: string = "Scissors";

const LOSE: string = "Lose";
const WIN: string = "Win";

export class RockPaperScissors {
    loader: any;
    rounds: string[][];
    inputLines: string[];
    elfCalories: number[][] = [];
    elfCalorieTotals: number[] = [];

    shapeTable = {
        "A": ROCK,
        "X": ROCK,
        "B": PAPER,
        "Y": PAPER,
        "C": SCISSORS,
        "Z": SCISSORS,
    }

    desiredOutcomeTable = {
        "X": LOSE,
        "Y": DRAW,
        "Z": WIN,
    }

    constructor(loader = FileLoader) {
        this.loader = loader;
    }

    public loadStrategyGuide(path: string) {
        let fileLoader = new this.loader(path);
        this.inputLines = fileLoader.splitByLine();
        this.rounds = this.inputLines.map(line => line.split(" "));
    }

    public getTotalScore(calculate: boolean = false): number {
        let scoredRounds: number[] = this.rounds.map(round => this.scoreRound(round, calculate));
        return sumArray(scoredRounds);
    }

    public scoreRound(round: string[], calculate: boolean): number {
        let choices = {
            opponent: this.shapeTable[round[0]],
            player: calculate ? this.calculateChoice(round) : this.shapeTable[round[1]]
        };

        let shapeScore = this.scoreShapeChoice(choices.player);
        let outcomeScore = this.scoreRoundOutcome(choices);
        let totalRoundScore = shapeScore + outcomeScore;

        return totalRoundScore;
    }

    public calculateChoice(round): string {
        let desiredOutcome = this.desiredOutcomeTable[round[1]];
        let playerChoice: string;
        let opponentChoice: string = this.shapeTable[round[0]];
        console.debug(`Desired Outcome: ${desiredOutcome}, Opponent Choice: ${opponentChoice}`);
        if (desiredOutcome === WIN) {
            switch (opponentChoice) {
                case ROCK: {
                    playerChoice = PAPER;
                    break;
                }
                case PAPER: {
                    playerChoice = SCISSORS;
                    break;
                }
                case SCISSORS: {
                    playerChoice = ROCK;
                    break;
                }
            }
        } else if (desiredOutcome === LOSE) {
            switch (opponentChoice) {
                case ROCK: {
                    playerChoice = SCISSORS;
                    break;
                }
                case PAPER: {
                    playerChoice = ROCK;
                    break;
                }
                case SCISSORS: {
                    playerChoice = PAPER;
                    break;
                }
            }
        } else if (desiredOutcome === DRAW) {
            playerChoice = opponentChoice;
        }
        console.debug(`Player Choice: ${playerChoice}`);
        return playerChoice;
    }

    public scoreShapeChoice(shape: string): number {
        let score: number;
        switch (shape) {
            case ROCK: {
                score = 1;
                break;
            }
            case PAPER: {
                score = 2;
                break;
            }
            case SCISSORS: {
                score = 3;
                break;
            }
        }
        return score;
    }

    public scoreRoundOutcome(choices: {
        opponent: string,
        player: string
    }): number {
        let outcome: string = this.roundOutcome(choices);

        let score: number;
        switch (outcome) {
            case PLAYER_WINS: {
                score = 6;
                break;
            };
            case OPPONENT_WINS: {
                score = 0;
                break;
            };
            case DRAW: {
                score = 3;
                break;
            };
        }

        return score;
    }

    public roundOutcome(choices: {
        opponent: string,
        player: string
    }): string {
        let outcome: string

        if (choices.opponent === choices.player) {
            outcome = DRAW;
        } else if (choices.opponent === ROCK && choices.player === SCISSORS) {
            outcome = OPPONENT_WINS;
        } else if (choices.opponent === SCISSORS && choices.player === PAPER) {
            outcome = OPPONENT_WINS;
        } else if (choices.opponent === PAPER && choices.player === ROCK) {
            outcome = OPPONENT_WINS;
        } else {
            outcome = PLAYER_WINS;
        }

        return outcome;
    }
}
