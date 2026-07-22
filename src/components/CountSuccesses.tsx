import SectionGraph2 from "./SectionGraph2";
import SectionLabel from "./SectionLabel";
import { useDice } from "../store/store";
import { countSuccesses } from "../utils/equations";
import { probabilityGroups } from "../utils/probabilityGroups";

interface CountSuccessesProps {
  renderResults: Map<number, number>;
}

export default function CountSuccesses({}: CountSuccessesProps) {
  const dice = useDice((state) => state);

  const nums: number[] = [0, 1, 2, 3, 4];

  console.log("dice", dice);

  console.log(
    "count successes",
    countSuccesses(
      dice.currentDiceNum,
      dice.currentDiceSize,
      dice.successThreshold,
    ),
  );
  console.log(
    "probability groups",
    probabilityGroups(
      [dice.successThreshold],
      countSuccesses(
        dice.currentDiceNum,
        dice.currentDiceSize,
        dice.successThreshold,
      ),
    ),
  );

  return (
    <div className="flex flex-row w-100 h-200 rounded-lg">
      {dice.scaleType === "numDice" && (
        <>
          <SectionLabel
            renderResults={probabilityGroups(
              [dice.successThreshold],
              countSuccesses(
                dice.currentDiceNum,
                dice.currentDiceSize,
                dice.successThreshold,
              ),
            )}
          />
          {nums.map((num) => (
            <SectionGraph2
              key={num}
              renderResults={probabilityGroups(
                [dice.successThreshold],
                countSuccesses(
                  dice.currentDiceNum + num,
                  dice.currentDiceSize,
                  dice.successThreshold,
                ),
              )}
              label={`${dice.currentDiceNum + num}d${dice.currentDiceSize}`}
            />
          ))}
        </>
      )}
      {dice.scaleType === "mod" && (
        <>
          <SectionLabel
            renderResults={probabilityGroups(
              [dice.successThreshold],
              countSuccesses(
                dice.currentDiceNum,
                dice.currentDiceSize,
                dice.successThreshold,
              ),
            )}
          />
          {nums.map((num) => (
            <SectionGraph2
              renderResults={probabilityGroups(
                [dice.successThreshold],
                countSuccesses(
                  dice.currentDiceNum,
                  dice.currentDiceSize,
                  dice.successThreshold,
                ),
              )}
              label={`+${num}`}
            />
          ))}
        </>
      )}
    </div>
  );
}
