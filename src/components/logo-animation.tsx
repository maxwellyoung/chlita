"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function LogoAnimation() {
  return (
    <div className="relative w-full max-w-[90vh] aspect-[2557/1813]">
      <div className="absolute inset-0">
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
  );
}
