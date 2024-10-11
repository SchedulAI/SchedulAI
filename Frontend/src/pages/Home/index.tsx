import styled from "styled-components";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";

const HomeStyled = styled.div`
	.main-section {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.title-div {
			width: 1090px;
			h1 {
				font-size: 4.21rem;
				text-align: center;
				color: #000000;
			}
		}

		.start-now-div {
			display: flex;
			gap: 1rem;
			align-items: center;
			justify-content: center;

			a {
				color: #0a0a15;
			}
		}

		.div-arrow-down {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			bottom: 60px;
			border-radius: 100%;
			height: 50px;
			width: 50px;
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
			transition: all ease-in-out 0.4s;
		}

		.div-arrow-down:hover {
			background-color: #7d79e6;
		}
	}

	.news-section {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		justify-content: center;

		.div-title {
			display: flex;
			align-items: center;
			flex-direction: column;
			gap: 1rem;

			h2 {
				font-size: 3.16rem;
				color: #0a0a15;
			}

			h4 {
				font-size: 2.37rem;
				color: #0a0a15;
			}
		}
		p {
			color: #0a0a15;
			max-width: 35%;
		}
	}

	.about-section {
		height: 100vh;
		color: #0a0a15;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;

		.div-title {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			align-self: center;
			width: 35%;
			text-align: left;
			gap: 1rem;
			padding: 2px;

			h2 {
				font-size: 3.16rem;
				color: #0a0a15;
			}

			h4 {
				font-size: 2.37rem;
				color: #0a0a15;
			}
		}

		.div-about-title h2 {
			display: flex;
			flex-direction: row;
		}

		.div-about-title h2 > span {
			display: flex;
			align-items: center;
		}

		.div-about-title p > span {
			font-weight: 700;
		}

		.div-about-list {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			align-self: center;
			width: 35%;
			text-align: left;
			gap: 10px;
			padding: 2px;
		}

		.div-about-list p {
			font-size: 1.2rem;
			font-weight: 700;
		}

		.div-about-list ul {
			list-style-type: circle;
			padding: 0;
		}

		.div-about-end {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			align-self: center;
			width: 30%;
			text-align: left;
			gap: 10px;
			padding: 2px;
		}
	}
`;

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
		<HomeStyled className="home-div">
			<section className="main-section">
				<div className="title-div">
					<h1 className="h1-title">
						Organize-se com a IA e Assuma o Controle do Seu Futuro
					</h1>
				</div>
				<div className="start-now-div">
					<Button onClick={() => console.log("Opa")}>
						<p>Começar Agora</p>
					</Button>
					<a
						onClick={() => smoothScrollTo(1200, 1000)}
						className="read-more"
					>
						Ler mais {">"}
					</a>
				</div>
				<div
					className="div-arrow-down"
					onClick={() => smoothScrollTo(500, 1000)}
				>
					<Icon icon="arrowDown" size={24} color="#0A0A15" />
				</div>
			</section>
			<section className="news-section" id="#news-section">
				<div className="div-title">
					<h2>Novidades</h2>
					<h4>
						Lançamento do SchedulAI
						<span>
							<Icon icon="robot" weight="fill" />
						</span>
						!
					</h4>
				</div>
				<p>
					Estamos empolgados em anunciar o lançamento oficial do
					schedulAI, a mais nova plataforma de agendamento
					inteligente, projetada para revolucionar a forma como você
					organiza seus compromissos. Nossa solução utiliza IA
					avançada para simplificar todo o processo de agendamento,
					desde a criação de eventos até a coleta automática de
					disponibilidades. Com o <span>SchedulAI</span>, você pode
					criar, compartilhar e gerenciar eventos com facilidade,
					garantindo que todos os participantes encontrem o melhor
					horário sem a necessidade de longas trocas de mensagens.
					Este é apenas o começo! Estamos constantemente trabalhando
					em novos recursos e melhorias para tornar sua experiência
					ainda mais fluida e eficiente. Fique de olho, pois muitas
					novidades ainda estão por vir!
				</p>
			</section>
			<section className="about-section" id="about-section">
				<div className="div-title">
					<h2>
						Sobre o SchedulAI
						<span>
							<Icon icon="robot" weight="fill" />
						</span>
					</h2>
					<p>
						O schedulAI é uma solução inteligente para agendamento
						de compromissos, desenvolvida para facilitar a
						coordenação de horários de forma simples e eficiente.
						Utilizando a mais recente tecnologia de IA, o{" "}
						<span>SchedulAI</span> permite que você crie e organize
						reuniões sem complicações.
					</p>
				</div>
				<div className="div-about-list">
					<p>Com ele, você pode:</p>
					<ul>
						<li>Criar eventos personalizados rapidamente;</li>
						<li>
							Gerar links de agendamento para compartilhar com
							seus convidados;
						</li>
						<li>
							Coletar as disponibilidades de todos os
							participantes de forma automática;
						</li>
						<li>
							Receber respostas em tempo real para tomar decisões
							rápidas.
						</li>
					</ul>
				</div>
				<div className="div-about-end">
					<p>
						Nossa plataforma oferece uma experiência fluida para
						todos os envolvidos, com foco em otimizar seu tempo e
						melhorar a produtividade. Deixe que o SchedulAI cuide da
						parte burocrática, enquanto você se concentra no que
						realmente importa!
					</p>
				</div>
			</section>
		</HomeStyled>
	);
};
