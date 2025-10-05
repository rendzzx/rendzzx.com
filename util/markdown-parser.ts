// util/markdown-parser.ts

/**
 * Mengganti sintaks Markdown **tebal** menjadi tag HTML <strong>.
 * Juga memastikan teks non-bold memiliki warna terang default.
 * @param markdownText Teks dengan sintaks Markdown
 * @returns String HTML yang siap disuntikkan.
 */
export function simpleMarkdownToHtml(markdownText: string): string {
  if (!markdownText) return "";

  // 1. Mengganti **tebal** menjadi <strong class="text-white">tebal</strong>
  let html = markdownText.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="text-white">$1</strong>'
  );

  // 2. Mengganti *italik* menjadi <em class="text-zinc-300">italik</em>
  html = html.replace(/\*(.*?)\*/g, '<em class="text-zinc-300 italic">$1</em>');

  // 3. Memecah string menjadi paragraf
  // Kita bungkus seluruh konten dalam <p> dengan warna dasar.
  const paragraphs = html.trim().split("\n\n");

  let finalHtml = "";

  for (const paragraph of paragraphs) {
    if (paragraph.trim() === "") continue; // Skip baris kosong

    // Tambahkan kelas untuk spacing dan warna teks dasar
    // Kelas 'text-zinc-400' akan membuat teks terlihat abu-abu muda
    // Kelas 'leading-relaxed' untuk jarak antar baris
    finalHtml += `<p class="text-zinc-400 leading-relaxed">${paragraph.trim()}</p>`;
  }

  // Karena kita tidak bisa menerapkan space-y-6 langsung pada children yang
  // di-inject, kita gunakan margin-top pada elemen paragraf kedua dst.
  // Jika lebih dari satu paragraf, tambahkan mt-4 atau mt-6
  finalHtml = finalHtml.replace(
    /<\/p><p class="text-zinc-400 leading-relaxed">/g,
    `</p><p class="text-zinc-400 leading-relaxed mt-6">`
  );

  // Pastikan kita menghapus class p pada elemen pertama (untuk spacing yang benar di card)
  finalHtml = finalHtml.replace(
    `<p class="text-zinc-400 leading-relaxed">`,
    `<p class="text-zinc-400 leading-relaxed">`
  );

  return finalHtml;
}
