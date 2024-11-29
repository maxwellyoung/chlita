"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LogoAnimation } from "./logo-animation";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(onComplete, 1000);
  };

  return (
    <AnimatePresence>
      {!isClicked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center cursor-pointer"
          onClick={handleClick}
        >
          <div className="relative w-full h-screen max-h-screen flex flex-col items-center justify-center p-4 gap-8">
            <LogoAnimation />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-xl md:text-2xl text-center max-w-2xl"
            >
              Ch&apos;lita is a London-based stylist & designer.
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 text-sm text-gray-500"
          >
            Click to enter
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
