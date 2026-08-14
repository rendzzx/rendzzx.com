"use client";

import {useEffect, useRef, useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface CertificateViewerProps {
  src: string;
  alt: string;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({
  src,
  alt,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    setWidth(el.clientWidth);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full overflow-y-auto">
      <Document
        file={src}
        onLoadSuccess={({numPages}) => setNumPages(numPages)}
        loading={
          <p className="p-6 text-sm text-zinc-500 dark:text-zinc-400">
            Loading…
          </p>
        }
        error={
          <p className="p-6 text-sm text-red-500">
            Failed to load certificate.
          </p>
        }
      >
        {Array.from(new Array(numPages ?? 1), (_, i) => (
          <Page
            key={`page_${i + 1}`}
            pageNumber={i + 1}
            width={width || undefined}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            aria-label={`${alt} — page ${i + 1}`}
          />
        ))}
      </Document>
    </div>
  );
};
