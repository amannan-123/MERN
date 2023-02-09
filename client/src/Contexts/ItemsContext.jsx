import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const ItemsContext = createContext([]);

export function ItemsContextWrapper(props) {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState([]);
	const [searchParams] = useSearchParams();
	const [user] = useContext(AuthContext);

	useEffect(() => {

		setLoading(true);

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
					console.log(err);
				})
				.then(() => {
					setLoading(false);
				});

		} else {
			setItems([]);
			setLoading(false);
		}

	}, [searchParams, user]);

	return (
		<ItemsContext.Provider value={[items, setItems, loading, setLoading]}>
			{props.children}
		</ItemsContext.Provider>
	);
}
