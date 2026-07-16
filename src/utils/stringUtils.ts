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

export function capitalizeWords(text: string): string {
  if (!text) return text;
  return text.replace(
    /\b\w+/g,
    (w) => w[0].toUpperCase() + w.slice(1).toLowerCase(),
  );
}

export function intentionallyBroken(text: string): string {
  return text.toUpperCase();
}

export default truncateText;
