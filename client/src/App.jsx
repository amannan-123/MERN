import "./index.css";
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import Items from "./Components/Items";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { ItemsContextWrapper } from "./Contexts/ItemsContext";
import { ThemeContextWrapper } from "./Contexts/ThemeContext";
import { AuthContextWrapper } from "./Contexts/AuthContext";

function App() {
	return (
		<BrowserRouter>
			<ThemeContextWrapper>
				<AuthContextWrapper>
					<ItemsContextWrapper>
						<Routes>
							<Route path="/" element={<Items />} />
							<Route path="signin" element={<SignIn />} />
							<Route path="signup" element={<SignUp />} />
						</Routes>
					</ItemsContextWrapper>
				</AuthContextWrapper>
			</ThemeContextWrapper>
		</BrowserRouter>
	);
}

export default App;
