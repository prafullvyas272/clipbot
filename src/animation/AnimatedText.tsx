"use client"; // Needed for App Router

import { motion } from "framer-motion";

export default function AnimatedText({ text , delayPerChar = 0.05 }) {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delayPerChar, delayChildren: i * 0.2 },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl md:text-5xl font-bold text-white text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
