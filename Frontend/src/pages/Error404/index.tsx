import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "../../components/Icon";
import { StyledError404 } from "./StyledError404";

export const Error404 = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <StyledError404 className="error-404">
      <h1>
        SchedulAI
        <span>
          <Icon icon="robot" weight="fill" />
        </span>
      </h1>
      <h2>Ops... Parece que essa página não existe</h2>
      <p>Você será redirecionado para a página inicial em {count} segundos...</p>
    </StyledError404>
  );
};