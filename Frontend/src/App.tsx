import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import { AppRoutes } from "./routes/routes";

const App = () => {
	return (
		<UserProvider>
			<Router>
				<AppRoutes />
			</Router>
		</UserProvider>
	);
};

export default App;
