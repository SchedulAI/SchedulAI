interface InputProps {
  readOnly?: boolean;
  placeholder: string;
  type: 'email' | 'password' | 'text';
  icon?: keyof IconTypes;
  color?: string;
  weight?: 'regular' | 'bold' | 'light' | 'thin' | 'fill' | 'duotone';
  size?: number;
  onChange?: FocusEventHandler<HTMLInputElement>;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
