import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedNumber } from "./animated-number";
import { Project } from "../app/page";

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
    <div className="relative w-full h-full flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
          <div className="w-4 h-4 border-2 border-neutral-200 border-t-neutral-400 rounded-full animate-spin" />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-full max-h-full"
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain"
          onLoadingComplete={() => setIsLoading(false)}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

export function ProjectModal({
  activeProject,
  setActiveProject,
}: {
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState<"left" | "right">(
    "left"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, currentTarget } = e;
    const { width } = currentTarget.getBoundingClientRect();
    setCursorPosition(clientX < width / 2 ? "left" : "right");
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!activeProject) return;
    const { clientX, currentTarget } = e;
    const { width } = currentTarget.getBoundingClientRect();
    const isLeftSide = clientX < width / 2;

    if (isLeftSide && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
      containerRef.current?.children[currentImageIndex - 1]?.scrollIntoView({
        behavior: "smooth",
      });
    } else if (
      !isLeftSide &&
      currentImageIndex < activeProject.images.length - 1
    ) {
      setCurrentImageIndex((prev) => prev + 1);
      containerRef.current?.children[currentImageIndex + 1]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollPosition = container.scrollTop;
    const imageHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / imageHeight);

    if (
      newIndex !== currentImageIndex &&
      newIndex >= 0 &&
      newIndex < (activeProject?.images.length || 0)
    ) {
      setCurrentImageIndex(newIndex);
    }
  };

  useEffect(() => {
    setCurrentImageIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [activeProject?._id]);

  if (!activeProject) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 bg-white z-50 ${
          cursorPosition === "left"
            ? 'cursor-[url("/cursor-left.svg"),_w-resize]'
            : 'cursor-[url("/cursor-right.svg"),_e-resize]'
        }`}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <header className="fixed top-0 left-0 w-full z-50 bg-white">
          <div className="grid grid-cols-[auto,1fr,auto] h-[41px] border-b border-black">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveProject(null);
              }}
              className="px-4 py-2 text-sm border-r border-black hover:underline"
            >
              Back
            </button>
            <div className="flex justify-center items-center text-sm">
              <Link href="/" className="hover:underline">
                CH&apos;LITA
              </Link>
              <span className="text-neutral-400 mx-2">/</span>
              <span>{activeProject.title}</span>
            </div>
            <div className="flex border-l border-black">
              <nav className="border-r border-black h-full">
                <ul className="flex h-full text-sm">
                  {["WORK", "ABOUT", "CONTACT"].map((item) => (
                    <li
                      key={item}
                      className="border-r border-black last:border-r-0 h-full"
                    >
                      <Link
                        href={`#${item.toLowerCase()}`}
                        className="px-4 py-2 hover:underline h-full flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="px-4 py-2 text-sm flex items-center">
                <AnimatedNumber value={currentImageIndex + 1} />
                {" / "}
                {activeProject.images.length}
              </div>
            </div>
          </div>
        </header>

        <div
          ref={containerRef}
          className="h-screen overflow-y-auto snap-y snap-mandatory pt-[41px]"
          onScroll={handleScroll}
        >
          {activeProject.images.map((imageUrl, index) => (
            <div
              key={index}
              className="h-screen w-full snap-start flex items-center justify-center p-4"
            >
              <ProjectImage
                src={imageUrl}
                alt={`${activeProject.title} ${index + 1}`}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
