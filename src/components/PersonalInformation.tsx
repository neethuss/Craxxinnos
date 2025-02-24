import React, { FormEvent, useState } from "react";
import Stepper from "./Stepper";
import FormInput from "./FornInput";
import DropdownInput from "./DropdownInput";
import FormButton from "./FormButton";
import Header from "./Header";
import { IoMdInformationCircle } from "react-icons/io";
import { personalInfoValidation } from "../utils/validation";
import { PersonalInfoErrors } from "../utils/Types";
import { setUser, setSignupStep } from "@/store/userSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import {  AppDispatch } from "@/store/store";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    title: "Mr",
    fullName: "",
    dob: "",
    currentAddress: "",
    livedDuration: "",
    aboutYou: "",
  });

  const router = useRouter();

  const email = localStorage.getItem('email') as string

  const dispatch = useDispatch<AppDispatch>();

  const [errors, setErrors] = useState<PersonalInfoErrors>(
    {} as PersonalInfoErrors
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedValue: string) => {
    setFormData((prev) => ({ ...prev, title: selectedValue }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, fullName, dob, currentAddress, livedDuration, aboutYou } =
      formData;
    const newErrors: PersonalInfoErrors = {};

    // Required fields check
    if (
      !title ||
      !fullName ||
      !dob ||
      !currentAddress ||
      !livedDuration ||
      !aboutYou
    ) {
      setErrors({ general: "All fields must be filled out" });
      return;
    }

    // Zod validation (Fixed validation fields)
    const validationResult = personalInfoValidation.safeParse({
      title,
      fullName,
      dob,
      currentAddress,
      livedDuration,
      aboutYou,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      newErrors[firstError.path[0] as keyof PersonalInfoErrors] =
        firstError.message;
      setErrors(newErrors);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors & proceed with form submission
    setErrors({});

    try {
      const res = await axios.post("/api/User/PersonalInfo", {
        title,
        fullName,
        dob,
        currentAddress,
        livedDuration,
        aboutYou,
        email,
      });

      console.log(res);

      dispatch(
        setUser({
          title,
          fullName,
          dob,
          currentAddress,
          livedDuration,
          aboutYou,
        })
      );
      dispatch(setSignupStep(2));
      router.push("/signup/2");
    } catch (error) {
      toast.error("Internal server error");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>

      <div className="flex justify-center items-center mt-1">
        <div className="w-full max-w-md p-8">
          <div className="mb-6">
            <Stepper currentStep={1} />
            <h2 className="font-bold text-2xl text-center mt-4">
              Personal Information
            </h2>
            <p className="text-center text-gray-500">
              Please answer questions as accurately as possible.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}

            <div className="space-y-4">
              <div className="flex space-x-4 w-full">
                <DropdownInput
                  options={["Mr", "Mrs", "Miss"]}
                  selected={formData.title}
                  onSelect={handleSelectChange}
                  style={{
                    flex: 1,
                    border: "1px solid #D1D5DB",
                    borderRadius: "0.5rem",
                    padding: "0.89rem",
                    outline: "none",
                    boxShadow: "0 0 0 2px transparent",
                  }}
                />

                <div className="w-full">
                  <FormInput
                    name="fullName"
                    type="text"
                    placeholder="Full Name as per your passport"
                    value={formData.fullName}
                    onChange={handleChange}
                    label="Full Name as per your passport"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>
              </div>

              <FormInput
                name="dob"
                type="date"
                placeholder="Date of birth"
                value={formData.dob}
                onChange={handleChange}
                label="Date of birth"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob}</p>
              )}

              <FormInput
                name="currentAddress"
                type="text"
                placeholder="Current address"
                value={formData.currentAddress}
                onChange={handleChange}
                label="Current address"
              />
              {errors.currentAddress && (
                <p className="text-red-500 text-sm">{errors.currentAddress}</p>
              )}

              <FormInput
                name="livedDuration"
                type="text"
                placeholder="How long have you lived at this address"
                value={formData.livedDuration}
                onChange={handleChange}
                label="Full Name as per your passport"
              />
              {errors.livedDuration && (
                <p className="text-red-500 text-sm">{errors.livedDuration}</p>
              )}

              <textarea
                name="aboutYou"
                value={formData.aboutYou}
                onChange={handleChange}
                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell us a bit about yourself (what are you like as a person, do
              you have any hobbies, etc.)"
              />
              {errors.aboutYou && (
                <p className="text-red-500 text-sm">{errors.aboutYou}</p>
              )}

              <div className="flex text-gray-500">
                <IoMdInformationCircle className="mt-1 w-10" />

                <h6 className="resize-none ">
                  All information can be edited once you have created your
                  account.
                </h6>
              </div>

              <FormButton
                style={{
                  width: "100%",
                  padding: "10px 20px",
                  border: "1px solid ",
                  borderRadius: "8px",
                  background: "#0075FF",
                  color: "#ccc",
                }}
              >
                Save and Continue
              </FormButton>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default PersonalInformation;