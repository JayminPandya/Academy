"use client";

import clsx from "clsx";
import { IPricing, ModalProps } from "@/types";
import React, { useState } from "react";
import PricingModal from "./PricingModel";

interface Props {
  tier: IPricing;
  highlight?: boolean;
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
  const { name, icon, price, features } = tier;
  const [isModalOpen, setModalOpen] = useState(false);

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "917016745669";
    const message = `I'm interested in the ${name} plan for ₹${price}/mo. Please provide more details.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <React.Fragment>
      <div
        className={clsx(
          "w-full max-w-sm mx-auto rounded-2xl border flex flex-col",
          {
            "bg-white shadow-lg border-gray-200": !highlight,
            "bg-text-dark text-white shadow-2xl border-[#b89658] transform scale-105":
              highlight,
          }
        )}
      >
        <div className="p-8 text-center border-b">
          <div
            className={clsx("text-5xl mb-4 mx-auto w-fit", {
              "text-[#b89658]": !highlight,
              "text-white": highlight,
            })}
          >
            {icon}
          </div>
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="mt-4 text-4xl sm:text-5xl font-extrabold">
            <span className={clsx({ "text-[#b89658]": highlight })}>
              {typeof price === "number" ? `₹${price}` : price}
            </span>
            {typeof price === "number" && (
              <span
                className={clsx("text-lg font-medium", {
                  "text-gray-500": !highlight,
                  "text-gray-300": highlight,
                })}
              >
                /mo
              </span>
            )}
          </p>
        </div>

        <div className="p-8 flex-grow">
          <p className="font-semibold mb-1">FEATURES</p>
          <p
            className={clsx("mb-6", {
              "text-gray-600": !highlight,
              "text-gray-400": highlight,
            })}
          >
            Everything in basic, plus...
          </p>
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckIcon className="h-6 w-6 text-[#b89658] mr-3 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 pt-0 mt-auto">
          <button
            onClick={() => setModalOpen(true)}
            className={clsx(
              "w-full py-3 px-6 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105",
              {
                "bg-gray-100 text-[#b89658] hover:bg-gray-200": !highlight,
                "bg-[#b89658] text-white hover:bg-[#a9884f]": highlight,
              }
            )}
          >
            Make Your First Move
          </button>
        </div>
      </div>

      {isModalOpen && (
        <PricingModal
          tier={tier}
          onClose={() => setModalOpen(false)}
          onConfirm={handleWhatsAppRedirect}
        />
      )}
    </React.Fragment>
  );
};

export default PricingColumn;
