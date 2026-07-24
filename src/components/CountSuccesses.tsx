import { useDice } from "../store/store";
import { countSuccesses } from "../utils/equations";
import type { ProbabilityVisualBlock } from "../types/types";
import CountSuccessesLabel from "./CountSuccessesLabel";
import SectionGraphCountSuccesses from "./SectionGraphCountSuccesses";

interface CountSuccessesProps {
  renderResults: Map<number, number>;
}

export default function CountSuccesses({}: CountSuccessesProps) {
  const dice = useDice((state) => state);

  const nums: number[] = [0, 1, 2, 3, 4];

  const baseRenderLabels = countSuccessesToRenderResults(
    countSuccesses(
      dice.currentDiceNum,
      dice.currentDiceSize,
      dice.successThreshold,
    ),
  );

  const baseRenderLabelsReverse = countSuccessesToRenderResults(
    countSuccesses(
      dice.currentDiceNum,
      dice.currentDiceSize,
      dice.successThreshold,
    ),
  ).reverse();

  function countSuccessesToRenderResults(
    countSuccessOutput: Map<number, number>,
  ): ProbabilityVisualBlock[] {
    const output = [];
    countSuccessOutput.forEach((value, key) =>
      output.push({
        threshold: key,
        probability: Math.min(Math.max(value, 0), 100),
        count: 1,
      }),
    );
    return output;
  }

  return (
    <div className="flex flex-row w-100 h-200 rounded-lg gap-4">
      {dice.scaleType === "numDice" && (
        <>
          <CountSuccessesLabel renderResults={baseRenderLabelsReverse} />
          {nums.map((num) => (
            <SectionGraphCountSuccesses
              key={num}
              renderResults={countSuccessesToRenderResults(
                countSuccesses(
                  dice.currentDiceNum + num,
                  dice.currentDiceSize,
                  dice.successThreshold,
                ),
              ).reverse()}
              label={`${dice.currentDiceNum + num}d${dice.currentDiceSize}`}
            />
          ))}
        </>
      )}
      {dice.scaleType === "mod" && (
        <>
          <CountSuccessesLabel renderResults={baseRenderLabels} />
          {nums.map((num) => (
            <SectionGraphCountSuccesses
              renderResults={countSuccessesToRenderResults(
                countSuccesses(
                  dice.currentDiceNum,
                  dice.currentDiceSize,
                  dice.successThreshold + num,
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
