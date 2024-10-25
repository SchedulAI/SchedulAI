import { StyledButton } from './StyledButton';

export const Button = ({
  onClick,
  disabled,
  width = 'fit',
  children,
}: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      {...(disabled && { disabled })}
      width={width}
    >
      {children}
    </StyledButton>
  );
};
