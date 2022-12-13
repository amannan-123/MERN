import { createContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const ItemsContext = createContext([]);

export function ItemsContextWrapper(props) {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setLoading(true);
		var url = "/api/items";
		if (searchParams.get("search"))
			url += "?search=" + searchParams.get("search");

		axios
			.get(url)
			.then((res) => {
				setItems(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.then(() => {
				setLoading(false);
			});
	}, [searchParams]);

	return (
		<ItemsContext.Provider value={[items, setItems, loading, setLoading]}>
			{props.children}
		</ItemsContext.Provider>
	);
}
