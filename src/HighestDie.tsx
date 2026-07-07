
import SectionGraph2 from "./SectionGraph2";
import SectionLabel from "./SectionLabel";
import { useDice } from "./store/store";
import { highestDie } from "./utils/equations";
import { probabilityGroups } from "./utils/probabilityGroups";

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
          <SectionLabel
            renderResults={probabilityGroups(
              dice.trackingThresholds,
              highestDie(
                dice.currentDiceNum,
                dice.currentDiceSize,
                dice.successThreshold,
              ),
            )}
          />
          {nums.map((num) => (
            <SectionGraph2
              renderResults={probabilityGroups(
                dice.trackingThresholds,
                highestDie(
                  dice.currentDiceNum + num,
                  dice.currentDiceSize,
                  dice.dropNumber,
                ),
              )}
            />
          ))}
        </>
      )}
      {dice.scaleType === "numDrop" && (
        <>
          {nums.map((num) => (
            <SectionGraph2
              renderResults={probabilityGroups(
                dice.trackingThresholds,
                highestDie(
                  dice.currentDiceNum,
                  dice.currentDiceSize,
                  dice.dropNumber + num,
                ),
              )}
            />
          ))}
        </>
      )}
    </div>
  );
}
