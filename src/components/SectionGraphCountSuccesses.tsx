import type { ProbabilityVisualBlock } from "../types/types";

interface SectionGraphCountSuccessesProps {
  renderResults: ProbabilityVisualBlock[];
  label: string;
}

export default function SectionGraphCountSuccesses({
  renderResults,
  label,
}: SectionGraphCountSuccessesProps) {
  const lastIndex = renderResults.length - 1;

  return (
    <div className="flex flex-col w-50 h-full rounded-lg transition-all duration-300 ease-in-out select-none py-">
      <div className="text-center text-xl text-gray-800">{label}</div>
      <div className="flex flex-col w-20 h-full rounded-lg transition-all duration-300 ease-in-out select-none">
        {renderResults.map(({ threshold, probability, count }, index) => {
          const displayNum =
            threshold == 0 && count == 1 && probability == 100
              ? 0
              : Math.min(100, 1 * probability).toFixed(0);

          const reverseIndex = renderResults.length - index - 1;

          const bgColor =
            displayNum == 0
              ? "bg-gray-100"
              : index === lastIndex
                ? "bg-gray-200"
                : reverseIndex === 1
                  ? "bg-shamrock"
                  : reverseIndex === 2
                    ? "bg-tiger"
                    : reverseIndex === 3
                      ? "bg-bell-blue"
                      : "bg-bell-blue";

          return (
            <>
              <div
                key={index}
                style={{
                  flex: probability,
                }}
                className={`flex items-center justify-center not-last:border-b-4 not-last:border-b-gray-900 ${bgColor} text-center cursor-pointer text-xl overflow-hidden transition-all duration-300 ease-in-out`}
              >
                {displayNum}%
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
