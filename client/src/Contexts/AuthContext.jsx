import { createContext } from "react";
import useAuth from "../Hooks/useAuth";

export const AuthContext = createContext([]);

export function AuthContextWrapper(props) {
	const [user, setUser] = useAuth();

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
}
