
import SectionGraph2 from "./SectionGraph2";
import SectionLabel from "./SectionLabel";
import { useDice } from "../store/store";
import { rollTotal } from "../utils/equations";
import { probabilityGroups } from "../utils/probabilityGroups";

interface RollTotalProps {
  renderResults: Map<number, number>;
}

export default function RollTotal({}: RollTotalProps) {
  const dice = useDice((state) => state);

  const nums: number[] = [0, 1, 2, 3, 4];

  return (
    <div className="flex flex-row w-50 h-200 rounded-lg">
      {dice.scaleType === "numDice" && (
        <>
          <SectionLabel
            renderResults={probabilityGroups(
              [dice.successThreshold],
              rollTotal(dice.currentDiceNum, dice.currentDiceSize),
            )}
          />
          {nums.map((num) => (
            <SectionGraph2
              renderResults={probabilityGroups(
                [dice.successThreshold],
                rollTotal(dice.currentDiceNum + num, dice.currentDiceSize),
              )}
              label={`${dice.currentDiceNum + num}`}
            />
          ))}
        </>
      )}
      {dice.scaleType === "mod" && (
        <>
          <SectionLabel
            renderResults={probabilityGroups(
              [dice.successThreshold],
              rollTotal(dice.currentDiceNum, dice.currentDiceSize),
            )}
          />
          {nums.map((num) => (
            <SectionGraph2
              renderResults={probabilityGroups(
                [dice.successThreshold],
                rollTotal(dice.currentDiceNum, dice.currentDiceSize + num),
              )}
              label={`${dice.currentDiceSize + num}`}
            />
          ))}
        </>
      )}
    </div>
  );
}
