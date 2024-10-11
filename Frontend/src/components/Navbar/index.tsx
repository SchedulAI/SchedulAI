import styled from "styled-components";
import { Icon } from "../Icon";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

const NavbarStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;
	position: fixed;
	background: #f8f8fc;
	width: 100%;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
		rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	z-index: 100;

	.logo {
		display: flex;
		align-items: center;
		color: #0a0a15;
		gap: 0.5rem;
		user-select: none;
		cursor: pointer;
	}

	.nav {
		ul {
			display: flex;
			gap: 4rem;

			padding: 0;
			li {
				list-style: none;

				a {
					font-weight: 500;
				}
			}
		}
	}

	.buttons {
		display: flex;
		align-items: center;
		gap: 2rem;

		p {
			font-weight: 400;
		}
	}
`;

export const Navbar = () => {
	const navigate = useNavigate();
	const handleScrollToSection = (sectionId: string) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<NavbarStyled>
			<div
				className="logo"
				onClick={() => {
					handleScrollToSection('main-section')
				}}
			>
				<Icon icon="robot" weight="fill" size={32} color="#0A0A15" />
				<p>SchedulAI</p>
			</div>
			<nav className="nav">
				<ul>
					<li>
						<a
							onClick={() => {
								handleScrollToSection("main-section");
							}}
						>
							Inicio
						</a>
					</li>
					<li>
						<a
							onClick={() => {
								handleScrollToSection("news-section");
							}}
						>
							Novidades
						</a>
					</li>
					<li>
						<a
							onClick={() => {
								handleScrollToSection("about-section");
							}}
						>
							Sobre
						</a>
					</li>
				</ul>
			</nav>
			<div className="buttons">
				<a
					onClick={() => {
						navigate("/login");
					}}
				>
					Entrar
				</a>
				<Button
					onClick={() => {
						navigate("/register");
					}}
				>
					<p>Registrar</p>
				</Button>
			</div>
		</NavbarStyled>
	);
};
