export function truncateText(
  text: string,
  maxLength: number,
  ellipsis = true,
): string {
  if (maxLength < 0) return text;
  if (text.length <= maxLength) return text;
  if (!ellipsis || maxLength <= 3) return text.slice(0, maxLength);
  return text.slice(0, maxLength - 3) + "...";
}

export default truncateText;
