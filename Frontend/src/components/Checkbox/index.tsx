import "./checkbox.css";
import { useState } from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange: () => void;
}

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="container-checkbox">
      <input
        type="checkbox"
        checked={checked ? checked : isChecked}
        onChange={onChange}
        onClick={() => (isChecked ? setIsChecked(false) : setIsChecked(true))}
        className={isChecked ? "checked" : "box"}
      />
      <label className="label">{label}</label>
    </div>
  );
};
