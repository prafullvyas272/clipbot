"use client"; // Needed for App Router

import { motion, Variants } from "framer-motion";

interface IAnimatedTextType {
  className?: string,
  text: string;
  delayPerChar?: number;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: typeof i === "number" ? i : 0.05, delayChildren: i * 0.2 },
  }),
};

const child: Variants = {
  hidden: {
    opacity: 0,
    y: `0.25em`,
  },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 0.6,
      // Use a named easing function instead of an array to fix the type error
      ease: "easeInOut",
    },
  },
};

export default function AnimatedText({ text, delayPerChar = 0.05 }: IAnimatedTextType) {
  const letters = text.split("");

  return (
    <motion.h1
      className="text-4xl md:text-5xl font-bold text-white text-center"
      variants={container}
      initial="hidden"
      animate="visible"
      custom={delayPerChar}
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
