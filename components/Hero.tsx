"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const heroDetails = {
  heading: (
    <>
      Master the Game, Shape Your Mind: <br />
      <span className="text-[#b89658]">Your Chess Journey Starts Here</span>
    </>
  ),
  subheading:
    "Join our world-class chess academy and unlock your strategic potential. We offer expert coaching for all ages, turning passion into championship-level skill.",
  centerImageSrc: "/mate.png",
};

const JoinNowButton = () => (
  <a
    href="#book-demo"
    className="bg-[#b89658] text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 hover:bg-[#a9884f] shadow-lg"
  >
    Schdule Your Free Demo
  </a>
);

const Hero: React.FC = () => {
  return (
    <section id="hero" className="bg-white mt-28 md:mt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-dark leading-tight">
            {heroDetails.heading}
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            {heroDetails.subheading}
          </p>
          <div className="mt-10">
            <JoinNowButton />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <img
            src={heroDetails.centerImageSrc}
            alt="Young chess players engaged in a match"
            className="rounded-2xl shadow-2xl object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
