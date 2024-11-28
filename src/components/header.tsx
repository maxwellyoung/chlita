import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header({ currentTime }: { currentTime: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-black">
      {/* Main header bar */}
      <div className="relative flex items-center h-[41px]">
        <div className="absolute left-0 px-2 py-2 text-xs border-r border-black h-full flex items-center">
          {currentTime}
        </div>
        <div className="w-full flex justify-center items-center px-4 py-2 h-full">
          <h1 className="text-sm">
            <Link href="/" className="hover:underline">
              CH&apos;LITA
            </Link>
          </h1>
        </div>
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute right-0 px-3 h-full border-l border-black md:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={18} />
        </button>
        {/* Desktop navigation */}
        <nav className="absolute right-0 border-l border-black h-full hidden md:block">
          <ul className="flex text-sm h-full">
            {["WORK", "ABOUT", "CONTACT"].map((item) => (
              <li
                key={item}
                className="border-r border-black last:border-r-0 h-full flex"
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => scrollToSection(e, item.toLowerCase())}
                  className="px-4 py-2 hover:underline flex items-center"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-black bg-white overflow-hidden"
          >
            <motion.ul
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col text-sm"
            >
              {["WORK", "ABOUT", "CONTACT"].map((item) => (
                <motion.li
                  key={item}
                  className="border-b border-black last:border-b-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="px-4 py-3 hover:underline flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
