import path from "path";
import {readMdxDirectory} from "./mdx";

export type CertificationType = "competency" | "attendance";
export type CredentialType = "pdf" | "image";

export interface Certification {
  slug: string;
  sort: number;
  title: string;
  issuer: string;
  date: string;
  type: CertificationType;
  validUntil?: string;
  expired: boolean;
  score?: string;
  credentialFile?: string;
  credentialType?: CredentialType;
  hasCredential: boolean;
  summary: string;
  details: string[];
  contentHtml: string;
}

interface CertificationFrontmatter {
  sort?: number;
  title?: string;
  issuer?: string;
  date?: string;
  type?: CertificationType;
  validUntil?: string;
  expired?: boolean;
  score?: string;
  credentialFile?: string;
  summary?: string;
  details?: string[];
}

const contentDirectory = path.join(process.cwd(), "content", "certifications");

export function getSortedCertificationData(locale = "id"): Certification[] {
  return readMdxDirectory<CertificationFrontmatter>(contentDirectory, locale)
    .map(({slug, data, contentHtml}) => {
      const credentialFile = data.credentialFile;
      const ext = credentialFile
        ? path.extname(credentialFile).toLowerCase()
        : "";
      const credentialType: CredentialType | undefined =
        ext === ".pdf"
          ? "pdf"
          : ext === ".jpg" || ext === ".jpeg" || ext === ".png"
          ? "image"
          : undefined;

      return {
        slug,
        sort: data.sort ?? 999,
        title: data.title ?? "",
        issuer: data.issuer ?? "",
        date: data.date ?? "",
        type: data.type ?? "attendance",
        validUntil: data.validUntil,
        expired: data.expired ?? false,
        score: data.score,
        credentialFile,
        credentialType,
        hasCredential: Boolean(credentialFile),
        summary: data.summary ?? "",
        details: data.details ?? [],
        contentHtml,
      };
    })
    .sort((a, b) => a.sort - b.sort);
}
