import fs from "fs";
import path from "path";
import {NextResponse} from "next/server";
import {getSortedCertificationData} from "@/util/certification";

const certificateDirectory = path.join(
  process.cwd(),
  "private",
  "certificates"
);

export async function GET(
  req: Request,
  {params}: {params: Promise<{slug: string}>}
) {
  const {slug} = await params;

  const referer = req.headers.get("referer");
  const requestHost = req.headers.get("host") ?? new URL(req.url).host;

  let allowed = false;
  if (referer) {
    try {
      allowed = new URL(referer).host === requestHost;
    } catch {
      allowed = false;
    }
  }

  if (!allowed) {
    return new NextResponse("Forbidden", {status: 403});
  }

  const all = [
    ...getSortedCertificationData("en"),
    ...getSortedCertificationData("id"),
  ];
  const certification = all.find((c) => c.slug === slug);

  if (!certification?.credentialFile) {
    return new NextResponse("Not found", {status: 404});
  }

  const filePath = path.join(certificateDirectory, certification.credentialFile);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", {status: 404});
  }

  const data = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType =
    ext === ".pdf"
      ? "application/pdf"
      : ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : ext === ".png"
      ? "image/png"
      : "application/octet-stream";

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${certification.credentialFile}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
