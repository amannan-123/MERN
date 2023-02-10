import { useState, useContext } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { ItemsContext } from "../Contexts/ItemsContext";
import { AuthContext } from "../Contexts/AuthContext";

function AddItem(props) {
	const [items, setItems] = useContext(ItemsContext);
	const [user] = useContext(AuthContext);

	const [itemName, setItemName] = useState("");
	const [itemPrice, setItemPrice] = useState(1);

	const [adding, setAdding] = useState(false);
	const [error, setError] = useState("");

	const addFormSubmit = (e) => {
		e.preventDefault();

		setError("");

		if (itemName.trim().length > 0) {

			setAdding(true);

			var newItem = { name: itemName, price: itemPrice };

			var config = {};

			if (user) {
				config.headers = {
					Authorization: `Bearer ${user.token}`,
				};
			}

			axios
				.post("/api/items", newItem, config)
				.then((res) => {
					setItems([res.data, ...items]);
					setItemName("");
					setItemPrice(1);
					props.closeModal(null);
					setError("");
				})
				.catch((err) => {
					setError(err.response.data.message);
				})
				.then(() => {
					setAdding(false);
				});

		} else {
			setError("Please enter a name.");
		}
	};

	return (
		<>
			{adding ? (
				<div className="centered-flex gap-4 p-12 bg-black opacity-90">
					<h2 className="text-white">Adding new item...</h2>
					<ReactLoading
						type="spin"
						color="#fff"
						height={20}
						width={20}
					/>
				</div>
			) : (
				<form
					className="centered-flex flex-col gap-3 p-10 bg-black opacity-90 rounded-lg"
					onSubmit={addFormSubmit}
				>
					<input
						className="modal-input"
						type="text"
						placeholder="Item Name"
						onChange={(e) => {
							setItemName(e.target.value);
						}}
						value={itemName}
					/>
					<input
						className="modal-input"
						type="number"
						placeholder="Item Price"
						onChange={(e) => {
							setItemPrice(e.target.value);
						}}
						value={itemPrice}
					/>
					<button className="modal-input bg-white text-black" type="submit">Add</button>
					{error && <p className="text-red-500">{error}</p>}
				</form>
			)}
		</>
	);
}

export default AddItem;
