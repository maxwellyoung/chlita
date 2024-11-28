"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../app/page";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

type ViewType = "grid" | "list" | "index";

export function ProjectsSection({
  projects,
  isLoading,
  setActiveProject,
}: {
  projects: Project[];
  isLoading: boolean;
  setActiveProject: (project: Project | null) => void;
}) {
  const [viewType, setViewType] = useState<ViewType>("grid");

  // Sort projects using `createdAt`, fallback to `_createdAt`
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = a.createdAt
      ? new Date(a.createdAt).getTime()
      : new Date(a._createdAt).getTime();
    const dateB = b.createdAt
      ? new Date(b.createdAt).getTime()
      : new Date(b._createdAt).getTime();
    return dateB - dateA; // Most recent first
  });

  return (
    <section id="work" className="py-24 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold">SELECTED WORKS</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setViewType("grid")}
            className={`px-3 py-1 ${viewType === "grid" ? "font-bold" : ""}`}
          >
            GRID
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`px-3 py-1 ${viewType === "list" ? "font-bold" : ""}`}
          >
            LIST
          </button>
          <button
            onClick={() => setViewType("index")}
            className={`px-3 py-1 ${viewType === "index" ? "font-bold" : ""}`}
          >
            INDEX
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 h-64"
              aria-hidden="true"
            />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {viewType === "grid" && (
            <motion.ul
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sortedProjects.map((project) => (
                <motion.li
                  key={project._id}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                  onClick={() => setActiveProject(project)}
                >
                  {project.images?.[0] && project.images[0] !== "" && (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover"
                    />
                  )}
                  <div className="mt-2 text-center">
                    <h3 className="text-lg font-bold leading-tight min-h-[3rem]">
                      {project.title}
                    </h3>
                    <p className="text-sm">{project.category}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {viewType === "list" && (
            <motion.ul
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              {sortedProjects.map((project) => (
                <motion.li
                  key={project._id}
                  className="border-b border-gray-200 py-4"
                  whileHover={{ x: 20 }}
                  onClick={() => setActiveProject(project)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer group pr-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                      <h3 className="text-lg font-medium">{project.title}</h3>
                      <p className="text-sm text-gray-600">
                        {project.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 mt-2 sm:mt-0">
                      <span className="text-sm text-gray-500">
                        {new Date(
                          project.createdAt || project._createdAt
                        ).getFullYear()}
                      </span>
                      <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {viewType === "index" && (
            <motion.div
              key="index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {sortedProjects.map((project) => (
                <div key={project._id} className="space-y-4">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <motion.div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {project.images
                      ?.filter((image) => image && image !== "")
                      .map((image, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="cursor-pointer aspect-[4/3]"
                          onClick={() => setActiveProject(project)}
                        >
                          <Image
                            src={image}
                            alt={`${project.title} - Image ${index + 1}`}
                            width={300}
                            height={225}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
