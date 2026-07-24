import "./App.css";

import { useDice } from "./store/store";
import DiceSystemSelect from "./components/DiceSystemSelect";
import CountSuccesses from "./components/CountSuccesses";
import RollTotal from "./components/RollTotal";
import HighestDie from "./components/HighestDie";
import DiceScaleSelect from "./components/DiceScaleSelect";

function App() {
  const dice = useDice((state) => state);


  function setThresholdBounded(num: number) {
    if (dice.systemType !== "rollTotal") {
      dice.setSuccessThreshold(Math.min(num, dice.currentDiceSize));
    } else dice.setSuccessThreshold(num);
  }

  return (
    <>
      <div className="flex flex-row justify-around px-32 py-8 transition-all duration-300 ease-in-out bg-ivory min-h-screen">
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
                        setThresholdBounded(Number(e.target.value))
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
                        setThresholdBounded(Number(e.target.value))
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
                          setThresholdBounded(
                            Math.max(Number(e.target.value), 1),
                          )
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
                          dice.setSuccessThreshold2(
                            Math.max(Number(e.target.value), 1),
                          )
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
                          dice.setSuccessThreshold3(
                            Math.max(Number(e.target.value), 1),
                          )
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
              <RollTotal  />
            )}
            {dice.systemType === "countSuccesses" && (
              <CountSuccesses />
            )}
            {dice.systemType === "highestDie" && (
              <HighestDie  />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
