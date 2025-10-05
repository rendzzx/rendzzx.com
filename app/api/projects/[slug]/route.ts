// app/api/projects/[slug]/route.ts
import {NextResponse} from "next/server";
import {getSortedProjectsData} from "@/util/projects";
import {Project} from "@/util/projects"; // Import Project Interface

// Secara eksplisit memaksa rute ini untuk dinamis (tidak di-cache)
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

    return NextResponse.json(project);
  } catch (error) {
    console.error(`Error fetching project detail (${slug}):`, error);
    return NextResponse.json(
      {message: "Failed to load project detail data."},
      {status: 500}
    );
  }
}
