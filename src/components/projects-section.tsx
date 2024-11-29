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

interface CategoryMap {
  [key: string]: string[];
}

const categoryMapping: CategoryMap = {
  STYLING: ["STYLING & DESIGN CONSULTANCY", "STYLING & PHOTO", "STYLING"],
  PHOTOGRAPHY: ["PHOTOGRAPHY", "STYLING & PHOTO"],
  DESIGN: ["STYLING & DESIGN CONSULTANCY", "DESIGN"],
  ALL: [], // Will include everything
};

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
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const categories = Object.keys(categoryMapping);

  const filteredProjects = [...projects]
    .filter((project) => {
      if (selectedCategory === "ALL") return true;
      return categoryMapping[selectedCategory]?.some((cat) =>
        project.category.toUpperCase().includes(cat)
      );
    })
    .sort((a, b) => {
      const dateA = a.createdAt
        ? new Date(a.createdAt).getTime()
        : new Date(a._createdAt).getTime();
      const dateB = b.createdAt
        ? new Date(b.createdAt).getTime()
        : new Date(b._createdAt).getTime();
      return dateB - dateA;
    });

  return (
    <section id="work" className="border-t border-black">
      <div>
        {/* Single row with categories on left, view types on right */}
        <div className="flex justify-between border-b border-black">
          {/* Categories on the left */}
          <div className="flex">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 border-r border-black transition-colors ${
                  selectedCategory === category
                    ? "font-bold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View types on the right */}
          <div className="flex">
            {viewTypes.map((view) => (
              <button
                key={view.type}
                onClick={() => setViewType(view.type)}
                className={`px-4 py-2 border-l border-black transition-colors ${
                  viewType === view.type
                    ? "font-bold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects content */}
        <div className="px-4">
          {isLoading ? (
            <ProjectsLoading />
          ) : (
            <AnimatePresence mode="wait">
              {viewType === "grid" && (
                <GridView
                  projects={filteredProjects}
                  setActiveProject={setActiveProject}
                />
              )}
              {viewType === "list" && (
                <ListView
                  projects={filteredProjects}
                  setActiveProject={setActiveProject}
                />
              )}
              {viewType === "index" && (
                <IndexView
                  projects={filteredProjects}
                  setActiveProject={setActiveProject}
                />
              )}
            </AnimatePresence>
          )}
        </div>
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 py-8"
    >
      {projects.map((project) => {
        const currentImageIndex = projectImageIndices[project._id] || 0;

        return (
          <motion.li
            key={project._id}
            className="cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setActiveProject(project, currentImageIndex)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd(project)}
          >
            <div className="relative overflow-hidden">
              {project.images?.[currentImageIndex] &&
              project.images[currentImageIndex] !== "" ? (
                <Image
                  src={project.images[currentImageIndex]}
                  alt={project.title}
                  width={600}
                  height={800}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full aspect-[3/4] flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 md:hidden">
                {project.images?.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentImageIndex ? "bg-black" : "bg-black/50"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-neutral-500">{project.category}</p>
              </div>
              <span className="text-neutral-500">
                {new Date(
                  project.createdAt || project._createdAt
                ).getFullYear()}
              </span>
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
    >
      {projects.map((project) => (
        <motion.li
          key={project._id}
          className="border-b border-black"
          whileHover={{ x: 20 }}
          onClick={() => setActiveProject(project, 0)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer group py-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-neutral-500">{project.category}</p>
            </div>
            <div className="flex items-center gap-6 mt-2 sm:mt-0">
              <span className="text-neutral-500">
                {new Date(
                  project.createdAt || project._createdAt
                ).getFullYear()}
              </span>
              <ChevronRight className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
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
      className="divide-y divide-black"
    >
      {projects.map((project) => (
        <div key={project._id} className="py-8">
          <h3 className="font-bold mb-4">{project.title}</h3>
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
