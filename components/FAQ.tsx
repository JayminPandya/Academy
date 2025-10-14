"use client";

import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { faqs } from "@/data/faq";

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE_FAQS = 5;

  const displayedFaqs = showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE_FAQS);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 sm:py-24" id="faqs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold text-text-dark leading-tight">
            Your <span className="text-[#b89658]">Questions</span>, Answered!
          </h2>
          <p className="mt-4 text-xl text-text-medium font-medium">
            Everything you need to know to start your chess adventure.
          </p>
        </div>

        <div className="space-y-4">
          {displayedFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden transition-all duration-300 border border-gray-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <span className="text-[#b89658] flex-shrink-0 ml-4">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {faqs.length > INITIAL_VISIBLE_FAQS && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#b89658] text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#b89658]"
            >
              {showAll ? "Show Less Questions" : "Show More Questions"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
