"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "../../sanity";
import Link from "next/link";
import { AnimatedNumber } from "./animated-number";

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
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black">
      <div className="relative flex items-center">
        <div className="absolute left-0 px-4 py-2 text-sm border-r border-black">
          {currentTime}
        </div>
        <div className="w-full flex justify-center items-center px-4 py-2">
          <h1 className="text-sm">
            <Link href="/" className="hover:underline">
              CH&apos;LITA
            </Link>
          </h1>
        </div>
        <nav className="absolute right-0 border-l border-black">
          <ul className="flex text-sm">
            {["WORK", "ABOUT", "CONTACT"].map((item) => (
              <li key={item} className="border-r border-black last:border-r-0">
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 hover:underline block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
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

function ProjectImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
          <div className="w-4 h-4 border-2 border-neutral-200 border-t-neutral-400 rounded-full animate-spin" />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-full object-contain"
          onLoadingComplete={() => setIsLoading(false)}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

function ProjectModal({
  activeProject,
  setActiveProject,
}: {
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [cursorPosition, setCursorPosition] = useState<"left" | "right">(
    "left"
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const imageHeight = container.clientHeight;
    const newIndex = Math.floor(scrollPosition / imageHeight) + 1;
    setCurrentImageIndex(newIndex);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, currentTarget } = e;
    const { width } = currentTarget.getBoundingClientRect();
    setCursorPosition(clientX < width / 2 ? "left" : "right");
  };

  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          className={`fixed inset-0 bg-white z-50 ${
            cursorPosition === "left"
              ? 'cursor-[url("/cursor-left.svg"),_w-resize]'
              : 'cursor-[url("/cursor-right.svg"),_e-resize]'
          }`}
          onMouseMove={handleMouseMove}
        >
          <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black">
            <div className="relative h-[41px]">
              <button
                onClick={() => setActiveProject(null)}
                className="absolute left-0 h-full px-4 py-2 text-sm border-r border-black hover:underline"
              >
                Back
              </button>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm">
                <Link href="/" className="hover:underline">
                  CH&apos;LITA
                </Link>
                <span className="text-neutral-400 mx-2">/</span>
                <span>{activeProject.title}</span>
              </div>
              <nav className="absolute right-0 h-full border-l border-black">
                <ul className="flex text-sm">
                  {["WORK", "ABOUT", "CONTACT"].map((item) => (
                    <li
                      key={item}
                      className="border-r border-black last:border-r-0"
                    >
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className="px-4 py-2 hover:underline block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="absolute right-0 h-full flex items-center text-sm border-l border-black">
              <div className="px-4 py-2">
                <AnimatedNumber value={currentImageIndex} />
                {" / "}
                {activeProject.images.length}
              </div>
            </div>
          </header>

          <div
            className="h-screen overflow-y-auto snap-y snap-mandatory pt-[41px]"
            onScroll={handleScroll}
          >
            <div className="h-screen w-full snap-start flex items-center justify-center p-4">
              <ProjectImage
                src={activeProject.images[0]}
                alt={`${activeProject.title} cover`}
                priority
              />
            </div>

            {activeProject.images.slice(1).map((imageUrl, index) => (
              <div
                key={index}
                className="h-screen w-full snap-start flex items-center justify-center p-4"
              >
                <ProjectImage
                  src={imageUrl}
                  alt={`${activeProject.title} ${index + 2}`}
                />
              </div>
            ))}
          </div>
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
