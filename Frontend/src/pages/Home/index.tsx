import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";
import "./style.css";

export const Home = () => {
  const smoothScrollTo = (endY: number, duration: number) => {
    const startY = window.scrollY;
    if (startY === endY) return;
    const distanceY = endY - startY;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      window.scrollTo(0, startY + distanceY * percent);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div className="home-div">
      <section className="main-section">
        <div className="title-div">
          <h1 className="h1-title">
            Organize-se com a IA e Assuma o Controle do Seu Futuro
          </h1>
        </div>
        <div className="start-now-div">
          <Button onClick={() => console.log("Opa")}>Começar Agora</Button>
          <a onClick={() => smoothScrollTo(1200, 1000)} className="read-more">
            Ler mais {">"}
          </a>
          <div
            className="div-arrow-down"
            onClick={() => smoothScrollTo(500, 1000)}
          >
            <Icon icon="arrowDown" size={24} color="#0A0A15" />
          </div>
        </div>
      </section>
      <section className="news-section" id="#news-section">
        <div className="div-news-title">
          <h2>Novidades</h2>
        </div>
        <div className="div-news-subtitle">
          <h3>
            Lançamento do SchedulAI
            <span>
              <Icon icon="robot" weight="fill" />
            </span>
            !
          </h3>
        </div>
        <div className="div-news-end">
          <p>
            Estamos empolgados em anunciar o lançamento oficial do schedulAI, a
            mais nova plataforma de agendamento inteligente, projetada para
            revolucionar a forma como você organiza seus compromissos. Nossa
            solução utiliza IA avançada para simplificar todo o processo de
            agendamento, desde a criação de eventos até a coleta automática de
            disponibilidades. Com o <span>SchedulAI</span>, você pode criar,
            compartilhar e gerenciar eventos com facilidade, garantindo que
            todos os participantes encontrem o melhor horário sem a necessidade
            de longas trocas de mensagens. Este é apenas o começo! Estamos
            constantemente trabalhando em novos recursos e melhorias para tornar
            sua experiência ainda mais fluida e eficiente. Fique de olho, pois
            muitas novidades ainda estão por vir!
          </p>
        </div>
      </section>
      <section className="about-section" id="about-section">
        <div className="div-about-title">
          <h2>
            Sobre o SchedulAI
            <span>
              <Icon icon="robot" weight="fill" />
            </span>
          </h2>
          <p>
            O schedulAI é uma solução inteligente para agendamento de
            compromissos, desenvolvida para facilitar a coordenação de horários
            de forma simples e eficiente. Utilizando a mais recente tecnologia
            de IA, o <span>SchedulAI</span> permite que você crie e organize
            reuniões sem complicações.
          </p>
        </div>
        <div className="div-about-list">
          <p>Com ele, você pode:</p>
          <ul>
            <li>Criar eventos personalizados rapidamente;</li>
            <li>
              Gerar links de agendamento para compartilhar com seus convidados;
            </li>
            <li>
              Coletar as disponibilidades de todos os participantes de forma
              automática;
            </li>
            <li>
              Receber respostas em tempo real para tomar decisões rápidas.
            </li>
          </ul>
        </div>
        <div className="div-about-end">
          <p>
            Nossa plataforma oferece uma experiência fluida para todos os
            envolvidos, com foco em otimizar seu tempo e melhorar a
            produtividade. Deixe que o SchedulAI cuide da parte burocrática,
            enquanto você se concentra no que realmente importa!
          </p>
        </div>
      </section>
    </div>
  );
};
