"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";

import SectionTitle from "./SectionTitle";
import { faqs } from "@/data/faq";
import { useState } from "react";

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
);

const FAQ: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE_FAQS = 7;

  const displayedFaqs = showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE_FAQS);
  return (
    <section id="faq" className="py-10 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="">
          <p className="hidden lg:block text-foreground-accent">FAQ&apos;S</p>
          <SectionTitle>
            <h2 className="my-3 !leading-snug lg:max-w-sm text-center lg:text-left">
              Frequently Asked Questions
            </h2>
          </SectionTitle>
          <p className="lg:mt-10 text-foreground-accent text-center lg:text-left">
            Ask us anything!
          </p>
        </div>

        <div className="w-full lg:w-2/3">
          <div className="w-full space-y-4">
            {displayedFaqs.map((faq, index) => (
              <div key={index} className="border-t border-gray-200">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex items-center justify-between w-full py-5 text-left text-lg font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-teal-500 focus-visible:ring-opacity-75">
                        <span>{faq.question}</span>
                        {open ? (
                          <BiMinus className="w-5 h-5 text-secondary" />
                        ) : (
                          <BiPlus className="w-5 h-5 text-secondary" />
                        )}
                      </DisclosureButton>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <DisclosurePanel className="pb-5 pr-4 text-gray-600">
                          {faq.answer}
                        </DisclosurePanel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>

          {faqs.length > INITIAL_VISIBLE_FAQS && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center justify-center gap-2 w-full text-center font-semibold text-secondary hover:text-secondary transition-colors duration-300"
              >
                <span>{showAll ? "Show Less" : "Show More Questions"}</span>
                {showAll ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
