"use client";

import Image from "next/image";
import React from "react";

const CheckmarkIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const CoachSection: React.FC = () => {
  const achievements = [
    "National Instructor (2024)",
    "Senior National Arbiter (2023)",
    "Nagpur FIDE Rated Tournament Winner",
    "Organizer of 10+ Gujarat Festival Tournaments",
    "3-time KMK District Champion of Botad, Gujarat",
  ];

  const highlights = [
    "Coached African Championship qualifiers",
    "Develops talents for continental levels",
    "Specializes in competitive strategy",
    "Expert in tournament preparation",
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <section
        className="text-[#3A3A3A] font-sans overflow-hidden"
        id="about-coach"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="text-center mb-12 md:mb-20">
            <h1 className="text-5xl md:text-6xl font-extrabold text-text-dark leading-tight">
              Meet Your <span className="text-[#b89658]">Chess Guide!</span>
            </h1>
            <p className="mt-4 text-xl text-text-medium font-medium">
              Get to know the master strategist who will lead you on your chess
              adventure.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 flex flex-col items-center text-center">
              <div className="relative w-64 h-80 md:w-72 md:h-96 mb-6">
                <div className="absolute inset-0 rounded-2xl bg-[#b89658] transform rotate-3"></div>
                <img
                  className="relative w-full h-full object-cover rounded-2xl shadow-lg border-4 border-white"
                  src="/Coach-Jaymin-2.jpeg"
                  alt="Coach Jaymin N. Pandya"
                />
              </div>
              <h2 className="text-3xl font-bold text-[#3A3A3A]">
                Jaymin N. Pandya
              </h2>
              <p className="text-[#b89658] font-semibold mt-1">
                Founder & Head Coach
              </p>
              <p className="text-gray-500 text-sm">Ashutosh Chess Academy</p>
            </div>

            {/* Coach Bio Section */}
            <div className="lg:col-span-3">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                With over <strong>10 years of experience</strong>, I am
                dedicated to helping young minds master the art of chess. I've
                had the privilege of coaching talented players like Devansh
                Trivedi and Kiyan Hirani from Uganda for the African
                Championship. My goal is to make learning chess a fun and
                rewarding journey for every student.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Professional Achievements */}
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-[#3A3A3A] mb-4">
                    Professional Achievements
                  </h3>
                  <ul className="space-y-3">
                    {achievements.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckmarkIcon className="w-5 h-5 text-[#b89658] mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coaching Highlights */}
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-[#3A3A3A] mb-4">
                    Coaching Highlights
                  </h3>
                  <ul className="space-y-3">
                    {highlights.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckmarkIcon className="w-5 h-5 text-[#b89658] mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoachSection;
