import { useState } from 'react';
import { CheckboxStyled } from './CheckboxStyled';

export const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <CheckboxStyled className="container-checkbox">
      <input
        id="myCheckbox"
        type="checkbox"
        checked={checked ? checked : isChecked}
        onChange={onChange}
        onClick={() => (isChecked ? setIsChecked(false) : setIsChecked(true))}
        className={isChecked ? 'checked' : 'box'}
      />
      <label htmlFor="myCheckbox" className="label">
        {label}
      </label>
    </CheckboxStyled>
  );
};
