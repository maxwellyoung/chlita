"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "../../sanity";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  category: string;
  images: string[];
}

export function Index() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await client.fetch<Project[]>(`
        *[_type == "project"] {
          _id,
          title,
          category,
          "images": images[].asset->url
        }
      `);
      setProjects(result);
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Handle the error, e.g., show an error message to the user
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header currentTime={currentTime} />
      <main className="pt-16">
        <HeroSection />
        <ProjectsSection
          projects={projects}
          isLoading={isLoading}
          setActiveProject={setActiveProject}
        />
        <ProjectModal
          activeProject={activeProject}
          setActiveProject={setActiveProject}
        />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Header({ currentTime }: { currentTime: string }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-white border-b border-black">
      <div className="text-sm" aria-live="polite" aria-atomic="true">
        {currentTime}
      </div>
      <h1 className="text-lg font-bold hidden sm:block sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
        CH&apos;LITA
      </h1>
      <nav>
        <ul className="flex space-x-4 text-sm">
          {["work", "about", "contact"].map((item) => (
            <li key={item}>
              <a href={`#${item}`} className="hover:underline">
                {item.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="h-screen flex flex-col justify-center items-center p-4">
      <Image
        src="/chlitacorp.png"
        alt="Ch'lita Corp"
        width={500}
        height={500}
        className="mb-8"
        priority
      />
      <p className="text-xl md:text-2xl text-center max-w-2xl">
        Ch&apos;lita is a London-based stylist pushing the boundaries of fashion
        and visual storytelling.
      </p>
    </section>
  );
}

function ProjectsSection({
  projects,
  isLoading,
  setActiveProject,
}: {
  projects: Project[];
  isLoading: boolean;
  setActiveProject: (project: Project) => void;
}) {
  return (
    <section id="work" className="py-24 px-4">
      <h2 className="text-2xl font-bold mb-8">SELECTED WORKS</h2>
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
          {projects.map((project) => (
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

function ProjectModal({
  activeProject,
  setActiveProject,
}: {
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
}) {
  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50 overflow-auto p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          <button
            onClick={() => setActiveProject(null)}
            className="mb-4 text-sm hover:underline"
            aria-label="Close project details"
          >
            ← BACK
          </button>
          <h2 id="project-title" className="text-4xl font-bold mb-2">
            {activeProject.title}
          </h2>
          <p className="text-xl mb-6">{activeProject.category}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProject.images.map((imageUrl, index) => (
              <li key={index}>
                <Image
                  src={imageUrl}
                  alt={`${activeProject.title} ${index + 1}`}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">ABOUT CH&apos;LITA</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <p className="text-xl leading-relaxed">
              With an avant-garde approach and an eye for the extraordinary,
              Ch&apos;lita&apos;s work is a fusion of art, culture, and
              innovation. Her unique vision transforms ordinary shoots into
              extraordinary narratives, challenging perceptions and defining new
              eras in fashion.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src="/F1000011.webp"
              alt="Ch'lita portrait"
              width={500}
              height={750}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">GET IN TOUCH</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3">
            <Image
              src="/CHLITAICON.webp"
              alt="Ch'lita logo"
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4 text-xl">
            <p>For inquiries and collaborations:</p>
            <a href="mailto:info@chlita.com" className="block hover:underline">
              info@chlita.com
            </a>
            <a
              href="https://instagram.com/chlita"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:underline"
            >
              @chlita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-black">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex justify-between w-full sm:w-auto mb-4 sm:mb-0">
          <p className="text-sm">©2024 CHLITACORP</p>
          <p className="text-sm sm:ml-4">ALL RIGHTS RESERVED</p>
        </div>
        <p className="text-xs text-gray-500">
          Site by{" "}
          <Link
            href="https://dev.maxwellyoung.info"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maxwell Young
          </Link>
        </p>
      </div>
    </footer>
  );
}
