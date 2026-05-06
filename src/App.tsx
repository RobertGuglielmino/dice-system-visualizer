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
import DiceSystemSelect from "./DiceSystemSelect";
import { useRef, useState } from "react";

function App() {
  const dice = useDice((state) => state);

  const sections = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  // const diceSizes = [4, 6, 8, 10, 12, 20];

  const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set());

  const handleMouseDown = (key: number, _: number) => {
    setSelectedKeys(new Set([key]));
  };

  const handleMouseEnter = (e: React.MouseEvent, key: number) => {
    if (e.buttons === 1) {
      setSelectedKeys((prev) => new Set([...prev, key]));
    }
  };

  const [activeBorders, setActiveBorders] = useState<Set<string>>(new Set());

  const toggleBorder = (topKey: number, bottomKey: number) => {
    const id = `${topKey}|${bottomKey}`;
    setActiveBorders((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const getSections = (): number[][] => {
    // Keys in display order (reversed)
    const displayOrder = Array.from(renderResults().keys()).reverse();
    const sections: number[][] = [];
    let current: number[] = [];

    for (let i = 0; i < displayOrder.length; i++) {
      current.push(displayOrder[i]);
      const nextKey = displayOrder[i + 1];
      if (
        nextKey !== undefined &&
        activeBorders.has(`${displayOrder[i]}|${nextKey}`)
      ) {
        sections.push(current);
        current = [];
      }
    }
    if (current.length > 0) sections.push(current);
    return sections;
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const sum = Array.from(selectedKeys).reduce((acc, key) => {
    return acc + (renderResults().get(key) ?? 0);
  }, 0);

  const handleMouseUp = () => {
    setSelectedKeys(new Set());
  };

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

  console.log(getSections());

  return (
    <>
      <div className="flex flex-row justify-around px-64 py-8 transition-transform duration-300 ease-in-out bg-mist-50 min-h-screen">
        <div className="flex flex-col p-2 gap-8 items-center">
          <div className="flex flex-row items-center w-full">
            <div className="text-xs text-gray-400 w-20">
              first, choose a dice system
            </div>
            <div className="flex-1 flex justify-center">
              <DiceSystemSelect />
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

          <div className="flex flex-row items-center w-full">
            <div className="text-xs text-gray-400 w-20">
              these are the possible outcomes.
            </div>
            <div className="flex-1 flex justify-center">
              <div className="text-xl">
                {Array.from(renderProbabilities().entries())
                  .reverse().filter(([_, value]) => value > 0.01)
                  .map(([key, value], index) => {
                    const hue = index * 20;

                    return (
                      <div>
                        <div
                          style={{
                            backgroundColor: `oklch(0.9 0.12 ${hue})`,
                          }}
                          className={`flex items-center justify-center rounded text-center px-2 py-1 overflow-hidden transition-transform duration-300 ease-in-out
              ${selectedKeys.has(key) ? "border-green-500 border-2" : ""}`}
                        >
                          {key}: {Math.round(value * 100)}%
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center w-full mt-auto">
            <div className="text-xs text-gray-400 w-20">
              click and hover the boxes on the right to see their combioned likelihood.
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div>Highlighted outcomes:</div>
              <div className="text-2xl">{Math.min(100, sum)}%</div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center gap-6">
          <div className="flex flex-row w-50 h-200 rounded-lg">
            <div
              ref={containerRef}
              className="flex flex-col w-50 h-full rounded-lg transition-transform duration-300 ease-in-out select-none py-4"
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {Array.from(renderResults().entries())
                .reverse()
                .map(([key, value], index, arr) => {
                  const hue = index * 20;
                  const nextEntry = arr[index + 1];

                  return (
                    <>
                      <div
                        style={{
                          flex: value,
                          backgroundColor: `oklch(0.9 0.12 ${hue})`,
                        }}
                        className={`flex items-center justify-center rounded text-center cursor-pointer text-xs overflow-hidden transition-transform duration-300 ease-in-out
              ${selectedKeys.has(key) ? "border-green-500 border-2" : ""}`}
                        onMouseDown={() => handleMouseDown(key, value)}
                        onMouseEnter={(e) => handleMouseEnter(e, key)}
                      >
                        {key}
                      </div>

                      {nextEntry && (
                        <div
                          className="relative z-10 flex-none group cursor-pointer"
                          style={{
                            height: "20px",
                            margin: "-10px 0",
                          }}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            toggleBorder(key, nextEntry[0]);
                          }}
                        >
                          <div
                            className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 transition-colors
                              ${
                                activeBorders.has(`${key}|${nextEntry[0]}`)
                                  ? "bg-blue-500"
                                  : "bg-transparent group-hover:bg-gray-400"
                              }`}
                          />
                        </div>
                      )}
                    </>
                  );
                })}
            </div>

            <div className="flex flex-col w-5 h-full transition-transform duration-300 ease-in-out py-4">
              {sections.reverse().map((key, index) => {
                return (
                  <div
                    key={index}
                    style={{ flex: 10 }}
                    className="flex items-center justify-center border-b border-b-gray-300 transition-transform duration-300 ease-in-out text-gray-300 text-xs text-center"
                  >
                    {key}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
