import { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";
import { useUser } from "../../hooks/userHooks";
import "./style.css";
import { useNavigate } from "react-router-dom";

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
    <div className="login-main-div">
      <div className="btn-back-div">
        <Button onClick={() => navigate("/home")}>
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
          <Button onClick={() => loginFetch()}>Entrar</Button>
          <a id="login-a-create-account">
            Não tem uma conta? <span>Registre-se</span>
          </a>
        </div>
      </div>
    </div>
  );
};
