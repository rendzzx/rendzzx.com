// app/api/projects/route.ts
import {NextResponse} from "next/server";
import {getSortedProjectsData} from "@/util/projects"; // Import utilitas fetching Anda

// Next.js 13/14 way to ensure no caching for dynamic requests
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Dapatkan locale dari URL Query Parameters
  const {searchParams} = new URL(request.url);
  const locale = searchParams.get("locale") || "id"; // Ambil locale dari URL

  try {
    const projects = await getSortedProjectsData(locale);

    // Tambahkan header untuk menonaktifkan cache di browser
    const headers = new Headers();
    headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );

    return NextResponse.json(projects, {headers});
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return NextResponse.json(
      {message: "Failed to load project data from Markdown files."},
      {status: 500}
    );
  }
}
