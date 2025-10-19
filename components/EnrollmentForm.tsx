"use client";
import React, { useState, useEffect } from "react";
import { FaRegEnvelope, FaMobileAlt } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

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
    country: "",
    state: "",
    city: "",
    hasInternet: "",
    familiarWithPlatforms: "",
    hasFederationId: "",
    federationId: "",
    federationIdImage: null as File | null,
    hasFideId: "",
    fideIdNumber: "",
    fideIdImage: null as File | null,
    preferredDays: "",
    preferredTimeFrom: "",
    preferredTimeTo: "",
    goals: "",
    agreedToTerms: false,
    signature: "",
    date: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 2. State for managing location data from the library
  const [countriesList, setCountriesList] = useState<any[]>([]);
  const [statesList, setStatesList] = useState<any[]>([]);
  const [citiesList, setCitiesList] = useState<any[]>([]);

  // State to hold the ID of the selected country/state for fetching dependent data
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(
    null
  );
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setSelectedCountryId(null);
    setSelectedStateId(null);
    setStatesList([]);
    setCitiesList([]);
  };

  const handleToggle = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedName = selectedOption.getAttribute("data-name") || "";

    if (name === "country") {
      const countryId = parseInt(value);
      setSelectedCountryId(countryId);
      setSelectedStateId(null); // Reset state
      GetState(countryId).then((result) => setStatesList(result));
      setCitiesList([]);
      setFormData((prev) => ({
        ...prev,
        country: selectedName,
        state: "",
        city: "",
      }));
    } else if (name === "state") {
      if (!selectedCountryId) return;
      const stateId = parseInt(value);
      setSelectedStateId(stateId);
      GetCity(selectedCountryId, stateId).then((result) =>
        setCitiesList(result)
      );
      setFormData((prev) => ({ ...prev, state: selectedName, city: "" }));
    } else if (name === "city") {
      setFormData((prev) => ({ ...prev, city: selectedName }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name } = e.target;

    if (name === "country" || name === "state" || name === "city") {
      handleLocationChange(e as React.ChangeEvent<HTMLSelectElement>);
      return;
    }

    const { value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const { files } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getFileHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    // ... (All other validations remain the same)
    if (!formData.studentName.trim())
      newErrors.studentName = "Student name is required.";
    if (!formData.schoolId)
      newErrors.schoolId = "School ID card or Birth Certificate is required.";
    if (!formData.aadhaarCard)
      newErrors.aadhaarCard = "Aadhaar card is required.";
    if (!formData.chessLevel)
      newErrors.chessLevel = "Please select a chess level.";
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

    // Updated Location Validation
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.city) newErrors.city = "City is required.";

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

    if (!formData.preferredDays.trim())
      newErrors.preferredDays = "Preferred days are required.";
    if (!formData.preferredTimeFrom)
      newErrors.preferredTimeFrom = "Start time is required.";
    if (!formData.preferredTimeTo)
      newErrors.preferredTimeTo = "End time is required.";

    if (!formData.goals) newErrors.goals = "Please select a goal.";

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

    // --- Duplicate File Check on Submit ---
    const filesToUpload = [
      formData.schoolId,
      formData.aadhaarCard,
      formData.federationIdImage,
      formData.fideIdImage,
    ].filter((file): file is File => file !== null);

    if (filesToUpload.length > 1) {
      const fileHashes = await Promise.all(
        filesToUpload.map((file) => getFileHash(file))
      );
      const uniqueHashes = new Set(fileHashes);
      if (uniqueHashes.size < fileHashes.length) {
        alert(
          "Duplicate images detected. Please upload a unique image for each required document."
        );
        setStatus({
          loading: false,
          error: "Duplicate images are not allowed.",
          success: "",
        });
        return;
      }
    }

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

    Object.entries(formData).forEach(([key, value]) => {
      if (fileKeys.includes(key)) {
        if (value) data.append(key, value as File);
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
        throw new Error("Something went wrong, Try Again...");
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
          .form-input, .form-select { width: 100%; padding: 0.75rem 1rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; transition: all 0.2s ease-in-out; background-color: white; -webkit-appearance: none; -moz-appearance: none; appearance: none;}
          .form-input:focus, .form-select:focus { outline: none; border-color: #b89658; box-shadow: 0 0 0 2px rgba(184, 150, 88, 0.3); }
          .form-select { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e"); background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 2.5rem; }
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
                Upload School ID Card / Birth Certificate
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaRegEnvelope className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 pr-4 border border-[#D1D5DB] rounded-lg transition-all ease-in-out delay-[0.2s] w-full py-3"
                />
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="contact" className="form-label">
                Contact Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <FaMobileAlt className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="pl-10 pr-4 border border-[#D1D5DB] rounded-lg transition-all ease-in-out delay-[0.2s] w-full py-3"
                />
              </div>
              {errors.contact && <p className="error-text">{errors.contact}</p>}
            </div>
            <div>
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select
                id="country"
                name="country"
                onChange={handleChange}
                className="form-select"
                value={selectedCountryId || ""}
              >
                <option value="">Select Country</option>
                {countriesList.map((country: any) => (
                  <option
                    key={country.id}
                    value={country.id}
                    data-name={country.name}
                  >
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && <p className="error-text">{errors.country}</p>}
            </div>
            <div>
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                id="state"
                name="state"
                onChange={handleChange}
                className="form-select"
                disabled={!selectedCountryId}
                value={selectedStateId || ""}
              >
                <option value="">Select State</option>
                {statesList.map((state: any) => (
                  <option
                    key={state.id}
                    value={state.id}
                    data-name={state.name}
                  >
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.state && <p className="error-text">{errors.state}</p>}
            </div>
            <div className="md:col-span-2">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <select
                id="city"
                name="city"
                onChange={handleChange}
                className="form-select"
                disabled={!selectedStateId}
                value={formData.city}
              >
                <option value="">Select City</option>
                {citiesList.map((city: any) => (
                  <option key={city.id} value={city.name} data-name={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>
          </FormSection>

          {/* --- Previous Coaching & Location --- */}
          <FormSection
            title="♟️ Previous Academy or Coach"
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
                <label className="form-label">Have a AICF ID?</label>
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
                      AICF ID
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
                      Upload AICF ID
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
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 items-start">
              <div>
                <label className="form-label">Have a FIDE ID?</label>
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
                      FIDE ID
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
                      Upload FIDE ID
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
            <div className="md:col-span-2">
              <label className="form-label">Preferred Session Timings</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <div>
                  <label
                    htmlFor="preferredDays"
                    className="text-sm font-medium text-gray-600"
                  >
                    Days
                  </label>
                  <input
                    type="text"
                    id="preferredDays"
                    name="preferredDays"
                    value={formData.preferredDays}
                    onChange={handleChange}
                    className="form-input mt-1"
                    placeholder="e.g., Mon - Fri"
                  />
                  {errors.preferredDays && (
                    <p className="error-text">{errors.preferredDays}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="preferredTimeFrom"
                    className="text-sm font-medium text-gray-600"
                  >
                    From
                  </label>
                  <input
                    type="time"
                    id="preferredTimeFrom"
                    name="preferredTimeFrom"
                    value={formData.preferredTimeFrom}
                    onChange={handleChange}
                    className="form-input mt-1"
                  />
                  {errors.preferredTimeFrom && (
                    <p className="error-text">{errors.preferredTimeFrom}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="preferredTimeTo"
                    className="text-sm font-medium text-gray-600"
                  >
                    To
                  </label>
                  <input
                    type="time"
                    id="preferredTimeTo"
                    name="preferredTimeTo"
                    value={formData.preferredTimeTo}
                    onChange={handleChange}
                    className="form-input mt-1"
                  />
                  {errors.preferredTimeTo && (
                    <p className="error-text">{errors.preferredTimeTo}</p>
                  )}
                </div>
              </div>
            </div>
          </FormSection>

          {/* --- Chess Goals section --- */}
          <FormSection
            title="🎯 Chess Goals"
            isOpen={openSection === "goals"}
            onToggle={() => handleToggle("goals")}
          >
            <div className="md:col-span-2">
              <label className="form-label">Select your primary goal</label>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="goals"
                    value="School Top 5"
                    checked={formData.goals === "School Top 5"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  School Top 5
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="goals"
                    value="Zone / Taluka Top 5"
                    checked={formData.goals === "Zone / Taluka Top 5"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  Zone / Taluka Top 5
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="goals"
                    value="District Top 5"
                    checked={formData.goals === "District Top 5"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  District Top 5
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="goals"
                    value="State Top 5"
                    checked={formData.goals === "State Top 5"}
                    onChange={handleChange}
                    className="form-radio"
                  />{" "}
                  State Top 5
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="goals"
                    value="FIDE Rated Player"
                    checked={formData.goals === "FIDE Rated Player"}
                    onChange={handleChange}
                    className="form-radio"
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

