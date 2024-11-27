import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "../app/page";

export function ProjectsSection({
  projects,
  isLoading,
  setActiveProject,
}: {
  projects: Project[];
  isLoading: boolean;
  setActiveProject: (project: Project) => void;
}) {
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
      {/* <h2 className="text-2xl font-bold mb-8">SELECTED WORKS</h2> */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 h-64"
              aria-hidden="true"
            ></div>
          ))}
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project) => (
            <li key={project._id}>
              <motion.div
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveProject(project)}
              >
                {project.images && project.images[0] && (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                )}
                <h3 className="mt-2 text-lg font-bold">{project.title}</h3>
                <p className="text-sm">{project.category}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
