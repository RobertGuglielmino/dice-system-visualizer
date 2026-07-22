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

  const lastIndex = renderResults.length - 1;
  

  return (
    <div className="flex flex-col w-50 h-full rounded-lg transition-transform duration-300 ease-in-out select-none">
      <div className="text-center text-xl text-white">{"s"}</div>
      {renderResults.map(({ threshold, probability, count }, index) => {
        console.log(index);
          const displayNum =
            threshold == 0 && count == 1 && probability == 100
              ? 0
              : Math.min(100, 1 * probability).toFixed(0);
          const textColor =
            displayNum == 0
              ? "text-gray-200"
              : index === lastIndex
                ? "text-gray-300"
                : index === 0
                  ? "text-green-500"
                  : index === 1
                    ? "text-amber-400"
                    : index === 2
                      ? "text-teal-400"
                      : "text-black";
        return (
          <div
            style={{
              flex: probability,
            }}
            className={`flex items-center justify-center text-center cursor-pointer text-3xl font-bold  ${textColor} overflow-hidden transition-transform duration-300 ease-in-out`}
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
            {index == 0 ? "+" : ""}
          </div>
        );
      })}
    </div>
  );
}
