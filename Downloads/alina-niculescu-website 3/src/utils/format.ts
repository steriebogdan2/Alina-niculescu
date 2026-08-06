/** "2:05" -> 125. Util pentru însumarea duratelor. */
export function durationToSeconds(value: string): number {
  const [m, s] = value.split(':').map(Number);
  return (m || 0) * 60 + (s || 0);
}

/** 125 -> "2 min 5 s" */
export function humanDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m === 0) return `${s} s`;
  return s === 0 ? `${m} min` : `${m} min ${s} s`;
}

export function currentYear(): number {
  return new Date().getFullYear();
}
