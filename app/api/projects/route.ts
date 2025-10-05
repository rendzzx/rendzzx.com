// app/api/projects/route.ts
import {NextResponse} from "next/server";
import {getSortedProjectsData} from "@/util/projects"; // Import utilitas fetching Anda

export async function GET(request: Request) {
  // Dapatkan locale dari URL Query Parameters
  const {searchParams} = new URL(request.url);
  const locale = searchParams.get("locale") || "id"; // Ambil locale dari URL

  try {
    const projects = await getSortedProjectsData(locale);
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return NextResponse.json(
      {message: "Failed to load project data from Markdown files."},
      {status: 500}
    );
  }
}
