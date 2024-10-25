"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "../../sanity";

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

  useEffect(() => {
    const fetchProjects = async () => {
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
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <header className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-white border-b border-black">
        <div className="text-sm">{currentTime}</div>
        <h1 className="text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
          CH&apos;LITA
        </h1>
        <nav className="space-x-4 text-sm">
          <a href="#work" className="hover:underline">
            WORK
          </a>
          <a href="#about" className="hover:underline">
            ABOUT
          </a>
          <a href="#contact" className="hover:underline">
            CONTACT
          </a>
        </nav>
      </header>

      <main className="pt-16">
        <section className="h-screen flex flex-col justify-center items-center p-4">
          <Image
            src="/chlitacorp.png"
            alt="Ch'lita Corp"
            width={500}
            height={500}
            className="mb-8"
          />

          <p className="text-xl md:text-2xl text-center max-w-2xl">
            Ch&apos;lita is a London-based stylist pushing the boundaries of
            fashion and visual storytelling.
          </p>
        </section>

        <section id="work" className="py-24 px-4">
          <h3 className="text-2xl font-bold mb-8">SELECTED WORKS</h3>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-200 h-64"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
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
                  <h4 className="mt-2 text-lg font-bold">{project.title}</h4>
                  <p className="text-sm">{project.category}</p>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-50 overflow-auto p-4"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="mb-4 text-sm hover:underline"
              >
                ← BACK
              </button>
              <h2 className="text-4xl font-bold mb-2">{activeProject.title}</h2>
              <p className="text-xl mb-6">{activeProject.category}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeProject.images.map((imageUrl, index) => (
                  <Image
                    key={index}
                    src={imageUrl}
                    alt={`${activeProject.title} ${index + 1}`}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <section id="about" className="py-24 px-4 bg-black text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">ABOUT CH&apos;LITA</h3>
            <p className="text-xl leading-relaxed">
              With an avant-garde approach and an eye for the extraordinary,
              Ch&apos;lita&apos;s work is a fusion of art, culture, and
              innovation. Her unique vision transforms ordinary shoots into
              extraordinary narratives, challenging perceptions and defining new
              eras in fashion.
            </p>
          </div>
        </section>

        <section id="contact" className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">GET IN TOUCH</h3>
            <div className="space-y-4 text-xl">
              <p>For inquiries and collaborations:</p>
              <a
                href="mailto:vision@chlita.com"
                className="block hover:underline"
              >
                vision@chlita.com
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
        </section>
      </main>

      <footer className="py-6 px-4 border-t border-black">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <p className="text-sm">©2024 CHLITACORP</p>
          <p className="text-sm">ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
}
