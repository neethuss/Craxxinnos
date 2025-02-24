"use client";

import React, { FormEvent, useState } from "react";
import Header from "./Header";
import FormInput from "./FornInput";
import FormButton from "./FormButton";
import { signupValidation } from "../utils/validation";
import { SignupErrors } from "../utils/Types";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from 'next/link'

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setUser,setSignupStep } from "@/store/userSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const [errors, setErrors] = useState<SignupErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, mobileNumber, password, confirmPassword } = formData;

    if (!email || !mobileNumber || !password || !confirmPassword) {
      setErrors({ general: "All fields must be filled out." });
      return;
    }
    console.log(email, mobileNumber, password, "formdata");
    const newErrors: SignupErrors = {};

    const validationResult = signupValidation.safeParse({
      email,
      mobileNumber,
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      newErrors[firstError.path[0] as keyof SignupErrors] = firstError.message;
      setErrors(newErrors);
      return;
    }

    // Clear errors & proceed with form submission
    setErrors({});

    try {
      const res = await axios.post("/api/User/Signup", {
        email,
        mobileNumber,
        password,
      });
      console.log(res, "res");
      localStorage.setItem('email',email)
      dispatch(setUser({ email, mobileNumber, password }));
      dispatch(setSignupStep(1))
      toast.success("Account created successfully"); 
      setTimeout(() => {
        router.push('/signup/1');
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 400:
            toast.error(
              "Account already exists with the email or phone number"
            );
            break;
        }
      } else {
        toast.error("Unexpected error occured");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex justify-center items-center mt-10">
        <div className="w-full max-w-md">
          <h1 className="text-xl text-center font-bold">Create your account</h1>
          <h6 className="text-center mb-8 text-gray-500">
            Set-up your RentlyPass in as little as 2 minutes
          </h6>

          <form onSubmit={handleSubmit}>
            {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

            <div className="space-y-4">
              <h4>Contact details</h4>
              <FormInput
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <FormInput
                type="number"
                name="mobileNumber"
                placeholder="Mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
              />

              <h4>Set password</h4>
              <FormInput
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}

              <p className="text-gray-500">
                We need a password to keep your information safe. But don&apos;t
                worry, we&apos;ll also send your custom RentlyPass URL via
                email.
              </p>

              <FormButton
                style={{
                  width: "100%",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  background: "#0075FF",
                  color: "#fff",
                }}
              >
                Create your account
              </FormButton>

              <p className="text-gray-500">
                By clicking &apos;Create your account&apos;, you agree to our
                <Link href='' className="underline">Terms & Conditions</Link> and <Link href='' className="underline">Privacy Policy</Link>.
              </p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />

    </div>
  );
};

export default Signup;