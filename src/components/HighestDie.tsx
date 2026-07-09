
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
  console.log("thresholds", thresholds);
  console.log(
    "thresholds22",
    highestDie(
      dice.currentDiceNum,
      dice.currentDiceSize,
      0
    )
  );
  console.log(
    "thresholds2",
    probabilityGroups(
      thresholds,
      highestDie(
        dice.currentDiceNum,
        dice.currentDiceSize,
        0,
      ),
    ),
  );

  return (
    <div className="flex flex-row w-50 h-200 rounded-lg">
      {dice.scaleType === "numDice" && (
        <>
          <SectionLabel
            renderResults={probabilityGroups(
              thresholds,
              highestDie(
                dice.currentDiceNum,
                dice.currentDiceSize,
                dice.dropNumber,
              ),
            )}
          />
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
              label={`${dice.currentDiceNum + num}`}
            />
          ))}
        </>
      )}
      {dice.scaleType === "numDrop" && (
        <>
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
              label={`${dice.dropNumber + num}`}
            />
          ))}
        </>
      )}
    </div>
  );
}
