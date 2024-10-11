import { Icon, IconTypes } from "../Icon";
import { useState } from "react";
import styled from "styled-components";

const InputStyled = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0px 8px;
	width: 390px;
	height: 35px;
	background-color: #ededf6;
	border: 1px solid #ededf6;
	border-radius: 4px;
	font-size: 1rem;
	transition: all ease-in-out 0.3s;

	input {
		background-color: transparent;
		border: none;
		color: #0a0a15;
		width: 90%;
		font-size: 1rem;

		&:focus {
			outline: none;
		}

		&::placeholder {
			color: #0a0a1579;
		}
	}

	&:hover {
		background-color: #e6e6f5;
		border: 1px solid #e2e2f5;
	}

	&:focus-within {
		background-color: #e0e0f5;
		border: 1px solid #dcdcf5;
	}

	.button-show-password {
		background-color: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.button-show-password:focus {
		outline: none;
	}
`;

interface InputProps {
	readOnly?: boolean;
	placeholder: string;
	type: "email" | "password";
	icon?: keyof IconTypes;
	color?: string;
	weight?: "regular" | "bold" | "light" | "thin" | "fill" | "duotone";
	size?: number;
}

export const Input = ({
	readOnly,
	type,
	color,
	weight,
	size,
	icon,
	placeholder,
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<InputStyled className="input-div">
			<input
				readOnly={readOnly}
				type={`${showPassword ? "text" : type}`}
				placeholder={placeholder}
			/>
			{icon && type !== "password" && (
				<Icon
					color={color}
					weight={weight}
					size={size}
					icon={icon}
				></Icon>
			)}
			{type === "password" && (
				<button
					onClick={() =>
						showPassword
							? setShowPassword(false)
							: setShowPassword(true)
					}
					className="button-show-password"
				>
					<Icon
						color={color}
						weight={weight}
						size={size}
						icon={showPassword ? "view" : "hide"}
					></Icon>
				</button>
			)}
		</InputStyled>
	);
};
