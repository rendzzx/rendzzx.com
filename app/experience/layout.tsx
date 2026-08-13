import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work experience of Muhammad Rendy Maulana — IT Consultant at the Ministry of Trade of Indonesia and Software Programmer at PT IFCA Property 365 Indonesia.",
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
