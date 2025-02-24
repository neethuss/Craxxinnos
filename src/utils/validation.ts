//validations for all form fileds

import { z } from 'zod';

export const signupValidation = z.object({
  email: z
    .string()
    .trim()
    .nonempty('Email is required')
    .email('Invalid email format'),

  mobileNumber: z
    .string()
    .trim()
    .nonempty('Mobile number is required')
    .min(10,'Invalid mobile number')
    .regex(/^\d+$/, { message: "Mobile number must contain only digits" }),

  password: z
    .string()
    .trim()
    .nonempty('Password cannot be empty')
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contains alteast one upper case')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[a-zA-Z0-9]/, 'Password must contain letters and numbers'),

  confirmPassword: z
    .string()
    .trim()
    .nonempty('Confirm password is required')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});



export const personalInfoValidation = z.object({
  title: z
    .string()
    .trim()
    .nonempty('Email is required'),

  fullName: z
    .string()
    .nonempty('Name is required')
    .regex(/^[a-zA-Z]+$/, 'Name should contain letters only'),

  currentAddress: z
    .string()
    .nonempty('Address cannot be empty'),
    dob: z
    .string()
    .nonempty("Date of birth is required")
    .refine((val) => {
      const date = new Date(val);
      // Check that it's a valid date and not in the future
      return !isNaN(date.getTime()) && date <= new Date();
    }, { message: "Please enter a valid date of birth." }),

  livedDuration: z
    .string()
    .nonempty('This field is required')
    .regex(/^\d+$/,'Enter lived duration in years(contains numbers only)')
    .max(120,'Enter valid lived duration'),

    aboutYou:z
    .string()
    .nonempty('This field is required')
});


export const financialInfoValidation = z.object({
  employmentStatus: z
    .string()
    .trim()
    .nonempty('Email is required'),

  additionalSavings: z
    .string()
    .nonempty('Name is required')
    .regex(/^\d+$/,'Savings amount only contains numbers'),

});