import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const ItemsContext = createContext([]);

export function ItemsContextWrapper(props) {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState([]);
	const [error, setError] = useState("");
	const [searchParams] = useSearchParams();
	const [user] = useContext(AuthContext);

	useEffect(() => {

		setLoading(true);
		setError("");

		if (user != null) {

			var url = "/api/items";

			var config = {
				headers: { Authorization: `Bearer ${user.token}` },
			};

			if (searchParams.get("search"))
				config.params = { search: searchParams.get("search") };

			axios
				.get(url, config)
				.then((res) => {
					setItems(res.data);
				})
				.catch((err) => {
					setError(err.response.data.message)
				})
				.then(() => {
					setLoading(false);
				});

		} else {
			setError("You must be logged in to view items.");
			setItems([]);
			setLoading(false);
		}

	}, [searchParams, user]);

	return (
		<ItemsContext.Provider value={[items, setItems, loading, setLoading, error, setError]}>
			{props.children}
		</ItemsContext.Provider>
	);
}
