"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../app/page";
import { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";

type ViewType = "grid" | "list" | "index";

const viewTypes = [
  { type: "grid" as const, label: "GRID" },
  { type: "list" as const, label: "LIST" },
  { type: "index" as const, label: "INDEX" },
];

export function ProjectsSection({
  projects,
  isLoading,
  setActiveProject,
}: {
  projects: Project[];
  isLoading: boolean;
  setActiveProject: (
    project: Project | null,
    initialImageIndex?: number
  ) => void;
}) {
  const [viewType, setViewType] = useState<ViewType>("grid");

  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = a.createdAt
      ? new Date(a.createdAt).getTime()
      : new Date(a._createdAt).getTime();
    const dateB = b.createdAt
      ? new Date(b.createdAt).getTime()
      : new Date(b._createdAt).getTime();
    return dateB - dateA;
  });

  return (
    <section id="work" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl font-bold text-primary">SELECTED WORKS</h2>
          <div className="flex gap-4">
            {viewTypes.map((view) => (
              <button
                key={view.type}
                onClick={() => setViewType(view.type)}
                className={`relative px-3 py-1 text-sm transition-colors ${
                  viewType === view.type
                    ? "text-primary font-bold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <ProjectsLoading />
        ) : (
          <AnimatePresence mode="wait">
            {viewType === "grid" && (
              <GridView
                projects={sortedProjects}
                setActiveProject={setActiveProject}
              />
            )}
            {viewType === "list" && (
              <ListView
                projects={sortedProjects}
                setActiveProject={setActiveProject}
              />
            )}
            {viewType === "index" && (
              <IndexView
                projects={sortedProjects}
                setActiveProject={setActiveProject}
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

function ProjectsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-muted h-64"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function GridView({
  projects,
  setActiveProject,
}: {
  projects: Project[];
  setActiveProject: (
    project: Project | null,
    initialImageIndex?: number
  ) => void;
}) {
  const [projectImageIndices, setProjectImageIndices] = useState<{
    [key: string]: number;
  }>({});
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (project: Project) => {
    const swipeThreshold = 50; // minimum distance for swipe
    const swipeDistance = touchEndX.current - touchStartX.current;
    const currentIndex = projectImageIndices[project._id] || 0;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0 && currentIndex > 0) {
        // Swipe right - show previous image
        setProjectImageIndices({
          ...projectImageIndices,
          [project._id]: currentIndex - 1,
        });
      } else if (
        swipeDistance < 0 &&
        currentIndex < (project.images?.length || 1) - 1
      ) {
        // Swipe left - show next image
        setProjectImageIndices({
          ...projectImageIndices,
          [project._id]: currentIndex + 1,
        });
      }
    }
  };

  return (
    <motion.ul
      key="grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project) => {
        const currentImageIndex = projectImageIndices[project._id] || 0;

        return (
          <motion.li
            key={project._id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer group"
            onClick={() => setActiveProject(project, currentImageIndex)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd(project)}
          >
            <div className="relative w-full flex items-center justify-center overflow-hidden bg-muted">
              {project.images?.[currentImageIndex] &&
              project.images[currentImageIndex] !== "" ? (
                <Image
                  src={project.images[currentImageIndex]}
                  alt={project.title}
                  width={600}
                  height={800}
                  className="w-auto max-h-[500px] transition-transform duration-300 group-hover:scale-110"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <div className="w-full aspect-[3/4] flex items-center justify-center">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">View Project</span>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 md:hidden">
                {project.images?.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {project.category}
              </p>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

function ListView({
  projects,
  setActiveProject,
}: {
  projects: Project[];
  setActiveProject: (
    project: Project | null,
    initialImageIndex?: number
  ) => void;
}) {
  return (
    <motion.ul
      key="list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-1"
    >
      {projects.map((project) => (
        <motion.li
          key={project._id}
          className="border-b border-border py-4"
          whileHover={{ x: 20 }}
          onClick={() => setActiveProject(project, 0)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer group pr-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="text-sm text-muted-foreground">
                {project.category}
              </p>
            </div>
            <div className="flex items-center gap-6 mt-2 sm:mt-0">
              <span className="text-sm text-muted-foreground">
                {new Date(
                  project.createdAt || project._createdAt
                ).getFullYear()}
              </span>
              <ChevronRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function IndexView({
  projects,
  setActiveProject,
}: {
  projects: Project[];
  setActiveProject: (
    project: Project | null,
    initialImageIndex?: number
  ) => void;
}) {
  return (
    <motion.div
      key="index"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16"
    >
      {projects.map((project) => (
        <div key={project._id} className="space-y-4">
          <h3 className="text-xl font-medium text-primary">{project.title}</h3>
          <motion.div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {project.images
              ?.filter((image) => image && image !== "")
              .map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer aspect-[4/3] overflow-hidden"
                  onClick={() => setActiveProject(project, index)}
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    width={300}
                    height={225}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
