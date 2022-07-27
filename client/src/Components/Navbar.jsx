import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function Navbar() {
	const [darkTheme, setDarkTheme] = useContext(ThemeContext);
	const handleMode = () => setDarkTheme(!darkTheme);
	return (
		<div className="flex items-center justify-between p-3 bg-white dark:bg-black">
			<h1 className="text-2xl dark:text-white text-black">Items List</h1>
			<button
				className="p-2 text-sm rounded-lg bg-white text-black border hover:bg-[#cecece] border-black dark:text-white dark:bg-[#1c1c1c] dark:hover:bg-[#353535]"
				onClick={handleMode}
			>
				{darkTheme ? "Light Mode" : "Dark Mode"}
			</button>
		</div>
	);
}
