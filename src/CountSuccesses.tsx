import SectionGraph from "./SectionGraph";
import { useDice } from "./store/store";
import { countSuccesses } from "./utils/equations";

interface SectionGraphProps {
  renderResults: Map<number, number>;
}

export default function CountSuccesses({  }: SectionGraphProps) {
  const dice = useDice((state) => state);

  const nums: number[] = [0, 1, 2, 3, 4];

  return (
    <div className="flex flex-row w-100 h-200 rounded-lg">
      {dice.scaleType === "numDice" && (
        <>
          {nums.map((num) => (
            <SectionGraph
              renderResults={countSuccesses(
                dice.currentDiceNum + num,
                dice.currentDiceSize,
                dice.successThreshold,
              )}
            />
          ))}
        </>
      )}
      {dice.scaleType === "mod" && (
        <>
          {nums.map((num) => (
            <SectionGraph
              renderResults={countSuccesses(
                dice.currentDiceNum,
                dice.currentDiceSize,
                dice.successThreshold,
              )}
            />
          ))}
        </>
      )}
      {dice.scaleType === "numKeep" && <></>}
      {dice.scaleType === "numDrop" && <></>}
    </div>
  );
}
