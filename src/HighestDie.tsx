import SectionGraph from "./SectionGraph";
import { useDice } from "./store/store";
import { countSuccesses, highestDie, rollTotal } from "./utils/equations";

interface SectionGraphProps {
  renderResults: Map<number, number>;
}

export default function HighestDie({}: SectionGraphProps) {
  const dice = useDice((state) => state);

  const nums: number[] = [0, 1, 2, 3, 4];

  return (
    <div className="flex flex-row w-50 h-200 rounded-lg">
      {dice.scaleType === "numDice" && (
        <>
          {nums.map((num) => (
            <SectionGraph
              renderResults={highestDie(
                dice.currentDiceNum + num,
                dice.currentDiceSize,
                dice.dropNumber,
              )}
            />
          ))}
        </>
      )}
      {dice.scaleType === "numDrop" && (
        <>
          {nums.map((num) => (
            <SectionGraph
              renderResults={highestDie(
                dice.currentDiceNum,
                dice.currentDiceSize,
                dice.dropNumber + num,
              )}
            />
          ))}
        </>
      )}
    </div>
  );
}
