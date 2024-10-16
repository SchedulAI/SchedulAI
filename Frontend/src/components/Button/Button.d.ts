interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  width?: 'full' | 'fit';
  children: ReactNode;
}
