export function $formatarUSD(float) {
  return float.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
