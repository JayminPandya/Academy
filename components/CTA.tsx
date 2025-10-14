"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { LuUser2, LuMail, LuPhone } from "react-icons/lu";

declare global {
  interface Window {
    emailjs: {
      sendForm: (
        serviceID: string,
        templateID: string,
        form: HTMLFormElement,
        publicKey: string
      ) => Promise<{ status: number; text: string }>;
    };
  }
}

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ErrorIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
    />
  </svg>
);

interface FormData {
  kidName: string;
  childAge: string;
  parentName: string;
  mobileNumber: string;
  state: string;
  city: string;
  country: string;
  email: string;
}

const App: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    kidName: "",
    childAge: "",
    parentName: "",
    mobileNumber: "",
    state: "",
    city: "",
    country: "",
    email: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsLoading(true);
    setError(null);
    setShowSuccess(false);

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    emailjs
      .sendForm(serviceID, templateID, form.current, publicKey)
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setShowSuccess(true);
          setFormData({
            kidName: "",
            childAge: "",
            parentName: "",
            mobileNumber: "",
            state: "",
            city: "",
            country: "",
            email: "",
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
          setError("Failed to send message. Please try again later.");
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (showSuccess || error) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, error]);

  return (
    <section id="book-demo" className="font-sans text-gray-800 py-12 lg:py-20">
      <div className="relative h-full w-full z-10 mx-auto py-12 lg:py-20">
        <div className="rounded-3xl absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#FDE68A44,transparent)]"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl lg:text-5xl font-bold !leading-tight mb-4 text-gray-900">
                Book Your Child's <span className="text-[#B89658]">FREE</span>{" "}
                Demo Class Today!
              </h2>
              <p className="text-gray-600 mb-6">
                Experience our unique teaching methods firsthand. Fill out the
                form to schedule a no-obligation demo session.
              </p>
              <div className="relative w-full h-64 lg:h-80 rounded-lg shadow-2xl overflow-hidden">
                <img
                  src="/chess_image.png"
                  alt="Children learning in a class"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-200">
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
                  Schedule Your Free Demo
                </h3>
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <InputField
                    icon={<LuUser2 />}
                    name="kidName"
                    label="Kid's Name"
                    placeholder="Enter full name"
                    value={formData.kidName}
                    onChange={handleChange}
                  />
                  <InputField
                    name="childAge"
                    label="Child's Age"
                    type="number"
                    placeholder="Years"
                    value={formData.childAge}
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<LuUser2 />}
                    name="parentName"
                    label="Parent's Name"
                    placeholder="Enter full name"
                    value={formData.parentName}
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<LuPhone />}
                    name="mobileNumber"
                    label="Mobile Number"
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <InputField
                      name="city"
                      label="City"
                      placeholder="Your city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <InputField
                      name="state"
                      label="State"
                      placeholder="Your state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                  <InputField
                    name="country"
                    label="Country"
                    placeholder="Your Country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<LuMail />}
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter a valid email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#B89658] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#a9884f] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#B89658] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {isLoading ? "Sending..." : "Book Free Demo"}
                  </button>
                </form>

                {showSuccess && (
                  <div className="mt-4 flex items-center p-4 rounded-lg bg-green-100 text-green-800 border border-green-200">
                    <CheckCircleIcon className="w-6 h-6 mr-3" />
                    <p className="font-semibold">
                      Thank you! Your demo request has been submitted.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mt-4 flex items-center p-4 rounded-lg bg-red-100 text-red-800 border border-red-200">
                    <ErrorIcon className="w-6 h-6 mr-3" />
                    <p className="font-semibold">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface InputFieldProps {
  name: keyof FormData;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) => (
  <div className="relative w-full">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-600 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          {React.cloneElement(icon as React.ReactElement, {
            className: "w-5 h-5",
          })}
        </div>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`w-full py-2 border-b-2 bg-transparent border-gray-300 focus:border-[#B89658] text-gray-900 placeholder-gray-400 outline-none transition-colors duration-300 ${
          icon ? "pl-10 pr-4" : "px-4"
        }`}
      />
    </div>
  </div>
);

export default App;

