import { IFormInput } from "@/utils/Types";
import React, { useState } from "react";

const FormInput: React.FC<IFormInput> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().trim() !== '';
  const isDateInput = type === "date";

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={()=>setIsFocused(false)}
        className="w-full px-3 py-3 text-base border rounded transition-all duration-200 focus:outline-none focus:ring-1 focus:border-blue-500"
        placeholder=''
        name={name}
      />
      <label
        className={`absolute left-3 transition-all duration-200 pointer-events-none
            ${
              isFocused || hasValue || isDateInput
                ? "text-xs -top-2 bg-white px-1 text-blue-500"
                : "text-gray-500 top-3"
            }`}
      >
        {placeholder || label}
      </label>
    </div>
  );
};

export default FormInput;
