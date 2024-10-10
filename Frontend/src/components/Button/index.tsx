import './button.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

export const Button = ({ children, onClick, disabled }: ButtonProps) => {
    return (
        <button onClick={onClick} disabled={disabled} className='button'>
            {children}
        </button>
    );
}