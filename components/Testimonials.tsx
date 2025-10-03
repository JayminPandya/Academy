"use client";
import React, { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { ITestimonial } from "@/types";

interface ArrowIconProps extends React.SVGProps<SVGSVGElement> {
  direction?: "left" | "right";
}

interface QuoteIconProps {
  className?: string;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  direction = "right",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    transform={direction === "left" ? "right" : ""}
    {...props}
  >
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
  </svg>
);

const QuoteIcon: React.FC<QuoteIconProps> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"></path>
  </svg>
);

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = (): void => {
    const newIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(newIndex);
  };

  const handleNext = (): void => {
    const newIndex = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(newIndex);
  };

  const currentTestimonial: ITestimonial = testimonials[currentIndex];

  return (
    <div className="bg-white text-gray-800 flex items-center justify-center font-sans p-4 sm:p-6 lg:p-8">
      <style>
        {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(0.98); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.6s ease-in-out forwards;
                    }
                `}
      </style>
      <div className="w-full max-w-6xl mx-auto flex flex-row items-center gap-4 sm:gap-6">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="group flex-shrink-0 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-800 rounded-full p-2 sm:p-3 transition-all duration-300 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400"
        >
          <ArrowIcon
            direction="left"
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-1 rotate-180"
          />
        </button>

        <div className="relative w-full">
          <figure
            key={currentIndex}
            className="bg-gray-50/50 border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center animate-fadeIn"
            aria-live="polite"
          >
            <QuoteIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gray-200 mb-4" />
            <blockquote className="max-w-prose">
              <p className="text-base sm:text-lg text-gray-600 italic">
                &quot;{currentTestimonial.message}&quot;
              </p>
            </blockquote>
            <figcaption className="mt-6 flex flex-col items-center">
              <img
                src={currentTestimonial.avatar}
                alt={`${currentTestimonial.name} avatar`}
                width={64}
                height={64}
                className="rounded-full shadow-md border-2 border-white"
              />
              <div className="mt-3">
                <h3 className="text-md sm:text-lg font-semibold text-gray-900">
                  {currentTestimonial.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {currentTestimonial.location}
                </p>
              </div>
            </figcaption>
          </figure>
        </div>

        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="group flex-shrink-0 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-800 rounded-full p-2 sm:p-3 transition-all duration-300 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-400"
        >
          <ArrowIcon
            direction="right"
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};

export default App;
