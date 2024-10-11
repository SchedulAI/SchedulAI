import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Checkbox } from "./components/Checkbox";
import { Card } from "./components/Card";

function App() {
	return (
		<div className="container-app">
			<Button
				onClick={() => alert("Hello, world!")}
				width="full"
				label="Click Me"
			/>
			<Input
				readOnly={false}
				type="email"
				placeholder="Insira seu email"
				icon="mail"
				color="#0a0a1579"
				size={16}
			/>
			<Input
				readOnly={false}
				type="password"
				placeholder="Insira sua senha"
				icon="mail"
				color="#0a0a1579"
				size={16}
			/>
			<Checkbox
				label="Aceita os termos e condições?"
				onChange={() => console.log("opa")}
			></Checkbox>
			<Card
				data="10/10/2024 - 17h00"
				status="Pendente"
				subject="Reunião importante com o RH"
			></Card>
		</div>
	);
}

export default App;
