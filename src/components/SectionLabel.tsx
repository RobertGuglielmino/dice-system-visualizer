import { useDice } from "../store/store";

interface SectionLabelProps {
  renderResults: { threshold: number; probability: number; count: number }[];
}

export default function SectionLabel({ renderResults }: SectionLabelProps) {
  const dice = useDice((state) => state);
  console.log(renderResults);
  const thresholds = [
    dice.successThreshold,
    dice.successThreshold2,
    dice.successThreshold3,
  ].filter((threshold) => threshold > 0);

  return (
    <div className="flex flex-col w-50 h-full rounded-lg transition-transform duration-300 ease-in-out select-none py-4">
      {renderResults.map(({ threshold, probability, count }, index) => {
        console.log(index);
        return (
          <div
            style={{
              flex: probability,
            }}
            className={`flex items-center justify-center text-center cursor-pointer text-3xl font-bold first:text-green-800 last:text-gray-600 text-amber-600 overflow-hidden transition-transform duration-300 ease-in-out`}
          >
            {index === 0 && dice.successThreshold !== 0
              ? dice.successThreshold
              : ""}
            {index === 1 &&
              dice.successThreshold2 === 0 &&
              `<${dice.successThreshold - 1}`}
            {index === 1 &&
              dice.successThreshold2 !== 0 &&
              dice.successThreshold2}
            {index === 2 &&
              dice.successThreshold3 === 0 &&
              `<${dice.successThreshold2 - 1}`}
            {index === 2 &&
              dice.successThreshold3 !== 0 &&
              dice.successThreshold3}
            {index > 3 ? dice.successThreshold3 - 1 : ""}
            {/* {index === 1 && dice.successThreshold2 !== 0
              ? dice.successThreshold2
              : index === 2 && dice.successThreshold3 !== 0
                ? dice.successThreshold3
                : index === 0
                  ? dice.successThreshold
                  : Math.max(0, dice.successThreshold3 - 1)} */}
            {/* {index != 0 && index != renderResults.length - 1 ? "+" : ""} */}
            {index == 0 ? "+" : ""}
          </div>
        );
      })}
    </div>
  );
}
