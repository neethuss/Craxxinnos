import React, { FormEvent, useState } from "react";
import Stepper from "./Stepper";
import Header from "./Header";
import DropdownInput from "./DropdownInput";
import FormInput from "./FornInput";
import FormButton from "./FormButton";
import { financialInfoValidation } from "../utils/validation";
import { FinancialInfoErrors } from "../utils/Types";
import { ToastContainer, toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUser, setSignupStep } from "@/store/userSlice";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
const FinancialInformation = () => {
  const [formData, setFormData] = useState({
    employmentStatus: "",
    additionalSavings: "",
  });

  const email = localStorage.getItem('email') as string

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const [errors, setErrors] = useState<Partial<FinancialInfoErrors>>(
    {} as FinancialInfoErrors
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedValue: string) => {
    setFormData((prev) => ({ ...prev, employmentStatus: selectedValue }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { employmentStatus, additionalSavings } = formData;
    const newErrors: FinancialInfoErrors = {} as FinancialInfoErrors;

    // Required fields check
    if (!employmentStatus || !additionalSavings) {
      setErrors({
        general: "All fields must be filled out",
      } as FinancialInfoErrors);
      return;
    }

    // Zod validation (Fixed validation fields)
    const validationResult = financialInfoValidation.safeParse({
      employmentStatus,
      additionalSavings,
      email,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      newErrors[firstError.path[0] as keyof FinancialInfoErrors] =
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
      const res = await axios.post("/api/User/FinancialInfo", {
        email,
        employmentStatus,
        additionalSavings,
      });

      console.log(res);

      dispatch(
        setUser({
          employmentStatus,
          additionalSavings,
        })
      );
      dispatch(setSignupStep(3));
      router.push("/signup/3");
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

      <div className="flex justify-center items-center mt-10">
        <div className="w-full max-w-md p-8">
          <div className="mb-6">
            <Stepper currentStep={2} />
            <h2 className="font-bold text-2xl text-center mt-4">
              Financial Information
            </h2>
            <p className="text-center text-gray-500">
              All your information is stored securely.{" "}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}

            <div className="space-y-4">
              <DropdownInput
                options={["Employ", "Unemploy", "Student"]}
                selected={formData.employmentStatus}
                onSelect={handleSelectChange}
                style={{
                  width: "100%",
                  padding: "14px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                placeholder="What is your current employment status?"
              />
              <FormInput
                type="text"
                placeholder="Additional savings/investments"
                value={formData.additionalSavings}
                onChange={handleChange}
                label="Additonal savings/investments"
                name="additionalSavings"
              />

              {errors.additionalSavings && (
                <p className="text-red-500 text-sm">
                  {errors.additionalSavings}
                </p>
              )}

              <FormButton
                style={{
                  width: "100%",
                  padding: "10px 20px",
                  border: "1px solid ",
                  borderRadius: "8px",
                  background: "#0075FF",
                  color: "#fff",
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

export default FinancialInformation;