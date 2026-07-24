
import type { ProbabilityVisualBlock } from "../types/types";

interface CountSuccessesLabelProps {
  renderResults: ProbabilityVisualBlock[];
}

export default function CountSuccessesLabel({ renderResults }: CountSuccessesLabelProps) {
  // const dice = useDice((state) => state);

  const lastIndex = renderResults.length - 1;

  return (
    <div className="flex flex-col w-50 h-full rounded-lg transition-all duration-300 ease-in-out select-none">
      <div className="text-center text-xs">num successes</div>
      {renderResults.map(({ threshold, probability, count }, index) => {
        const displayNum =
          threshold == 0 && count == 1 && probability == 100
            ? 0
            : Math.min(100, 1 * probability).toFixed(0);
              const reverseIndex = renderResults.length - index - 1;

        const textColor =
          displayNum == 0
            ? "text-gray-200"
            : index === lastIndex
              ? "text-gray-300"
              : reverseIndex === 1
                ? "text-shamrock"
                : reverseIndex === 2
                  ? "text-tiger"
                  : reverseIndex === 3
                    ? "text-bell-blue"
                    : "text-bell-blue";
        return (
          <div
            style={{
              flex: probability,
            }}
            className={`flex items-center justify-center text-center cursor-pointer text-3xl font-bold  ${textColor} overflow-hidden transition-all duration-300 ease-in-out`}
          >
            {renderResults.length - index - 1}
          </div>
        );
      })}
    </div>
  );
}
