
export function rollTotal(num: number, sides: number): Map<number, number> {
  const result = new Map<number, number>();
  const totalOutcomes = Math.pow(sides, num);

  for (let k = num; k <= num * sides; k++) {
    let ways = 0;
    const upperLimit = Math.floor((k - num) / sides);

    for (let j = 0; j <= upperLimit; j++) {
      const sign = j % 2 === 0 ? 1 : -1;
      ways += sign * binomCoeff(num, j) * binomCoeff(k - j * sides - 1, num - 1);
    }

    result.set(k, Math.round(ways / totalOutcomes * 100));
  }

  return result;
}

export function rollTotalProbability(num: number, sides: number): Map<number, number> {
  const result = new Map<number, number>();
  const totalOutcomes = Math.pow(sides, num);

  for (let k = num; k <= num * sides; k++) {
    let ways = 0;
    const upperLimit = Math.floor((k - num) / sides);

    for (let j = 0; j <= upperLimit; j++) {
      const sign = j % 2 === 0 ? 1 : -1;
      ways +=
        sign * binomCoeff(num, j) * binomCoeff(k - j * sides - 1, num - 1);
    }

    result.set(k, ways / totalOutcomes);
  }

  return result;
}

export function countSuccessesProbability(
  num: number,
  sides: number,
  target: number,
): Map<number, number> {
  const result = new Map<number, number>();
  const p = (sides - target + 1) / sides;
  const q = 1 - p;

  for (let s = 0; s <= num; s++) {
    const probability =
      binomCoeff(num, s) * Math.pow(p, s) * Math.pow(q, num - s);
    result.set(s, probability);
  }

  return result;
}

export function countSuccesses(
  num: number,
  sides: number,
  target: number,
): Map<number, number> {
  const result = new Map<number, number>();
  const p = (sides - target + 1) / sides;
  const q = 1 - p;

  for (let s = 0; s <= num; s++) {
    const probability = binomCoeff(num, s) * Math.pow(p, s) * Math.pow(q, num - s);
    result.set(s, Math.round(probability * 100  ));
  }

  return result;
}
export function highestDieProbability(
  num: number,
  sides: number,
  drop: number,
): Map<number, number> {
  const result = new Map<number, number>();
  const keepTotal = num - drop;

  if (keepTotal <= 0) {
    result.set(0, 100);
    return result;
  }

  for (let k = 1; k <= sides; k++) {
    const probability =
      Math.pow(k / sides, keepTotal) - Math.pow((k - 1) / sides, keepTotal);
    result.set(k, probability);
  }

  return result;
}


export function highestDie(
  num: number,
  sides: number,
  drop: number,
): Map<number, number> {
  const result = new Map<number, number>();
  const keepTotal = num - drop;

  if (keepTotal <= 0) {
    result.set(0, 100);
    return result;
  }

  for (let k = 1; k <= sides; k++) {
    const probability =
      Math.pow(k / sides, keepTotal) - Math.pow((k - 1) / sides, keepTotal);
    result.set(k, Math.round(probability * 100));
  }

  return result;
}





function binomCoeff(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k);
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}
