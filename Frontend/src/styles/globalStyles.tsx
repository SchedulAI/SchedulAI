import { createGlobalStyle } from "styled-components";

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

button {
	border-radius: 8px;
	border: 1px solid transparent;
	padding: 0.6em 1.2em;
	font-size: 1em;
	font-weight: 500;
	font-family: inherit;
	background-color: #1a1a1a;
	cursor: pointer;
	transition: border-color 0.25s;
}

button:hover {
	border-color: #646cff;
}

button:focus,
button:focus-visible {
	outline: 4px auto -webkit-focus-ring-color;
}

h1, h2, h3, h4, p {
	margin: 0;
	width: fit-content;
}
`;

export { GlobalStyle };
