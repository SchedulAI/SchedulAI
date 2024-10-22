import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	font-family: "Inter", serif;
}

#root {
	height: 100vh;
	width: 100vw;
}

.container-app{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 20px;
}

a {
	color: #0a0a15;
	text-decoration: none;
	cursor: pointer;
	transition: color 0.3s ease-in-out, border 0.3s ease-in-out;
	padding: 2px;
	position: relative;
}

a::after {
	content: '';
	position: absolute;
	width: 0;
	height: 2px;
	background-color: #4944ca;
	left: 0;
	bottom: 0;
	transition: width 0.4s ease-in-out;
}

a:hover {
	color: #4944ca;
}

a:hover::after {
	width: 100%;
}

body {
	margin: 0;
	display: flex;
	place-items: center;
	min-width: 320px;
	min-height: 100vh;
}

h1 {
	font-size: 3.2em;
}

h1, h2, h3, h4, p {
	margin: 0;
	width: fit-content;
	color: #0a0a15;
}

p {
	line-height: 1.5rem;
}
`;

export { GlobalStyle };
