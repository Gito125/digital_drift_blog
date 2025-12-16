// lib/utils.ts

/**
 * Formats a number to a human-readable format
 * Examples: 14.6k, 2.1k, 3.2M
 * @param num The number to format
 * @returns Formatted string representation
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}