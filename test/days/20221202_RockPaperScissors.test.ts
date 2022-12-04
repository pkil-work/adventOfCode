import { RockPaperScissors } from "../../src/days/20221202_RockPaperScissors";

describe("2022 Day 2 - Rock Paper Scissors", () => {
  const exampleDataSetFilePath: string = "../resources/20221202-example.txt";
  const inputSnippetFilePath: string = "../resources/20221202-snippet.txt";
  const inputDataSetFilePath: string = "../resources/20221202-input.txt";
  const ROCK = "Rock";
  const PAPER = "Paper";
  const SCISSORS = "Scissors";

  describe("RockPaperScissors", () => {
    describe(".getTotalScore", () => {
      describe("when using the strategy guide as a set of choices", () => {
        it("returns 15 for the example data set", () => {
          let game: RockPaperScissors = new RockPaperScissors();
          game.loadStrategyGuide(exampleDataSetFilePath);
          expect(game.getTotalScore()).toEqual(15);
        });
        it("returns 41 for the input snippet", () => {
          let game: RockPaperScissors = new RockPaperScissors();
          game.loadStrategyGuide(inputSnippetFilePath);
          expect(game.getTotalScore()).toEqual(41);
        });
        it("returns 14827 for the input snippet", () => {
          let game: RockPaperScissors = new RockPaperScissors();
          game.loadStrategyGuide(inputDataSetFilePath);
          expect(game.getTotalScore()).toEqual(14827);
        });
      });
      describe("when using the strategy guide as a choice and a desired outcome", () => {
        it("returns 12 for the example data set", () => {
          let game: RockPaperScissors = new RockPaperScissors();
          game.loadStrategyGuide(exampleDataSetFilePath);
          expect(game.getTotalScore(true)).toEqual(12);
        });
        it("returns 45 for the input snippet", () => {
          let game: RockPaperScissors = new RockPaperScissors();
          game.loadStrategyGuide(inputSnippetFilePath);
          expect(game.getTotalScore(true)).toEqual(45);
        });
        it("returns 13889 for the input data", () => {
          let game: RockPaperScissors = new RockPaperScissors();
          game.loadStrategyGuide(inputDataSetFilePath);
          expect(game.getTotalScore(true)).toEqual(13889);
        });
      });
    });

    describe(".scoreShapeChoice", () => {
      let game: RockPaperScissors = new RockPaperScissors();
      it("returns 1 for Rock ('X')", () => {
        expect(game.scoreShapeChoice(ROCK)).toEqual(1);
      });
      it("returns 2 for Paper ('Y')", () => {
        expect(game.scoreShapeChoice(PAPER)).toEqual(2);
      });
      it("returns 3 for Scissors ('Z')", () => {
        expect(game.scoreShapeChoice(SCISSORS)).toEqual(3);
      });
    });

    describe(".scoreRoundOutcome", () => {
      let game: RockPaperScissors = new RockPaperScissors();
      it("returns 6 for a win", () => {
        expect(
          game.scoreRoundOutcome({
            player: ROCK,
            opponent: SCISSORS,
          })
        ).toEqual(6);
      });
      it("returns 0 for a loss", () => {
        expect(
          game.scoreRoundOutcome({
            player: PAPER,
            opponent: SCISSORS,
          })
        ).toEqual(0);
      });
      it("returns 3 for a draw", () => {
        expect(
          game.scoreRoundOutcome({
            player: PAPER,
            opponent: PAPER,
          })
        ).toEqual(3);
      });
    });

    describe(".calculateChoice", () => {
      let game: RockPaperScissors = new RockPaperScissors();
      it("returns 'Scissors' when an opponent has chosen 'Rock' and a loss is expected", () => {
        expect(game.calculateChoice(["A", "X"])).toEqual("Scissors");
      });
      it("returns 'Rock' when an opponent has chosen 'Rock' and a draw is expected", () => {
        expect(game.calculateChoice(["A", "Y"])).toEqual("Rock");
      });
      it("returns 'Paper' when an opponent has chosen 'Rock' and a win is expected", () => {
        expect(game.calculateChoice(["A", "Z"])).toEqual("Paper");
      });
    });

    describe(".roundOutcome", () => {
      describe("when a player chooses rock", () => {
        let game: RockPaperScissors = new RockPaperScissors();
        let roundChoices = {
          player: ROCK,
          opponent: "",
        };
        it("returns 'Player wins' when the opponent chooses Scissors", () => {
          roundChoices.opponent = SCISSORS;
          expect(game.roundOutcome(roundChoices)).toEqual("Player wins");
        });
        it("returns 'Opponent wins' when the opponent chooses Paper", () => {
          roundChoices.opponent = PAPER;
          expect(game.roundOutcome(roundChoices)).toEqual("Opponent wins");
        });
        it("returns 'Draw' when the opponent chooses Rock", () => {
          roundChoices.opponent = ROCK;
          expect(game.roundOutcome(roundChoices)).toEqual("Draw");
        });
      });
      describe("when a player chooses paper", () => {
        let game: RockPaperScissors = new RockPaperScissors();
        let roundChoices = {
          player: PAPER,
          opponent: "",
        };
        it("returns 'Player wins' when the opponent chooses Rock", () => {
          roundChoices.opponent = ROCK;
          expect(game.roundOutcome(roundChoices)).toEqual("Player wins");
        });
        it("returns 'Opponent wins' when the opponent chooses Scissors", () => {
          roundChoices.opponent = SCISSORS;
          expect(game.roundOutcome(roundChoices)).toEqual("Opponent wins");
        });
        it("returns 'Draw' when the opponent chooses Paper", () => {
          roundChoices.opponent = PAPER;
          expect(game.roundOutcome(roundChoices)).toEqual("Draw");
        });
      });
      describe("when a player chooses scissors", () => {
        let game: RockPaperScissors = new RockPaperScissors();
        let roundChoices = {
          player: SCISSORS,
          opponent: "",
        };
        it("returns 'Player wins' when the opponent chooses Paper", () => {
          roundChoices.opponent = PAPER;
          expect(game.roundOutcome(roundChoices)).toEqual("Player wins");
        });
        it("returns 'Opponent wins' when the opponent chooses Rock", () => {
          roundChoices.opponent = ROCK;
          expect(game.roundOutcome(roundChoices)).toEqual("Opponent wins");
        });
        it("returns 'Draw' when the opponent chooses Scissors", () => {
          roundChoices.opponent = SCISSORS;
          expect(game.roundOutcome(roundChoices)).toEqual("Draw");
        });
      });
    });
  });
});
