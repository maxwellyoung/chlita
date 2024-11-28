"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Add a slight delay before completing to allow for exit animation
    setTimeout(onComplete, 800);
  };

  return (
    <AnimatePresence>
      {!isClicked && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center cursor-pointer"
          onClick={handleClick}
        >
          <motion.div
            className="relative w-[500px] h-[500px]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Logo Components */}
            <motion.div className="absolute inset-0">
              <Image
                src="/logo/text.svg"
                alt="CHLITACORP"
                width={500}
                height={100}
                className="w-full"
                priority
              />
            </motion.div>

            {/* Jesters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-1/2 left-0 right-0 flex justify-center gap-12"
            >
              {[
                "/logo/jester1.svg",
                "/logo/jester2.svg",
                "/logo/jester3.svg",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 10 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                    delay: i * 0.2,
                  }}
                >
                  <Image src={src} alt="" width={100} height={100} />
                </motion.div>
              ))}
            </motion.div>

            {/* Icons at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-0 left-0 right-0 flex justify-center gap-8"
            >
              {[
                "/logo/symbol1.svg",
                "/logo/globe.svg",
                "/logo/chlita-symbol.svg",
                "/logo/world-map.svg",
                "/logo/symbol2.svg",
              ].map((src, i) => (
                <Image key={i} src={src} alt="" width={40} height={40} />
              ))}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="mt-8 text-sm text-gray-500"
          >
            Click to enter
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
