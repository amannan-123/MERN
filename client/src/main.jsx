import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ItemsContextWrapper } from "./Contexts/ItemsContext";
import { ThemeContextWrapper } from "./Contexts/ThemeContext";
import { AuthContextWrapper } from "./Contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextWrapper>
				<ItemsContextWrapper>
					<ThemeContextWrapper>
						<App />
					</ThemeContextWrapper>
				</ItemsContextWrapper>
			</AuthContextWrapper>
		</BrowserRouter>
	</React.StrictMode>
);
