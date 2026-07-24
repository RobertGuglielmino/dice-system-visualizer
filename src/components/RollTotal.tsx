
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
  
  const baseRenderLabels = probabilityGroups(
    [dice.successThreshold],
    rollTotal(dice.currentDiceNum, dice.currentDiceSize),
  );

  return (
    <div className="flex flex-row w-50 h-200 rounded-lg gap-4">
      {dice.scaleType === "numDice" && (
        <>
          <SectionLabel renderResults={baseRenderLabels} />
          {nums.map((num) => (
            <SectionGraph2
              renderResults={probabilityGroups(
                [dice.successThreshold],
                rollTotal(dice.currentDiceNum + num, dice.currentDiceSize),
              )}
              label={`+${dice.currentDiceSize + num}`}
            />
          ))}
        </>
      )}
      {dice.scaleType === "mod" && (
        <>
          <SectionLabel renderResults={baseRenderLabels} />
          {nums.map((num) => (
            <SectionGraph2
              renderResults={probabilityGroups(
                [dice.successThreshold - num],
                rollTotal(dice.currentDiceNum, dice.currentDiceSize),
              )}
              label={`+${num}`}
            />
          ))}
        </>
      )}
    </div>
  );
}
