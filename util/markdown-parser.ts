import {marked} from "marked";

/**
 * Mengonversi Markdown sederhana (tebal, miring, paragraf, tautan) menjadi HTML.
 * @param markdownText Teks dengan sintaks Markdown
 * @returns String HTML yang siap disuntikkan.
 */
export function simpleMarkdownToHtml(markdownText: string): string {
  if (!markdownText) return "";
  return marked.parse(markdownText, {async: false}) as string;
}
