import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GlobalStyle } from "./styles/globalStyles.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GlobalStyle />
		<App />
	</StrictMode>
);
