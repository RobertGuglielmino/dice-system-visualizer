import "./App.css";
import {
  countSuccesses,
  countSuccessesProbability,
  highestDie,
  highestDieProbability,
  rollTotal,
  rollTotalProbability,
} from "./utils/equations";
import { useDice } from "./store/store";
import DiceSystemSelect from "./components/DiceSystemSelect";
import CountSuccesses from "./components/CountSuccesses";
import RollTotal from "./components/RollTotal";
import HighestDie from "./components/HighestDie";
import DiceScaleSelect from "./components/DiceScaleSelect";

function App() {
  const dice = useDice((state) => state);

  const sections = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  function renderResults() {
    switch (dice.systemType) {
      case "rollTotal":
        return rollTotal(dice.currentDiceNum, dice.currentDiceSize);
      case "countSuccesses":
        return countSuccesses(
          dice.currentDiceNum,
          dice.currentDiceSize,
          dice.successThreshold,
        );
      case "highestDie":
        return highestDie(
          dice.currentDiceNum,
          dice.currentDiceSize,
          dice.dropNumber,
        );
      default:
        return new Map<number, number>();
    }
  }

  function renderProbabilities() {
    switch (dice.systemType) {
      case "rollTotal":
        return rollTotalProbability(dice.currentDiceNum, dice.currentDiceSize);
      case "countSuccesses":
        return countSuccessesProbability(
          dice.currentDiceNum,
          dice.currentDiceSize,
          dice.successThreshold,
        );
      case "highestDie":
        return highestDieProbability(
          dice.currentDiceNum,
          dice.currentDiceSize,
          dice.dropNumber,
        );
      default:
        return new Map<number, number>();
    }
  }
  console.log("count Sucesses", countSuccesses(dice.currentDiceNum, dice.currentDiceSize, dice.successThreshold));
  console.log("count Probabilities", countSuccessesProbability(dice.currentDiceNum, dice.currentDiceSize, dice.successThreshold));

  return (
    <>
      <div className="flex flex-row justify-around px-32 py-8 transition-all duration-300 ease-in-out bg-mist-50 min-h-screen">
        <div className="flex flex-col p-2 gap-8 items-center">
          <div className="flex flex-row items-center w-full">
            <div className="flex flex-row items-center w-full">
              <div className="text-xs text-gray-400 w-20">
                first, choose a dice system
              </div>
              <div className="flex-1 flex justify-center">
                <DiceSystemSelect />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center w-full">
            <div className="text-xs text-gray-400 w-20">
              then, select a dice pool
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex flex-row text-3xl font-bold">
                <input
                  type="number"
                  value={dice.currentDiceNum}
                  className="text-right w-12 border border-dashed border-gray-400 rounded"
                  onChange={(e) =>
                    dice.setCurrentDiceNum(Number(e.target.value))
                  }
                />
                d
                <input
                  type="number"
                  value={dice.currentDiceSize}
                  className="text-right w-14  border border-dashed border-gray-400 rounded"
                  onChange={(e) =>
                    dice.setCurrentDiceSize(Number(e.target.value))
                  }
                />
              </div>
            </div>
          </div>

          {dice.systemType === "rollTotal" && (
            <>
              <div className="flex flex-row items-center w-full">
                <div className="text-xs text-gray-400 w-20">
                  and a success threshold
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex flex-row text-3xl font-bold">
                    <input
                      type="number"
                      value={dice.successThreshold}
                      className="text-right w-12 border border-gray-400 rounded"
                      onChange={(e) =>
                        dice.setSuccessThreshold(Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center w-full">
                <div className="text-xs text-gray-400 w-20 h-40">
                  then, choose how you would modify the dice pool
                </div>
                <div className="flex-1 flex justify-center">
                  <DiceScaleSelect />
                </div>
              </div>
            </>
          )}

          {dice.systemType === "countSuccesses" && (
            <>
              <div className="flex flex-row items-center w-full">
                <div className="text-xs text-gray-400 w-20">
                  and a success threshold
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex flex-row text-3xl font-bold">
                    <input
                      type="number"
                      value={dice.successThreshold}
                      className="text-right w-12 border border-gray-400 rounded"
                      onChange={(e) =>
                        dice.setSuccessThreshold(Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center w-full">
                <div className="text-xs  text-gray-400 w-20 h-40">
                  then, choose how you would modify the dice pool
                </div>
                <div className="flex-1 flex justify-center">
                  <DiceScaleSelect />
                </div>
              </div>
            </>
          )}
          {dice.systemType === "highestDie" && (
            <>
              <div className="flex flex-col justify-center w-full">
                <div className="flex flex-row items-center w-full">
                  <div className="text-xs text-gray-400 w-20">
                    a success threshold
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-row text-3xl font-bold">
                      <input
                        type="number"
                        value={dice.successThreshold}
                        className="text-right w-12 border border-gray-400 rounded"
                        onChange={(e) =>
                          dice.setSuccessThreshold(Math.max(Number(e.target.value), 0))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center w-full">
                  <div className="text-xs text-gray-400 w-20">
                    a 2nd success threshold (optional)
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-row text-3xl font-bold">
                      <input
                        type="number"
                        value={dice.successThreshold2}
                        className="text-right w-12 border border-gray-400 rounded"
                        onChange={(e) =>
                          dice.setSuccessThreshold2(Math.max(Number(e.target.value), 0))
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center w-full">
                  <div className="text-xs text-gray-400 w-20">
                    a 3rd success threshold (optional)
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-row text-3xl font-bold">
                      <input
                        type="number"
                        value={dice.successThreshold3}
                        className="text-right w-12 border border-gray-400 rounded"
                        onChange={(e) =>
                          dice.setSuccessThreshold3(Math.max(Number(e.target.value), 0))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center w-full">
                <div className="text-xs text-gray-400 w-20 h-40">
                  then, choose how you would modify the dice pool
                </div>
                <div className="flex-1 flex justify-center">
                  <DiceScaleSelect />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-row justify-center items-center gap-6">
          <div className="flex flex-row w-100 h-200 rounded-lg">
            {dice.systemType === "rollTotal" && (
              <RollTotal renderResults={undefined} />
            )}
            {dice.systemType === "countSuccesses" && (
              <CountSuccesses renderResults={undefined} />
            )}
            {dice.systemType === "highestDie" && (
              <HighestDie renderResults={undefined} />
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
