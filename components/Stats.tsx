import React from "react";
import { FaUserGraduate, FaTrophy } from "react-icons/fa6";
import { IoEarth } from "react-icons/io5";

const achievementsData = [
  {
    icon: <FaUserGraduate className="h-12 w-12" />,
    value: "5000+",
    title: "Student Taught",
    description:
      "We have proudly mentored thousands of students on their chess journey through seminars and group classes.",
  },
  {
    icon: <IoEarth className="h-12 w-12" />,
    value: "5+",
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
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6">
            <div className="bg-card-bg rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row flex-1 max-w-xl">
              <div className="hidden lg:block lg:w-[35%]">
                <img
                  src="/Gukesh.png"
                  alt="Gukesh D"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="lg:w-[65%] p-8 flex flex-col justify-center text-center lg:text-left">
                <div className="lg:hidden mx-auto mb-6">
                  <img
                    src="/Gukesh.png"
                    alt="Gukesh D"
                    className="w-48 h-48 rounded-2xl object-cover object-top shadow-lg border-2 border-primary-gold"
                  />
                </div>
                <blockquote className="text-2xl italic text-text-dark leading-relaxed">
                  "My message for all the kids around the globe is just to enjoy
                  it, chess is a beautiful game."
                </blockquote>
                <cite className="mt-4 block font-bold text-xl text-primary-gold not-italic">
                  — Gukesh D
                </cite>
              </div>
            </div>

            <div className="bg-card-bg rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row-reverse flex-1 max-w-xl">
              <div className="hidden lg:block lg:w-[35%]">
                <img
                  src="/Divya.png"
                  alt="Divya Deshmukh"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="lg:w-[65%] p-8 flex flex-col justify-center text-center lg:text-left">
                <div className="lg:hidden mx-auto mb-6">
                  <img
                    src="/Divya.png"
                    alt="Divya Deshmukh"
                    className="w-48 h-48 rounded-2xl object-cover object-top shadow-lg border-2 border-primary-gold"
                  />
                </div>
                <blockquote className="text-2xl italic text-text-dark leading-relaxed">
                  "It's not about who is sitting on the other side, it's about
                  the moves you make on the board."
                </blockquote>
                <cite className="mt-4 block font-bold text-xl text-primary-gold not-italic">
                  — Divya Deshmukh
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;

