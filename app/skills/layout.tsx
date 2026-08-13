import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Skills of Muhammad Rendy Maulana — backend development with PHP, Laravel, CodeIgniter, ExpressJS, and JavaScript.",
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
