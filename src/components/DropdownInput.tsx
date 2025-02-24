import React from "react";
import { IDropdownInput } from "../utils/Types";

const DropdownInput: React.FC<IDropdownInput> = ({
  options,
  selected,
  onSelect,
  style,
  placeholder
}) => {
  return (
    
    <div>
      <select value={selected} onChange={(e) => onSelect(e.target.value)} style={style}>
      {placeholder && <option value="" disabled>{placeholder}</option>}

        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
