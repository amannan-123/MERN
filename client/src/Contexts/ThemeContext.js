import { createContext } from "react";
import useDarkMode from "../hooks/useDarkMode";

export const ThemeContext = createContext([]);

export function ThemeContextWrapper(props) {
	const [darkTheme, setDarkTheme] = useDarkMode();

	return (
		<>
			<ThemeContext.Provider value={[darkTheme, setDarkTheme]}>
				{props.children}
			</ThemeContext.Provider>
		</>
	);
}
