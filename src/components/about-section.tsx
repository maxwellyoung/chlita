"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

export function AboutSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section id="about" className="py-24 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <p className="text-xl leading-relaxed">
              Ch&apos;lita is a stylist who excels at creating images that
              resonate with today&apos;s visual culture. With a keen
              understanding of what captures attention now, combined with a deep
              knowledge of fashion history. What sets her work apart is the
              ability to blend modern relevance with a rich understanding of
              fashion&apos;s past, producing images that feel both current and
              enduring.
            </p>
          </div>
          <div
            className="w-full md:w-1/2 group relative overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            <Image
              src="/F1000011.webp"
              alt="Ch'lita portrait"
              width={500}
              height={750}
              className="w-full h-auto object-cover"
            />
            <motion.div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    650px circle at ${mouseX}px ${mouseY}px,
                    rgba(255, 255, 255, 0.15),
                    transparent 80%
                  )
                `,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
