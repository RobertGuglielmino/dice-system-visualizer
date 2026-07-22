interface SectionGraphProps {
  renderResults: { threshold: number; probability: number; count: number }[];
  label: string;
}

export default function SectionGraph2({ renderResults, label }: SectionGraphProps) {

  console.log(renderResults);
  const lastIndex = renderResults.length - 1;

  return (<div className="flex flex-col w-50 h-full rounded-lg transition-transform duration-300 ease-in-out select-none py-">
    <div className="text-center text-xl text-gray-800">{label}</div>
      <div className="flex flex-col w-20 h-full rounded-lg transition-transform duration-300 ease-in-out select-none">
        {renderResults.map(({ threshold, probability, count }, index) => {

          const displayNum = threshold == 0 && count == 1 && probability == 100 ? 0 : Math.min(100, 1 * probability).toFixed(0);

          const bgColor =
            displayNum == 0
              ? "bg-gray-100"
              : index === lastIndex
                ? "bg-gray-200"
                : index === 0
                  ? "bg-green-400"
                  : index === 1
                    ? "bg-amber-200"
                    : index === 2
                      ? "bg-teal-200"
                      : "bg-black";
          return (
            <>
              <div
                style={{
                  flex: probability,
                }}
                className={`flex items-center justify-center not-last:border-b-4 not-last:border-b-gray-900 ${bgColor} text-center cursor-pointer text-xl overflow-hidden transition-transform duration-300 ease-in-out`}
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