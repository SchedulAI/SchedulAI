import { HomeStyled } from './HomeStyled';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Navbar } from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer';

export const Home = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HomeStyled className="home-div">
      <Navbar />
      <section className="main-section" id="main-section">
        <div className="title-div">
          <h1 className="h1-title">
            Organize-se com a IA e Assuma o Controle do Seu Futuro
          </h1>
        </div>
        <div className="start-now-div">
          <Button onClick={() => navigate('/register')}>
            <p>Começar Agora</p>
          </Button>
          <a
            onClick={() => handleScrollToSection('about-section')}
            className="read-more"
          >
            Ler mais {'>'}
          </a>
        </div>
        <div
          className="div-arrow-down"
          onClick={() => handleScrollToSection('news-section')}
        >
          <Icon icon="arrowDown" size={24} color="#0A0A15" />
        </div>
      </section>
      <section className="news-section" id="news-section">
        <h2>Novidades</h2>
        <div className="div-content">
          <h3>Lançamento do SchedulAI 🎉</h3>
          <p>
            Estamos empolgados em anunciar o lançamento do SchedulAI, a nova
            plataforma de agendamento inteligente que transforma a organização
            de compromissos. Nossa solução utiliza IA avançada para simplificar
            todo o processo, desde a criação de eventos até a coleta automática
            de disponibilidades. Com o SchedulAI, você pode criar, compartilhar
            e gerenciar eventos facilmente, garantindo que todos encontrem o
            melhor horário sem longas trocas de mensagens. Este é apenas o
            começo! Continuaremos a adicionar novos recursos e melhorias para
            uma experiência ainda mais fluida e eficiente. Fique atento para
            mais novidades!
          </p>
        </div>
      </section>
      <section className="about-section" id="about-section">
        <h2>Sobre o SchedulAI</h2>
        <div className="div-content">
          <h3>O que é SchedulAI? 🗓️</h3>
          <p>
            O SchedulAI é uma solução inteligente para agendamento de
            compromissos, desenvolvida para facilitar a coordenação de horários
            de forma simples e eficiente. Utilizando a mais recente tecnologia
            de IA, o <span>SchedulAI</span> permite que você crie e organize
            reuniões sem complicações.
          </p>
        </div>
        <div className="div-about-list">
          <p>Com ele, você pode:</p>
          <ul>
            <li>Criar eventos personalizados rapidamente</li>
            <li>Gerar links de agendamento para compartilhar</li>
            <li>
              Acompanhar automaticamente a disponibilidades dos participantes
            </li>
            <li>Obter respostas em tempo real para decisões rápidas</li>
          </ul>
        </div>
      </section>
      <Footer />
    </HomeStyled>
  );
};
