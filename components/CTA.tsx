"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

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

const UserIcon = ({ className }: { className?: string }) => (
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
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
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
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
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
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25-2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

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
  parentName: string;
  mobileNumber: string;
  childAge: string;
  state: string;
  city: string;
  email: string;
}

const App: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    mobileNumber: "",
    childAge: "",
    state: "",
    city: "",
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
            parentName: "",
            mobileNumber: "",
            childAge: "",
            state: "",
            city: "",
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
                  className="w-full h-full object-contain"
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
                    icon={<UserIcon />}
                    name="parentName"
                    label="Parent's Name"
                    placeholder="Enter full name"
                    value={formData.parentName}
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<PhoneIcon />}
                    name="mobileNumber"
                    label="Mobile Number"
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <InputField
                      name="childAge"
                      label="Child's Age"
                      type="number"
                      placeholder="Years"
                      value={formData.childAge}
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
                    name="city"
                    label="City"
                    placeholder="Your city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <InputField
                    icon={<EmailIcon />}
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

