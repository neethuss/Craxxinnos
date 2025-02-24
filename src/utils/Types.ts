export interface IFormInput {
  label?: string;
  type?: "text" | "number" | "date" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string
}

export interface IFormButton {
  children: React.ReactNode;
  onClick?: () => void
  disabled?: boolean
  style?: React.CSSProperties

}

export interface IStepper {
  currentStep: number
}

export interface IDropdownInput {
  options: string[]
  selected: string
  onSelect: (value: string) => void
  style: React.CSSProperties
  placeholder?: string
}

export interface SignupErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string
}

export interface PersonalInfoErrors {
  title?: string;
  fullName?: string;
  dob?: string;
  currentAddress?: string;
  livedDuration?: string;
  aboutYou?: string;
  general?: string;
}

export interface FinancialInfoErrors{
  employmentStatus: string;
  additionalSavings: string
  general:string
}

export interface UserType {
  fullName: string;
  email: string;
  dob: string;
  currentAddress: string;
}