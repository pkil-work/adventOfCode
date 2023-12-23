import { Game, GameRunner, bagContent } from "../../src/days/20231202_CubeConundrum";

describe.only("2023 Day 2 - Cube Conundrum", () => {
  const exampleFilePath: string = "../resources/20231202-example-001.txt";
  const exampleTwoFilePath: string = "../resources/20231202-example-002.txt";
  const inputFilePath: string = "../resources/20231202-input.txt";

  const expectedRawData: string[] = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
  ];

  const exampleContent: bagContent = {
    "red": 12,
    "green": 13,
    "blue": 14
  }

  describe("Game", () => {
    let game: Game;

    describe("predicate methods for game and round", () => {
      const possibleRounds = [
        { "red": 4, "green": 0, "blue": 3 },
        { "red": 0, "green": 12, "blue": 0 },
        { "red": 12, "green": 13, "blue": 14 },
      ];
      const impossibleRounds = [
        { "red": 13, "green": 13, "blue": 13 },
        { "red": 0, "green": 20, "blue": 0 },
        { "red": 100, "green": 100, "blue": 100 },
      ];
      const impossibleGame = [
        ...possibleRounds,
        impossibleRounds[1]
      ];
      describe(".isPossible", () => {
        describe("with default bag Content", () => {
          it("with all possible rounds returns true", () => {
            game = new Game(1, possibleRounds);
            expect(game.isPossible(exampleContent)).toEqual(true);
          });
          it("with all impossible rounds returns false", () => {
            game = new Game(1, impossibleRounds);
            expect(game.isPossible(exampleContent)).toEqual(false);
          });
          it("with some but not all possible rounds returns false", () => {
            game = new Game(1, impossibleGame);
            expect(game.isPossible(exampleContent)).toEqual(false);
          });
        });
      });

      describe(".getPower", () => {
        const runner = new GameRunner(exampleContent);
        runner.loadGameData(exampleFilePath);
        const firstRounds = [
          { "red": 4, "green": 0, "blue": 3 },
          { "red": 1, "green": 2, "blue": 6 },
          { "red": 0, "green": 2, "blue": 0 }
        ]
        describe("with default bag Content", () => {
          // 12, 1560, 630, and 36
          it("with rounds for example game 1 returns 48", () => {
            game = new Game(1, firstRounds);
            expect(game.getPower()).toEqual(48);
          });
          it("with rounds for example game 1 returns 48", () => {
            expect(runner.games[0].getPower()).toEqual(48);
          });
          it("with rounds for example game 2 returns 12", () => {
            expect(runner.games[1].getPower()).toEqual(12);
          });
          it("with rounds for example game 3 returns 1560", () => {
            expect(runner.games[2].getPower()).toEqual(1560);
          });
          it("with rounds for example game 4 returns 630", () => {
            expect(runner.games[3].getPower()).toEqual(630);
          });
          it("with rounds for example game 5 returns 36", () => {
            expect(runner.games[4].getPower()).toEqual(36);
          });
        });
      });
    });

  });

  describe("GameRunner", () => {
    let runner: GameRunner;
    beforeEach(() => {
      runner = new GameRunner(exampleContent);
    });

    describe(".loadGameData", () => {
      describe("using the example data", () => {
        it("loads the raw calibration data into an array of Game objects", () => {
          runner.loadGameData(exampleFilePath);
          expect(runner.games.length).toEqual(5);
        });
      });
      describe("using the input data", () => {
        it("loads the raw calibration data into an array of Game objects", () => {
          runner.loadGameData(inputFilePath);
          expect(runner.games.length).toEqual(100);
        });
      });
    });

    describe(".extractAllGames", () => {
      it("extracts from an array of strings", () => {
        runner.extractAllGames(expectedRawData);
        expect(runner.games.length).toEqual(5);
      });
    });

    describe(".calculatePossibleGames", () => {
      describe("using the example data", () => {
        it("extracts from an array of strings", () => {
          runner.loadGameData(exampleFilePath);
          const output = runner.calculatePossibleGames();
          expect(output).toEqual([1, 2, 5]);
        });
      });
    });

    describe(".sumPossibleGameIds", () => {
      describe("using the example data", () => {
        it("returns 8", () => {
          runner.loadGameData(exampleFilePath);
          expect(runner.sumPossibleGameIds()).toEqual(8);
        });
      });
      describe("using the example data", () => {
        it("extracts from an array of strings", () => {
          runner.loadGameData(inputFilePath);
          expect(runner.sumPossibleGameIds()).toEqual(1734);
        });
      });
    });

    describe(".sumGamePowers", () => {
      describe("using the example data", () => {
        it("returns 2286", () => {
          runner.loadGameData(exampleFilePath);
          expect(runner.sumGamePowers()).toEqual(2286);
        });
      });
      describe("using the example data", () => {
        it("extracts from an array of strings", () => {
          runner.loadGameData(inputFilePath);
          expect(runner.sumGamePowers()).toEqual(70387);
        });
      });
    });

  });
});
