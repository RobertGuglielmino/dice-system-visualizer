
import SectionGraph2 from "./SectionGraph2";
import SectionLabel from "./SectionLabel";
import { useDice } from "../store/store";
import { highestDie } from "../utils/equations";
import { probabilityGroups } from "../utils/probabilityGroups";

interface SectionGraphProps {
  renderResults: Map<number, number>;
}

export default function HighestDie({}: SectionGraphProps) {
  const dice = useDice((state) => state);

  const nums: number[] = [0, 1, 2, 3, 4];

  const thresholds = [
    dice.successThreshold,
    dice.successThreshold2,
    dice.successThreshold3,
  ].filter((threshold) => threshold > 0);


  
    const baseRenderLabels = probabilityGroups(
      thresholds,
      highestDie(dice.currentDiceNum, dice.currentDiceSize, dice.dropNumber),
    );

  return (
    <div className="flex flex-row w-50 h-200 rounded-lg gap-4">
      {dice.scaleType === "numDice" && (
        <>
          <SectionLabel renderResults={baseRenderLabels} />
          {nums.map((num) => (
            <SectionGraph2
              renderResults={probabilityGroups(
                thresholds,
                highestDie(
                  dice.currentDiceNum + num,
                  dice.currentDiceSize,
                  dice.dropNumber,
                ),
              )}
              label={`${dice.currentDiceNum + num}d${dice.currentDiceSize}`}
            />
          ))}
        </>
      )}
      {dice.scaleType === "numDrop" && (
        <>
          <SectionLabel renderResults={baseRenderLabels} />
          {nums.map((num) => (
            <SectionGraph2
              renderResults={probabilityGroups(
                thresholds,
                highestDie(
                  dice.currentDiceNum,
                  dice.currentDiceSize,
                  dice.dropNumber + num,
                ),
              )}
              label={`${dice.currentDiceNum}d${dice.currentDiceSize}, drop ${num}`}
            />
          ))}
        </>
      )}
    </div>
  );
}
