export function calculatePercentageChange(prevValue: number, newValue: number) {
  if (prevValue === 0) {
    return newValue === 0 ? "0%" : "-100%";
  }

  const percentageChange = ((newValue - prevValue) / Math.abs(prevValue)) * 100;
  const arrow = percentageChange > 0 ? "↑" : percentageChange < 0 ? "↓" : "";

  return `${percentageChange > 0 ? `+${percentageChange.toFixed(2)}` : percentageChange.toFixed(2)}% ${arrow}`;
}
