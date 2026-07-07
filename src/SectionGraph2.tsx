import { useDice } from "./store/store";

interface SectionGraphProps {
  renderResults: { threshold: number; probability: number; count: number }[];
}

export default function SectionGraph2({ renderResults }: SectionGraphProps) {
  return (
    <div className="flex flex-col w-100 h-full rounded-lg transition-transform duration-300 ease-in-out select-none py-4">
      {renderResults.map(({ threshold, probability, count }, index) => {
        return (
          <>
            <div
              style={{
                flex: probability,
              }}
              className={`flex items-center justify-center not-last:border-b-4 not-last:border-b-gray-900 first:bg-green-400 bg-amber-200 last:bg-gray-200 text-center cursor-pointer text-xs overflow-hidden transition-transform duration-300 ease-in-out`}
            >
              {(1 * probability).toFixed(1)}%
            </div>
          </>
        );
      })}
    </div>
  );
}