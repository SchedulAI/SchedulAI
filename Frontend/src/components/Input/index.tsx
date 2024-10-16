import { Icon } from '../Icon';
import { useState } from 'react';
import { InputStyled } from './InputStyled';

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
  onKeyDown,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputStyled className="input-div">
      <input
        readOnly={readOnly}
        type={`${showPassword ? 'text' : type}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
      />
      {icon && type !== 'password' && (
        <Icon color={color} weight={weight} size={size} icon={icon}></Icon>
      )}
      {type === 'password' && (
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
            icon={showPassword ? 'view' : 'hide'}
          ></Icon>
        </button>
      )}
    </InputStyled>
  );
};
