"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { client } from "../../sanity";
import { Header } from "@/components/header";
import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { SplashScreen } from "@/components/splash-screen";
import { useSearchParams } from "next/navigation";

export interface Project {
  _id: string;
  title: string;
  category: string;
  images: string[];
  createdAt?: string; // Optional manually-set date field
  _createdAt: string; // Sanity's automatic creation timestamp
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [showSplash, setShowSplash] = useState(false);

  // Check for first visit on mount
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    const isFromProject = searchParams.get("from") === "project";

    if (!hasVisited && !isFromProject) {
      setShowSplash(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, [searchParams]);

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

  // Fetch projects from Sanity with better error handling
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = `*[_type == "project"] | order(_createdAt desc) {
        _id,
        title,
        category,
        "images": images[].asset->url,
        createdAt,
        _createdAt
      }`;

      const result = await client.fetch<Project[]>(query);
      setProjects(result || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add error boundary for the entire component
  useEffect(() => {
    fetchProjects().catch((error) => {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
      setIsLoading(false);
    });
  }, [fetchProjects]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header currentTime={currentTime} />
      <main className="pt-16">
        <ProjectsSection projects={projects} isLoading={isLoading} />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
