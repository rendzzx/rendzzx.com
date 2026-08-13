import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {marked} from "marked";

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

const contentDirectory = path.join(process.cwd(), "content", "certifications");

export function getSortedCertificationData(locale: string = "id"): Certification[] {
  const dir = path.join(contentDirectory, locale);

  if (!fs.existsSync(dir)) {
    console.warn(`Certification directory not found for locale: ${locale}.`);
    return [];
  }

  const fileNames = fs
    .readdirSync(dir)
    .filter((name) => /\.mdx?$/.test(name));

  const all = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const {data, content} = matter(fileContents);
    const contentHtml = marked.parse(content, {async: false}) as string;

    const credentialFile = data.credentialFile as string | undefined;
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
      title: data.title,
      issuer: data.issuer,
      date: data.date,
      type: (data.type as CertificationType) ?? "attendance",
      validUntil: data.validUntil,
      expired: data.expired ?? false,
      score: data.score,
      credentialFile,
      credentialType,
      hasCredential: Boolean(credentialFile),
      summary: data.summary ?? "",
      details: data.details ?? [],
      contentHtml,
    } as Certification;
  });

  return all.sort((a, b) => a.sort - b.sort);
}
