import "../global.css";
import {Inter} from "@next/font/google";
import LocalFont from "@next/font/local";
import {Metadata} from "next";
import {I18nProvider} from "./providers/i18n-provider";

export const metadata: Metadata = {
  title: {
    default: "rendzzx.com",
    template: "%s | rendzzx.com",
  },
  description: "-",
  openGraph: {
    title: "rendzzx.com",
    description: "-",
    url: "https://rendzzx.com",
    siteName: "rendzzx.com",
    images: [
      {
        url: "https://rendzzx.com/og-upscale.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "rendzzx_",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head></head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        <I18nProvider>
          {/* BUNGKUS SELURUH APLIKASI */}
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
