"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import { client } from "@/lib/sanity";
import { Project } from "@/app/page";
import { ProjectModal } from "@/components/project-modal";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [project, setProject] = useState<Project | null>(null);
  const resolvedParams = use(params);

  const imageIndex = searchParams.get("imageIndex");
  const initialImageIndex = imageIndex ? parseInt(imageIndex, 10) : 0;

  console.log("URL image index:", imageIndex);
  console.log("Parsed initial index:", initialImageIndex);

  useEffect(() => {
    async function fetchProject() {
      try {
        const result = await client.fetch<Project>(
          `*[_type == "project" && _id == $id][0]{
            _id,
            title,
            category,
            "images": images[].asset->url,
            createdAt,
            _createdAt
          }`,
          { id: resolvedParams.id }
        );

        if (!result) {
          console.error("Project not found");
          router.push("/");
          return;
        }

        const processedProject = {
          ...result,
          images: result.images?.filter(Boolean) || [],
        };

        setProject(processedProject);
      } catch (error) {
        console.error("Error fetching project:", error);
        router.push("/");
      }
    }

    fetchProject();
  }, [resolvedParams.id, router]);

  if (!project) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ProjectModal
      activeProject={project}
      setActiveProject={() => router.push("/?from=project")}
      initialImageIndex={initialImageIndex}
    />
  );
}
