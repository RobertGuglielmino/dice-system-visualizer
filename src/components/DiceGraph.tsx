// import { useDice } from "../store/store";
// import { countSuccesses } from "../utils/equations";
// import { probabilityGroups } from "../utils/probabilityGroups";
// import SectionGraph2 from "./SectionGraph2";
// import SectionLabel from "./SectionLabel";

// interface DiceGraphProps {
//   renderResults: { threshold: number; probability: number; count: number }[];
// }

// export default function DiceGraph({ renderResults }: DiceGraphProps) {
//     const dice = useDice((state) => state);
//   const nums: number[] = [0, 1, 2, 3, 4];
  
//     return (
//       <>
//         <SectionLabel renderResults={renderResults} />
//         {nums.map((num) => (
//           <SectionGraph2
//             key={num}
//             renderResults={renderResults}
//             label={`${dice.currentDiceNum + num}`}
//           />
//         ))}
//       </>
//     );

// }
