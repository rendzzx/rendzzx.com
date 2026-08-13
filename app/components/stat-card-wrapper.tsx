// app/components/stat-card-wrapper.tsx
import React, {PropsWithChildren} from "react";
import {Card} from "./card"; // Import Card yang kompleks

export const StatCardWrapper: React.FC<PropsWithChildren> = ({children}) => {
  return (
    // Gunakan Card sebagai shell interaktif yang menyediakan border dan efek mouse
    <Card>
      {/* Container Konten: 
        1. z-50 untuk memastikan lapisan ini di atas semua efek motion (z-0/z-10).
        2. bg-zinc-900 untuk background yang solid dan tidak terpotong.
        3. rounded-xl untuk bentuk kartu yang konsisten.
      */}
      <div className="relative z-50 bg-white dark:bg-zinc-900 rounded-xl h-full w-full">
        {/* Inner Padding dan Centering */}
        <div className="p-4 md:p-6 text-center h-full">{children}</div>
      </div>
    </Card>
  );
};
