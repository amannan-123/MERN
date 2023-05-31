import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Items from "./Components/Items";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import { AuthContext } from "./Contexts/AuthContext";

function App() {
	const {user} = useContext(AuthContext);
	return (
		<div className="flex flex-col h-screen overflow-hidden">
			<Navbar />
			<div className="flex-1 overflow-auto">
				<Routes>
					<Route path="/" element={<Items />} />
					<Route path="/add" element={<Items />} />
					<Route
						path="signin"
						element={
							user == null ? <SignIn /> : <Navigate to="/" />
						}
					/>
					<Route
						path="signup"
						element={
							user == null ? <SignUp /> : <Navigate to="/" />
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
