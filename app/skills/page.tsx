// app/skills/page.tsx
import {Navigation} from "../components/nav";
import {
  getSortedCertificationData,
  type Certification,
} from "@/util/certification";
import {SkillsClientWrapper} from "./skills-client-wrapper";

const stripCredentialFile = (certs: Certification[]) =>
  certs.map((cert) => ({...cert, credentialFile: undefined}));

export default function SkillsPage() {
  const certificationsByLocale = {
    en: stripCredentialFile(getSortedCertificationData("en")),
    id: stripCredentialFile(getSortedCertificationData("id")),
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0">
      <Navigation />
      <div className="container flex flex-col items-center justify-center pt-24 pb-20 mx-auto px-4">
        <SkillsClientWrapper certificationsByLocale={certificationsByLocale} />
      </div>
    </div>
  );
}
