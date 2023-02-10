import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ItemsContextWrapper } from "./Contexts/ItemsContext";
import { ThemeContextWrapper } from "./Contexts/ThemeContext";
import { AuthContextWrapper } from "./Contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
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
