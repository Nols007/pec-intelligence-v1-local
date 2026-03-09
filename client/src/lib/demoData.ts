export function moneyZAR(amount: number) {
  // Using comma decimals is fine in UI; keep simple
  return `R ${amount.toFixed(2)}`;
}

export function nowTimestamp() {
  const d = new Date();
  return d.toLocaleString(); // shows local time on device (what you want)
}