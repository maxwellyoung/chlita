"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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
          <div className="relative w-full h-screen max-h-screen flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-[90vh] flex items-center justify-center">
              {/* Border */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src="/logo/chlitacorp-border.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Main Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src="/logo/text-transparent.svg"
                  alt="CH'LITA"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Jesters */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src="/logo/jesters-transparent.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src="/logo/chlitacorp-icons.svg"
                  alt=""
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
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
