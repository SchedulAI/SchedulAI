import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";
import styled from "styled-components";

const RegisterStyled = styled.div`
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

	.register-div-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		width: 100%;
		height: 100%;
	}

	.register-title-div {
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

	.register-field {
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

	.register-remember-me-div {
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

	.register-enter-register-div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 390px;
	}

	#register-a-create-account {
		font-size: 0.875rem;
	}

	#register-a-create-account span {
		font-weight: 500;
	}
`;

export const Register = () => {
	const navigate = useNavigate();

	return (
		<RegisterStyled className="register-main-div">
			<div className="btn-back-div">
				<Button onClick={() => navigate("/")}>
					<Icon icon="back" size={18} weight="fill" color="#0A0A15" />
					<span>Voltar</span>
				</Button>
			</div>
			<div className="register-div-section">
				<div className="register-title-div">
					<h1>Pronto para começar? 👋</h1>
					<span>Insira seu email e senha para criar sua conta</span>
				</div>
				<div className="register-field">
					<div className="input-email">
						<label>Email</label>
						<Input
							type="email"
							placeholder="Insira Seu Email"
							icon="mail"
							color="#0a0a1579"
						/>
					</div>
					<div className="input-password">
						<label>Senha</label>
						<Input
							type="password"
							placeholder="Insira sua senha"
							color="#0a0a1579"
						/>
					</div>
				</div>
				<div className="register-enter-register-div">
					<Button width="full" onClick={() => {}}>
						Registrar
					</Button>
					<a id="register-a-create-account">
						Já possui uma conta? <span>Acesse agora</span>
					</a>
				</div>
			</div>
		</RegisterStyled>
	);
};
