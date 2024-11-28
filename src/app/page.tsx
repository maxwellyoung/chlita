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
import { SplashScreen } from "@/components/splash-screen";

export interface Project {
  _id: string;
  title: string;
  category: string;
  images: string[];
  createdAt?: string; // Optional manually-set date field
  _createdAt: string; // Sanity's automatic creation timestamp
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [initialImageIndex, setInitialImageIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  // Update the current time every second
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

  // Fetch projects from Sanity
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await client.fetch<Project[]>(`
        *[_type == "project"] {
          _id,
          title,
          category,
          "images": images[].asset->url,
          createdAt,
          _createdAt
        }
      `);
      setProjects(result);
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Optionally handle the error, e.g., show a notification or fallback UI
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSetActiveProject = (
    project: Project | null,
    index: number = 0
  ) => {
    setActiveProject(project);
    setInitialImageIndex(index);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header currentTime={currentTime} />
      <main className="pt-16">
        <HeroSection />
        <ProjectsSection
          projects={projects}
          isLoading={isLoading}
          setActiveProject={handleSetActiveProject}
        />
        <ProjectModal
          activeProject={activeProject}
          setActiveProject={setActiveProject}
          initialImageIndex={initialImageIndex}
        />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
