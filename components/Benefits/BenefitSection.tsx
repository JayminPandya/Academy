"use client";
import Image from "next/image";
import clsx from "clsx";
import { motion, Variants } from "framer-motion";

import BenefitBullet from "./BenefitBullet";
import SectionTitle from "../SectionTitle";
import { IBenefit } from "@/types";

interface Props {
  benefit: IBenefit;
  imageAtRight?: boolean;
}

const containerVariants: Variants = {
  offscreen: { opacity: 0, y: 80 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1.2,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const childVariants: Variants = {
  offscreen: { opacity: 0, x: -40 },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", bounce: 0.3, duration: 1 },
  },
};

// --- Main Benefit Section Component ---
const BenefitSection: React.FC<Props> = ({ benefit, imageAtRight = false }) => {
  const { title, description, imageSrc, bullets } = benefit;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div
          className={clsx("w-full lg:w-1/2 text-center lg:text-left", {
            "justify-start": imageAtRight,
            "lg:order-1 justify-end": !imageAtRight,
          })}
        >
          <motion.div variants={childVariants}>
            <SectionTitle>
              <h3>{title}</h3>
            </SectionTitle>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              {description}
            </p>
          </motion.div>

          <div className="mt-8">
            {bullets.map((item, index) => (
              <BenefitBullet
                key={index}
                title={item.title}
                icon={item.icon}
                description={item.description}
              />
            ))}
          </div>
        </div>

        <div
          className={clsx("w-full lg:w-1/2", {
            "lg:order-2": imageAtRight,
          })}
        >
          <motion.div variants={childVariants}>
            <img
              src={imageSrc}
              alt={typeof title === "string" ? title : "Benefit Image"}
              className="rounded-2xl shadow-2xl object-cover w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
export default BenefitSection;
