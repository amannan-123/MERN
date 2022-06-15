import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ItemsContext = createContext([]);

export function ItemsContextWrapper(props) {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState([]);

	useEffect(() => {
		axios
			.get("/api/items")
			.then((res) => {
				setItems(res.data);
			})
			.catch((err) => {
				console.log(err);
			})
			.then(() => {
				setLoading(false);
			});
	}, []);

	return (
		<>
			<ItemsContext.Provider
				value={[items, setItems, loading, setLoading]}
			>
				{props.children}
			</ItemsContext.Provider>
		</>
	);
}
