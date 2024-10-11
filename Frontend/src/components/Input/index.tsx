import { Icon, IconTypes } from "../Icon";
import { FocusEventHandler, useState } from "react";
import "./input.css";

interface InputProps {
  readOnly?: boolean;
  placeholder: string;
  type: "email" | "password";
  icon?: keyof IconTypes;
  color?: string;
  weight?: "regular" | "bold" | "light" | "thin" | "fill" | "duotone";
  size?: number;
  onChange?: FocusEventHandler<HTMLInputElement>;
  value?: string;
}

export const Input = ({
  readOnly,
  type,
  color,
  weight,
  size,
  icon,
  placeholder,
  onChange,
  value,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="input-div">
      <input
        className="input"
        readOnly={readOnly}
        type={`${showPassword ? "text" : type}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {icon && type !== "password" && (
        <Icon color={color} weight={weight} size={size} icon={icon}></Icon>
      )}
      {type === "password" && (
        <button
          onClick={() =>
            showPassword ? setShowPassword(false) : setShowPassword(true)
          }
          className="button-show-password"
        >
          <Icon
            color={color}
            weight={weight}
            size={size}
            icon={showPassword ? "hide" : "view"}
          ></Icon>
        </button>
      )}
    </div>
  );
};
