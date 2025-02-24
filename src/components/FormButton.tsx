import { IFormButton } from "@/utils/Types";
import React from "react";

const FormButton: React.FC<IFormButton> = ({
  children,
  onClick,
  disabled,
  style,
 
}) => {
  return (
    <div>
      <button type='submit' onClick={onClick} disabled={disabled} style={style}>
        {children}
      </button>
    </div>
  );
};

export default FormButton;
