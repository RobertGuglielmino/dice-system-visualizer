export   function probabilityGroups(
    thresholds: number[],
    probabilities: Map<number, number>,
  ): { threshold: number; probability: number; count: number }[] {
    
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
          probability: probSum,
          count: count,
        });
        probSum = 0;
        count = 0;
      }
    });
    
    results.push({
      threshold: keys[keys.length - 1],
      probability: probSum,
      count: count,
    });

    return results;
  }