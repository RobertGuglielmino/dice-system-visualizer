import SectionGraph from "./SectionGraph";
import { useDice } from "./store/store";
import { countSuccesses, rollTotal } from "./utils/equations";

interface SectionGraphProps {
  renderResults: Map<number, number>;
}

export default function RollTotal({  }: SectionGraphProps) {
  const dice = useDice((state) => state);

  const nums: number[] = [0, 1, 2, 3, 4];

  return (
    <div className="flex flex-row w-50 h-200 rounded-lg">
      {dice.scaleType === "numDice" && (
        <>
          {nums.map((num) => (
            <SectionGraph
              renderResults={rollTotal(
                dice.currentDiceNum + num,
                dice.currentDiceSize,
              )}
            />
          ))}
        </>
      )}
      {dice.scaleType === "mod" && (
        <>
          {nums.map((num) => (
            <SectionGraph
              renderResults={rollTotal(
                dice.currentDiceNum,
                dice.currentDiceSize + num,
              )}
            />
          ))}
        </>
      )}
    </div>
  );
}
