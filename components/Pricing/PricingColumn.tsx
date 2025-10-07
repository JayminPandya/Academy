"use client";

import clsx from "clsx";

import { IPricing } from "@/types";
import React, { useState } from "react";

import PricingModal from "./PricingModel";

interface Props {
  tier: IPricing;
  highlight?: boolean;
}

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    width="20"
    height="20"
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
    const message = `I want to join ${name} level coaching @ ₹${price}/-`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <React.Fragment>
      <div
        className={clsx(
          "w-full max-w-sm mx-auto bg-white rounded-xl border border-gray-200 lg:max-w-full",
          { "shadow-lg": highlight }
        )}
      >
        <div className="p-6 border-b border-gray-200 rounded-t-xl">
          <h3 className="text-2xl font-semibold mb-4">{icon}</h3>
          <p className="text-3xl md:text-5xl font-bold mb-6">
            <span className={clsx({ "text-secondary": highlight })}>
              {typeof price === "number" ? `₹${price}` : price}
            </span>
            {typeof price === "number" && (
              <span className="text-lg font-normal text-gray-600">/mo</span>
            )}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className={clsx("w-full py-3 px-4 rounded-full transition-colors", {
              "text-white bg-primary hover:bg-primary-accent": highlight,
              "bg-hero-background hover:bg-gray-200": !highlight,
            })}
          >
            Enroll Now
          </button>
        </div>
        <div className="p-6 mt-1">
          <p className="font-bold mb-0">FEATURES</p>
          <p className="text-foreground-accent mb-5">
            Everything in basic, plus...
          </p>
          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-secondary mr-2" />
                <span className="text-foreground-accent">{feature}</span>
              </li>
            ))}
          </ul>
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


