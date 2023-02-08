import { createContext } from "react";
import useAuth from "../Hooks/useAuth";

export const AuthContext = createContext([]);

export function AuthContextWrapper(props) {
	const [user, setUser] = useAuth();

	return (
		<AuthContext.Provider value={[user, setUser]}>
			{props.children}
		</AuthContext.Provider>
	);
}
