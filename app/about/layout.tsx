import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Muhammad Rendy Maulana — Backend Developer with 5+ years of experience building web applications, RESTful APIs, and internal systems with PHP and JavaScript.",
};

export default function AboutLayout({children}: {children: React.ReactNode}) {
  return children;
}
