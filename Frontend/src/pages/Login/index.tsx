import { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";
import { useUser } from "../../hooks/userHooks";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16px;
	width: 100%;
	height: 100%;
	position: relative;
	color: #0a0a15;

	.btn-back-div {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 8px;
		top: 0;
		left: 0;
		padding: 8px;
	}

	.login-div-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		width: 100%;
		height: 100%;
	}

	.login-title-div {
		width: 390px;
		text-align: left;

		h1 {
			font-size: 3.16rem;
			font-weight: 600;
		}

		span {
			font-size: 1rem;
			font-weight: 400;
			color: #0a0a15;
			opacity: 50%;
		}
	}

	.login-field {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		width: 100%;
	}

	.input-email,
	.input-password {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: fit-content;
		gap: 8px;
	}

	.input-email label,
	.input-password label {
		padding-left: 4px;
		font-weight: 500;
	}

	.login-remember-me-div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 390px;
		font-size: 0.875rem;
	}

	#forget-password {
		font-size: 0.875rem;
	}

	#forget-password span {
		font-weight: 500;
	}

	.login-enter-register-div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 390px;
	}

	#login-a-create-account {
		font-size: 0.875rem;
	}

	#login-a-create-account span {
		font-weight: 500;
	}
`;

export const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [rememberMe, setRememberMe] = useState<boolean>(false);
	const { setUser } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		const savedEmail = localStorage.getItem("email");
		const savedPassword = localStorage.getItem("password");
		if (savedEmail && savedPassword) {
			setEmail(savedEmail);
			setPassword(savedPassword);
			setRememberMe(true);
		}
	}, []);

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	const loginFetch = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			const data = await response.json();

			if (data.auth) {
				console.log("logado");
				setUser(email);
				if (rememberMe) {
					localStorage.setItem("email", email);
					localStorage.setItem("password", password);
				} else {
					localStorage.removeItem("email");
					localStorage.removeItem("password");
				}
				navigate("/home");
			} else {
				console.log("Deu error");
			}
		} catch (error) {
			console.error("Erro ao fazer login", error);
		}
	};

	return (
		<LoginStyled className="login-main-div">
			<div className="btn-back-div">
				<Button onClick={() => navigate("/")}>
					<Icon icon="back" size={18} weight="fill" color="#0A0A15" />
					<span>Voltar</span>
				</Button>
			</div>
			<div className="login-div-section">
				<div className="login-title-div">
					<h1>Bem-Vindo De volta 👋</h1>
					<span>Insira seu email e senha para acessar sua conta</span>
				</div>
				<div className="login-field">
					<div className="input-email">
						<label>Email</label>
						<Input
							type="email"
							placeholder="Insira Seu Email"
							icon="mail"
							color="#0a0a1579"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-password">
						<label>Senha</label>
						<Input
							type="password"
							placeholder="Insira sua senha"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							color="#0a0a1579"
						/>
					</div>
				</div>
				<div className="login-remember-me-div">
					<Checkbox
						label="Lembrar-me"
						checked={rememberMe}
						onChange={handleRememberMeChange}
					/>
					<a id="forget-password">
						Esqueceu a senha? <span>Recupere agora</span>
					</a>
				</div>
				<div className="login-enter-register-div">
					<Button width="full" onClick={() => loginFetch()}>
						Entrar
					</Button>
					<a id="login-a-create-account">
						Não tem uma conta? <span>Registre-se</span>
					</a>
				</div>
			</div>
		</LoginStyled>
	);
};
