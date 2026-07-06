import { useDice } from "./store/store";

interface SectionGraphProps {
  renderResults: Map<number, number>;
}

export default function SectionGraph({ renderResults }: SectionGraphProps) {
  const dice = useDice((state) => state);
  return (
    <div
      className="flex flex-col w-50 h-full rounded-lg transition-transform duration-300 ease-in-out select-none py-4"
    >
      {Array.from(renderResults.entries())
        .reverse()
        .map(([key, value], index) => {
          const hue = index * 100;

          return (
            <>
              <div
                style={{
                  flex: value,
                  //   backgroundColor: `oklch(0.9 0.12 ${hue})`,
                }}
                className={`flex items-center justify-center rounded text-center cursor-pointer text-xs overflow-hidden transition-transform duration-300 ease-in-out
                    ${dice.currentThreshold <= key ? "bg-green-300" : "bg-gray-100"}`}
              >
                {key}
              </div>
            </>
          );
        })}
    </div>
  );
}