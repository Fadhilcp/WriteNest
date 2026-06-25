export function calculateReadTime(content: string = ""): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}