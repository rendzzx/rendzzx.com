// app/api/projects/[slug]/route.ts
import {NextResponse} from "next/server";
import {getSortedProjectsData, Project} from "@/util/projects";

// Memaksa rute ini untuk selalu dinamis (tidak di-cache)
export const dynamic = "force-dynamic";

// Helper function untuk mendapatkan satu proyek berdasarkan slug
async function getProjectBySlug(
  slug: string,
  locale: string
): Promise<Project | undefined> {
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

    // NextResponse.json akan menangani pengembalian data
    return NextResponse.json(project);
  } catch (error) {
    console.error(`Error fetching project detail (${slug}):`, error);
    return NextResponse.json(
      {message: "Failed to load project detail data."},
      {status: 500}
    );
  }
}
