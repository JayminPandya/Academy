"use client";
import React, { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { ITestimonial } from "@/types";

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

const QuoteIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
  </svg>
);

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = (): void => {
    setCurrentIndex(
      (currentIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = (): void => {
    setCurrentIndex((currentIndex + 1) % testimonials.length);
  };

  const currentTestimonial: ITestimonial = testimonials[currentIndex];

  return (
    <section className="bg-white py-16 sm:py-28" id="testimonials">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-text-dark leading-tight">
            Start Your <span className="text-[#b89658]">Chess Adventure</span>
          </h2>
          <p className="mt-4 text-xl text-text-medium font-medium">
            Find the perfect path to begin your journey to becoming a champion.
          </p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-wrap md:flex-nowrap justify-center items-center gap-x-4 gap-y-8">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="group order-2 md:order-1 flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-text-dark hover:text-[#b89658] rounded-full p-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b89658]"
          >
            <ArrowIcon className="w-6 h-6 transform rotate-180" />
          </button>

          <div className="relative w-full order-1 md:order-2 h-[30rem] sm:h-[26rem]">
            <figure
              key={currentIndex}
              className="absolute inset-0 bg-gray-50 border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center animate-fadeIn"
              aria-live="polite"
            >
              <QuoteIcon className="absolute top-[-3rem] sm:top-[-3rem] w-[6rem] h-[6rem] text-gray-600" />

              <div className="flex-grow w-full flex items-center justify-center">
                <blockquote className="max-w-prose">
                  <p className="text-base sm:text-lg text-gray-700 italic">
                    &quot;{currentTestimonial.message}&quot;
                  </p>
                </blockquote>
              </div>

              <figcaption className="mt-6 flex flex-col items-center flex-shrink-0">
                <img
                  src={currentTestimonial.avatar}
                  alt={`${currentTestimonial.name}'s avatar`}
                  className="w-16 h-16 rounded-full shadow-md border-2 border-white object-cover"
                />
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {currentTestimonial.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Next Button - order-3 on both mobile and desktop */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="group order-3 flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-[#b89658] rounded-full p-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b89658]"
          >
            <ArrowIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
