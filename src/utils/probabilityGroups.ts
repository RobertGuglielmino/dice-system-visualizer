import type { ProbabilityVisualBlock } from "../types/types";

export function probabilityGroups(
  thresholds: number[],
  probabilities: Map<number, number>,
): ProbabilityVisualBlock[] {
  let probSum = 0;
  let count = 0;
  const results = [];
  const keys = Array.from(probabilities.keys()).reverse();

  keys.forEach((key) => {
    probSum += probabilities.get(key) ?? 0;
    count++;
    if (thresholds.includes(key)) {
      results.push({
        threshold: key,
        probability: Math.min(Math.max(probSum, 0), 100),
        count: count,
      });
      probSum = 0;
      count = 0;
    }
  });

  results.push({
    threshold: keys[keys.length - 1],
    probability: Math.min(Math.max(probSum, 0), 100),
    count: count,
  });

  return results;
}