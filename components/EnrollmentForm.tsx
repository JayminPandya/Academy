"use client";
import React, { useState } from "react";
import { FaRegEnvelope, FaMobileAlt } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

// --- Form Section Component for Accordion ---
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  isOpen,
  onToggle,
}) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
    >
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {isOpen ? (
        <IoChevronUp className="w-6 h-6 text-[#b89658]" />
      ) : (
        <IoChevronDown className="w-6 h-6 text-[#b89658]" />
      )}
    </button>
    {isOpen && (
      <div className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {children}
        </div>
      </div>
    )}
  </div>
);

const EnrollmentForm: React.FC = () => {
  const [openSection, setOpenSection] = useState<string>("studentInfo");
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  // State to hold all form data
  const initialFormState = {
    studentName: "",
    schoolId: null as File | null,
    aadhaarCard: null as File | null,
    chessLevel: "",
    achievements: "",
    parentName: "",
    parentOccupation: "",
    postName: "",
    businessName: "",
    email: "",
    contact: "",
    prevCoach: "",
    city: "",
    state: "",
    country: "",
    hasInternet: "",
    familiarWithPlatforms: "",
    hasFederationId: "",
    federationId: "",
    federationIdImage: null as File | null,
    hasFideId: "",
    fideIdNumber: "",
    fideIdImage: null as File | null,
    preferredTiming: "",
    goals: [] as string[],
    agreedToTerms: false,
    signature: "",
    date: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    // We keep the success message visible for the user
  };

  const handleToggle = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      if (name === "goals") {
        setFormData((prev) => ({
          ...prev,
          goals: checked
            ? [...prev.goals, value]
            : prev.goals.filter((goal) => goal !== value),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else if (type === "file") {
      const { files } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    // Student Info
    if (!formData.studentName.trim())
      newErrors.studentName = "Student name is required.";
    if (!formData.schoolId) newErrors.schoolId = "School ID card is required.";
    if (!formData.aadhaarCard)
      newErrors.aadhaarCard = "Aadhaar card is required.";
    if (!formData.chessLevel)
      newErrors.chessLevel = "Please select a chess level.";

    // Parent Info
    if (!formData.parentName.trim())
      newErrors.parentName = "Parent name is required.";
    if (!formData.parentOccupation)
      newErrors.parentOccupation = "Please select an occupation.";
    if (formData.parentOccupation === "job" && !formData.postName.trim())
      newErrors.postName = "Post name is required.";
    if (
      formData.parentOccupation === "business" &&
      !formData.businessName.trim()
    )
      newErrors.businessName = "Business name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    } else if (!/^\d{10,}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be at least 10 digits.";
    }

    // Location
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";

    // Online Readiness & IDs
    if (!formData.hasInternet)
      newErrors.hasInternet = "This field is required.";
    if (!formData.familiarWithPlatforms)
      newErrors.familiarWithPlatforms = "This field is required.";
    if (!formData.hasFederationId)
      newErrors.hasFederationId = "This field is required.";
    if (formData.hasFederationId === "yes" && !formData.federationId.trim())
      newErrors.federationId = "Federation ID is required.";
    if (formData.hasFederationId === "yes" && !formData.federationIdImage)
      newErrors.federationIdImage = "Federation ID image is required.";
    if (!formData.hasFideId) newErrors.hasFideId = "This field is required.";
    if (formData.hasFideId === "yes" && !formData.fideIdNumber.trim())
      newErrors.fideIdNumber = "FIDE / AICF ID is required.";
    if (formData.hasFideId === "yes" && !formData.fideIdImage)
      newErrors.fideIdImage = "FIDE / AICF ID image is required.";
    if (!formData.preferredTiming.trim())
      newErrors.preferredTiming = "Preferred timing is required.";

    // Goals
    if (formData.goals.length === 0)
      newErrors.goals = "Please select at least one goal.";

    // Terms & Consent
    if (!formData.signature.trim())
      newErrors.signature = "Signature is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.agreedToTerms)
      newErrors.agreedToTerms = "You must agree to the terms and conditions.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    setStatus({ loading: true, error: "", success: "" });

    const data = new FormData();
    const fileKeys = [
      "schoolId",
      "aadhaarCard",
      "federationIdImage",
      "fideIdImage",
    ];

    // Append all fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (fileKeys.includes(key)) {
        if (value) data.append(key, value as File);
      } else if (Array.isArray(value)) {
        data.append(key, value.join(", "));
      } else {
        data.append(key, String(value));
      }
    });

    try {
      const response = await fetch("/api/send-enrollment", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong sending the email."
        );
      }

      setStatus({
        loading: false,
        success: "Enrollment successful! We will be in touch shortly.",
        error: "",
      });
      resetForm();
    } catch (error: any) {
      setStatus({ loading: false, error: error.message, success: "" });
    }
  };

  return (
    <section className="bg-white py-16 sm:py-24">
      <style>
        {`
          .form-label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151; }
          .form-input { width: 100%; padding: 0.75rem 1rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; transition: all 0.2s ease-in-out; }
          .form-input:focus { outline: none; border-color: #b89658; box-shadow: 0 0 0 2px rgba(184, 150, 88, 0.3); }
          .form-input-file { width: 100%; font-size: 0.875rem; color: #4B5563; }
          .form-input-file::file-selector-button { margin-right: 1rem; padding: 0.5rem 1rem; border-radius: 0.5rem; border: 0; font-weight: 600; background-color: #fef3c7; color: #b89658; cursor: pointer; transition: background-color 0.2s; }
          .form-input-file::file-selector-button:hover { background-color: #fde68a; }
          .form-radio-label, .form-checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
          .form-radio, .form-checkbox { width: 1.25rem; height: 1.25rem; accent-color: #b89658; }
          .error-text { color: #EF4444; font-size: 0.875rem; margin-top: 0.25rem; }
        `}
      </style>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-text-dark leading-tight">
            Chess Enrollment Form
          </h1>
          <p className="mt-4 text-xl text-text-medium font-medium">
            Begin your journey by filling out the details below.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* --- Student Information --- */}
          <FormSection
            title="🧒 Student Information"
            isOpen={openSection === "studentInfo"}
            onToggle={() => handleToggle("studentInfo")}
          >
            <div className="md:col-span-2">
              <label htmlFor="studentName" className="form-label">
                Full Name of Student
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="form-input"
              />
              {errors.studentName && (
                <p className="error-text">{errors.studentName}</p>
              )}
            </div>
            <div>
              <label htmlFor="schoolId" className="form-label">
                Upload School ID Card
              </label>
              <input
                type="file"
                id="schoolId"
                name="schoolId"
                onChange={handleChange}
                className="form-input-file"
              />
              {errors.schoolId && (
                <p className="error-text">{errors.schoolId}</p>
              )}
            </div>
            <div>
              <label htmlFor="aadhaarCard" className="form-label">
                Upload Aadhaar Card
              </label>
              <input
                type="file"
                id="aadhaarCard"
                name="aadhaarCard"
                onChange={handleChange}
                className="form-input-file"
              />
              {errors.aadhaarCard && (
                <p className="error-text">{errors.aadhaarCard}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Chess Level</label>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="chessLevel"
                    value="Beginner"
                    checked={formData.chessLevel === "Beginner"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  Beginner
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="chessLevel"
                    value="Intermediate"
                    checked={formData.chessLevel === "Intermediate"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  Intermediate
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="chessLevel"
                    value="Advanced"
                    checked={formData.chessLevel === "Advanced"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  Advanced
                </label>
              </div>
              {errors.chessLevel && (
                <p className="error-text">{errors.chessLevel}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="achievements" className="form-label">
                Chess Achievements (if any)
              </label>
              <textarea
                id="achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                rows={3}
                className="form-input"
              ></textarea>
            </div>
          </FormSection>

          {/* --- Parent / Guardian Information --- */}
          <FormSection
            title="👨‍👩‍👧 Parent / Guardian Information"
            isOpen={openSection === "parentInfo"}
            onToggle={() => handleToggle("parentInfo")}
          >
            <div className="md:col-span-2">
              <label htmlFor="parentName" className="form-label">
                Full Name of Parent/Guardian
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="form-input"
              />
              {errors.parentName && (
                <p className="error-text">{errors.parentName}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Occupation</label>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="parentOccupation"
                    value="job"
                    checked={formData.parentOccupation === "job"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  Job
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="parentOccupation"
                    value="business"
                    checked={formData.parentOccupation === "business"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  Business
                </label>
              </div>
              {errors.parentOccupation && (
                <p className="error-text">{errors.parentOccupation}</p>
              )}
            </div>
            {formData.parentOccupation === "job" && (
              <div className="md:col-span-2">
                <label htmlFor="postName" className="form-label">
                  Post Name
                </label>
                <input
                  type="text"
                  id="postName"
                  name="postName"
                  value={formData.postName}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.postName && (
                  <p className="error-text">{errors.postName}</p>
                )}
              </div>
            )}
            {formData.parentOccupation === "business" && (
              <div className="md:col-span-2">
                <label htmlFor="businessName" className="form-label">
                  Name of Business
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.businessName && (
                  <p className="error-text">{errors.businessName}</p>
                )}
              </div>
            )}
            <div>
              <label htmlFor="email" className="form-label">
                Email ID
              </label>
              <div className="relative">
                <FaRegEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input pl-10"
                />
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="contact" className="form-label">
                Contact Number
              </label>
              <div className="relative">
                <FaMobileAlt className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="form-input pl-10"
                />
              </div>
              {errors.contact && <p className="error-text">{errors.contact}</p>}
            </div>
          </FormSection>

          {/* --- Previous Coaching & Location --- */}
          <FormSection
            title="♟️ Previous Coaching & Location"
            isOpen={openSection === "coachingLocation"}
            onToggle={() => handleToggle("coachingLocation")}
          >
            <div className="md:col-span-2">
              <label htmlFor="prevCoach" className="form-label">
                Name of Previous Academy or Coach (if any)
              </label>
              <input
                type="text"
                id="prevCoach"
                name="prevCoach"
                value={formData.prevCoach}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
              />
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-input"
              />
              {errors.state && <p className="error-text">{errors.state}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
              />
              {errors.country && <p className="error-text">{errors.country}</p>}
            </div>
          </FormSection>

          {/* --- Online Readiness & IDs --- */}
          <FormSection
            title="💻 Online Readiness & IDs"
            isOpen={openSection === "onlineReadiness"}
            onToggle={() => handleToggle("onlineReadiness")}
          >
            <div>
              <label className="form-label">
                Have computer/laptop with Internet?
              </label>
              <div className="flex gap-x-6 mt-2">
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="hasInternet"
                    value="yes"
                    checked={formData.hasInternet === "yes"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  Yes
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="hasInternet"
                    value="no"
                    checked={formData.hasInternet === "no"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  No
                </label>
              </div>
              {errors.hasInternet && (
                <p className="error-text">{errors.hasInternet}</p>
              )}
            </div>
            <div>
              <label className="form-label">
                Familiar with Zoom, Google Meet, etc.?
              </label>
              <div className="flex gap-x-6 mt-2">
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="familiarWithPlatforms"
                    value="yes"
                    checked={formData.familiarWithPlatforms === "yes"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  Yes
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="familiarWithPlatforms"
                    value="no"
                    checked={formData.familiarWithPlatforms === "no"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  No
                </label>
              </div>
              {errors.familiarWithPlatforms && (
                <p className="error-text">{errors.familiarWithPlatforms}</p>
              )}
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 items-start">
              <div>
                <label className="form-label">
                  Have a Chess Federation ID?
                </label>
                <div className="flex gap-x-6 mt-2">
                  <label className="form-radio-label">
                    <input
                      type="radio"
                      name="hasFederationId"
                      value="yes"
                      checked={formData.hasFederationId === "yes"}
                      onChange={handleChange}
                      className="form-radio"
                    />{" "}
                    Yes
                  </label>
                  <label className="form-radio-label">
                    <input
                      type="radio"
                      name="hasFederationId"
                      value="no"
                      checked={formData.hasFederationId === "no"}
                      onChange={handleChange}
                      className="form-radio"
                    />{" "}
                    No
                  </label>
                </div>
                {errors.hasFederationId && (
                  <p className="error-text">{errors.hasFederationId}</p>
                )}
              </div>
              {formData.hasFederationId === "yes" && (
                <div className="grid grid-cols-1 gap-y-4">
                  <div>
                    <label htmlFor="federationId" className="form-label">
                      Federation ID
                    </label>
                    <input
                      type="text"
                      id="federationId"
                      name="federationId"
                      value={formData.federationId}
                      onChange={handleChange}
                      className="form-input"
                    />
                    {errors.federationId && (
                      <p className="error-text">{errors.federationId}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="federationIdImage" className="form-label">
                      Upload Federation ID
                    </label>
                    <input
                      type="file"
                      id="federationIdImage"
                      name="federationIdImage"
                      onChange={handleChange}
                      className="form-input-file"
                    />
                    {errors.federationIdImage && (
                      <p className="error-text">{errors.federationIdImage}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 items-start">
              <div>
                <label className="form-label">Have a FIDE ID or AICF ID?</label>
                <div className="flex gap-x-6 mt-2">
                  <label className="form-radio-label">
                    <input
                      type="radio"
                      name="hasFideId"
                      value="yes"
                      checked={formData.hasFideId === "yes"}
                      onChange={handleChange}
                      className="form-radio"
                    />{" "}
                    Yes
                  </label>
                  <label className="form-radio-label">
                    <input
                      type="radio"
                      name="hasFideId"
                      value="no"
                      checked={formData.hasFideId === "no"}
                      onChange={handleChange}
                      className="form-radio"
                    />{" "}
                    No
                  </label>
                </div>
                {errors.hasFideId && (
                  <p className="error-text">{errors.hasFideId}</p>
                )}
              </div>
              {formData.hasFideId === "yes" && (
                <div className="grid grid-cols-1 gap-y-4">
                  <div>
                    <label htmlFor="fideIdNumber" className="form-label">
                      FIDE / AICF ID
                    </label>
                    <input
                      type="text"
                      id="fideIdNumber"
                      name="fideIdNumber"
                      value={formData.fideIdNumber}
                      onChange={handleChange}
                      className="form-input"
                    />
                    {errors.fideIdNumber && (
                      <p className="error-text">{errors.fideIdNumber}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="fideIdImage" className="form-label">
                      Upload FIDE / AICF ID
                    </label>
                    <input
                      type="file"
                      id="fideIdImage"
                      name="fideIdImage"
                      onChange={handleChange}
                      className="form-input-file"
                    />
                    {errors.fideIdImage && (
                      <p className="error-text">{errors.fideIdImage}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="preferredTiming" className="form-label">
                Preferred Session Timings
              </label>
              <input
                type="text"
                id="preferredTiming"
                name="preferredTiming"
                value={formData.preferredTiming}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Weekends, 4 PM - 6 PM IST"
              />
              {errors.preferredTiming && (
                <p className="error-text">{errors.preferredTiming}</p>
              )}
            </div>
          </FormSection>

          {/* --- Chess Goals --- */}
          <FormSection
            title="🎯 Chess Goals"
            isOpen={openSection === "goals"}
            onToggle={() => handleToggle("goals")}
          >
            <div className="md:col-span-2">
              <label className="form-label">Select one or more goals</label>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="goals"
                    value="School Top 5"
                    onChange={handleChange}
                    className="form-checkbox"
                  />{" "}
                  School Top 5
                </label>
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="goals"
                    value="Zone / Taluka Top 5"
                    onChange={handleChange}
                    className="form-checkbox"
                  />{" "}
                  Zone / Taluka Top 5
                </label>
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="goals"
                    value="District Top 5"
                    onChange={handleChange}
                    className="form-checkbox"
                  />{" "}
                  District Top 5
                </label>
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="goals"
                    value="State Top 5"
                    onChange={handleChange}
                    className="form-checkbox"
                  />{" "}
                  State Top 5
                </label>
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    name="goals"
                    value="FIDE Rated Player"
                    onChange={handleChange}
                    className="form-checkbox"
                  />{" "}
                  FIDE Rated Player
                </label>
              </div>
              {errors.goals && <p className="error-text">{errors.goals}</p>}
            </div>
          </FormSection>

          {/* --- Terms & Consent --- */}
          <FormSection
            title="⚖️ Declaration, Terms & Consent"
            isOpen={openSection === "terms"}
            onToggle={() => handleToggle("terms")}
          >
            <div className="md:col-span-2 space-y-4 text-gray-600 text-sm">
              <h3 className="font-bold text-gray-800 text-base">
                Terms and Conditions
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Fees once paid are non-refundable and non-transferable.</li>
                <li>
                  Coaching sessions will be scheduled based on availability and
                  confirmed via communication.
                </li>
                <li>
                  Students should have a distraction-free environment for online
                  coaching.
                </li>
                <li>
                  The academy is not responsible for technical issues on the
                  student's side.
                </li>
                <li>
                  Students must adhere to the coaching code of conduct during
                  sessions.
                </li>
                <li>
                  Parents/guardians must supervise minors during coaching hours.
                </li>
              </ul>
              <h3 className="font-bold text-gray-800 text-base pt-4">
                Declaration & Consent
              </h3>
              <p>
                I hereby declare that all the information provided above is
                accurate and true to the best of my knowledge. I agree to follow
                the rules and regulations of the coaching academy and consent to
                my enrollment in the online chess coaching program.
              </p>
            </div>
            <div className="md:col-span-2 pt-4">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="font-semibold">
                  I agree to the terms and consent to enrollment.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="error-text">{errors.agreedToTerms}</p>
              )}
            </div>
            <div>
              <label htmlFor="signature" className="form-label">
                Signature (Type Full Name)
              </label>
              <input
                type="text"
                id="signature"
                name="signature"
                value={formData.signature}
                onChange={handleChange}
                className="form-input"
              />
              {errors.signature && (
                <p className="error-text">{errors.signature}</p>
              )}
            </div>
            <div>
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
              />
              {errors.date && <p className="error-text">{errors.date}</p>}
            </div>
          </FormSection>

          {/* --- Submit Button --- */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={status.loading}
              className="bg-[#b89658] text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform duration-300 hover:scale-105 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {status.loading ? "Submitting..." : "Submit Enrollment"}
            </button>
            {/* Status Messages */}
            <div className="text-center mt-4">
              {status.success && (
                <p className="text-green-600 font-medium">{status.success}</p>
              )}
              {status.error && (
                <p className="text-red-600 font-medium">{status.error}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EnrollmentForm;
