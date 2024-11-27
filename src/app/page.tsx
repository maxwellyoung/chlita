"use client";

import { useState, useEffect, useCallback } from "react";
import { client } from "../../sanity";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { ProjectModal } from "@/components/project-modal";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export interface Project {
  _id: string;
  title: string;
  category: string;
  images: string[];
  date?: string; // Optional custom date field
  _createdAt: string; // Sanity's automatic creation timestamp
}

export default function Home() {
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
          "images": images[].asset->url,
          date,
          _createdAt
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
