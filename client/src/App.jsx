import "./index.css";
import Navbar from "./Components/Navbar";
import Items from "./Components/Items";
import { ItemsContextWrapper } from "./Contexts/ItemsContext.js";
import { ThemeContextWrapper } from "./Contexts/ThemeContext.js";

function App() {
	return (
		<ThemeContextWrapper>
			<ItemsContextWrapper>
				<Navbar />
				<Items />
			</ItemsContextWrapper>
		</ThemeContextWrapper>
	);
}

export default App;
