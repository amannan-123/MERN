import "./App.min.css";
import Items from "./Components/Items";
import { ItemsContextWrapper } from "./Contexts/ItemsContext.js";

function App() {
	return (
		<ItemsContextWrapper>
			<Items />
		</ItemsContextWrapper>
	);
}

export default App;
