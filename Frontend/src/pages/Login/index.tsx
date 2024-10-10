import { useState } from "react";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";
import "./style.css";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
        console.log("logado")
      } else {
        console.log("Deu error")
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };
  return (
    <div className="login-main-div">
      <div className="btn-back-div">
        <Button onClick={() => console.log("opa")}>
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
          <Checkbox label="Lembrar-me" onChange={() => console.log("opa")} />
          <a id="forget-password">
            Esqueceu a senha? <span>Recupere agora</span>
          </a>
        </div>
        <div className="login-enter-register-div">
          <Button onClick={() => loginFetch()}>Entrar</Button>
          <a id="login-a-create-account">
            Não tem uma conta? <span>Registre-se</span>
          </a>
        </div>
      </div>
    </div>
  );
};
