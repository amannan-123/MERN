import "./index.css";
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Items from "./Components/Items";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { ItemsContextWrapper } from "./Contexts/ItemsContext.js";
import { ThemeContextWrapper } from "./Contexts/ThemeContext.js";

function App() {
	return (
		<BrowserRouter>
			<ThemeContextWrapper>
				<ItemsContextWrapper>
					<Routes>
						<Route path="/" element={<Items />} />
						<Route path="signin" element={<SignIn />} />
						<Route path="signup" element={<SignUp />} />
					</Routes>
				</ItemsContextWrapper>
			</ThemeContextWrapper>
		</BrowserRouter>
	);
}

export default App;
