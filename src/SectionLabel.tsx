interface SectionLabelProps {
  renderResults: { threshold: number; probability: number; count: number }[];
}

export default function SectionLabel({ renderResults }: SectionLabelProps) {
  return (
    <div className="flex flex-col w-50 h-full rounded-lg transition-transform duration-300 ease-in-out select-none py-4">
      {renderResults.map(({ threshold, probability, count }, index) => {
        return (
          <div
            style={{
              flex: probability,
            }}
            className={`flex items-center justify-center text-center cursor-pointer text-3xl font-bold first:text-green-800 last:text-gray-600 text-amber-600 overflow-hidden transition-transform duration-300 ease-in-out`}
          >
            {index == renderResults.length - 1 ? "<" : ""}
            {threshold}
            {/* {index != 0 && index != renderResults.length - 1 ? "+" : ""} */}
            {index == 0 ? "+" : ""}
          </div>
        );
      })}
    </div>
  );
}
