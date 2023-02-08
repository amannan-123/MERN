import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from "../Contexts/ThemeContext";

export default function Navbar() {
	const [darkTheme, setDarkTheme] = useContext(ThemeContext);
	const [user, setUser] = useContext(AuthContext);
	const handleMode = () => setDarkTheme(!darkTheme);
	return (
		<div className="flex items-center justify-between p-3 bg-white dark:bg-black">
			<Link className="text-2xl dark:text-white text-black" to="/">Items List</Link>
			<div className="flex gap-3 items-center">
				{user ?
					<button
						className="text-black dark:text-white underline"
						onClick={() => {
							setUser(null);
						}}>Logout</button>
					:
					<Link className="text-black dark:text-white underline" to="/signin">Login</Link>
				}
				<Link className="text-black dark:text-white underline" to="/signup">Signup</Link>
				<button
					className="p-2 text-sm rounded-lg bg-white text-black border hover:bg-[#cecece] border-black dark:text-white dark:bg-[#1c1c1c] dark:hover:bg-[#353535]"
					onClick={handleMode}
				>
					{darkTheme ? "Light Mode" : "Dark Mode"}
				</button>
			</div>
		</div>
	);
}
