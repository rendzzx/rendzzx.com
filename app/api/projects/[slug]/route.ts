// app/api/projects/[slug]/route.ts
import {NextResponse} from "next/server";
import {getSortedProjectsData} from "@/util/projects"; // Import utilitas fetching Anda

// Fungsi helper untuk mendapatkan satu proyek dari semua proyek yang ada
async function getProjectBySlug(
  slug: string,
  locale: string
): Promise<any | undefined> {
  const projects = await getSortedProjectsData(locale);
  return projects.find((p) => p.slug === slug);
}

export async function GET(
  request: Request,
  {params}: {params: {slug: string}}
) {
  const {searchParams} = new URL(request.url);
  const locale = searchParams.get("locale") || "id";
  const {slug} = params;

  try {
    const project = await getProjectBySlug(slug, locale);

    if (!project) {
      return NextResponse.json({message: "Project not found"}, {status: 404});
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(`Error fetching project detail (${slug}):`, error);
    return NextResponse.json(
      {message: "Failed to load project detail data."},
      {status: 500}
    );
  }
}
