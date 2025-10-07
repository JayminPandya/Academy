import React from "react";
import { FaUserGraduate, FaTrophy } from "react-icons/fa6";
import { IoEarth } from "react-icons/io5";

const achievementsData = [
  {
    icon: <FaUserGraduate className="h-12 w-12" />,
    value: "5000+",
    title: "Student Taught",
    description:
      "We have proudly mentored thousands of students on their chess journey.",
  },
  {
    icon: <IoEarth className="h-12 w-12" />,
    value: "20+",
    title: "Countries Reached",
    description:
      "Our academy welcomes aspiring chess players from all over the world.",
  },
  {
    icon: <FaTrophy className="h-12 w-12" />,
    value: "200+",
    title: "Awards Won",
    description:
      "Our students have won hundreds of awards in various prestigious tournaments.",
  },
];

const AchievementsSection = () => {
  return (
    <section className="bg-bg-light-teal py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-10 h-10 bg-[url('/chess-pawn.svg')] bg-contain"></div>
        <div className="absolute bottom-1/3 right-[15%] w-12 h-12 bg-[url('/chess-knight.svg')] bg-contain"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-text-dark leading-tight">
            Our <span className="text-primary-gold">Golden</span> Moments
          </h2>
          <p className="mt-4 text-xl text-text-medium font-medium">
            Celebrating the hard work and success of our young chess stars!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievementsData.map((achievement, index) => (
            <div
              key={index}
              className="bg-card-bg rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300 border-b-4 border-primary-gold"
            >
              <div className="text-primary-gold mb-6">{achievement.icon}</div>
              <h3 className="text-4xl font-extrabold text-primary-gold mb-2">
                {achievement.value}
              </h3>
              <p className="text-xl font-bold text-text-dark mb-3">
                {achievement.title}
              </p>
              <p className="text-base text-text-medium leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="mx-auto bg-card-bg/80 backdrop-blur-sm rounded-2xl shadow-lg flex flex-col lg:flex-row overflow-hidden">
            <div className="hidden lg:block lg:w-1/4">
              <img
                src="/Gukesh.png"
                alt="Gukesh D"
                className="w-full h-48 lg:h-full object-cover"
              />
            </div>

            <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center text-center">
              <div className="flex lg:hidden justify-center items-center gap-4 mb-6">
                <img
                  src="/Gukesh.png"
                  alt="Gukesh D"
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary-gold shadow-md"
                />
                <img
                  src="/Divya.png"
                  alt="Divya Deshmukh"
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary-gold shadow-md"
                />
              </div>

              <blockquote className="text-xl italic text-text-dark leading-relaxed">
                " I believe in making good moves, each one taking me closer to
                my goals. I've achieved one, but there are a hundred more
                waiting. "
              </blockquote>
              <cite className="mt-6 block font-bold text-lg text-primary-gold not-italic">
                ~ Gukesh D & Divya Deshmukh
              </cite>
            </div>

            <div className="hidden lg:block lg:w-1/4">
              <img
                src="/Divya.png"
                alt="Divya Deshmukh"
                className="w-full h-48 lg:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
