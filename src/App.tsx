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
import { useState } from "react";
import SectionGraph from "./SectionGraph";
import CountSuccesses from "./CountSuccesses";
import RollTotal from "./RollTotal";
import HighestDie from "./HighestDie";
import DiceScaleSelect from "./DiceScaleSelect";

function App() {
  const dice = useDice((state) => state);

  const sections = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  // const diceSizes = [4, 6, 8, 10, 12, 20];

  const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set());

  const getSections = (): number[][] => {
    // Keys in display order (reversed)
    const displayOrder = Array.from(renderResults().keys()).reverse();
    const sections: number[][] = [];
    let current: number[] = [];

    for (let i = 0; i < displayOrder.length; i++) {
      current.push(displayOrder[i]);
      const nextKey = displayOrder[i + 1];
      if (nextKey !== undefined) {
        sections.push(current);
        current = [];
      }
    }
    if (current.length > 0) sections.push(current);
    return sections;
  };

  const sum = Array.from(selectedKeys).reduce((acc, key) => {
    return acc + (renderResults().get(key) ?? 0);
  }, 0);

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
            <DiceScaleSelect />
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
              and a success threshold
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex flex-row text-3xl font-bold">
                <input
                  type="number"
                  value={dice.currentThreshold}
                  className="text-right w-12 border border-gray-400 rounded"
                  onChange={(e) => dice.setThreshold(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center gap-6">
          <div className="flex flex-row w-50 h-200 rounded-lg">
            {dice.systemType === "rollTotal" && (
              <RollTotal renderResults={undefined} />
            )}
            {dice.systemType === "countSuccesses" && (
              <CountSuccesses renderResults={undefined} />
            )}
            {dice.systemType === "highestDie" && (
              <HighestDie renderResults={undefined} />
            )}

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
