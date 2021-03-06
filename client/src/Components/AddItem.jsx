import { useState, useContext } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { ItemsContext } from "../Contexts/ItemsContext";

function AddItem(props) {
	const [items, setItems] = useContext(ItemsContext);

	const [itemName, setItemName] = useState("");
	const [itemPrice, setItemPrice] = useState(0);

	const [adding, setAdding] = useState(false);

	const addFormSubmit = (e) => {
		e.preventDefault();
		if (itemName.trim().length > 0) {
			setAdding(true);
			var newItem = { name: itemName, price: itemPrice };
			axios
				.post("/api/items", newItem)
				.then((res) => {
					setItems([res.data, ...items]);
				})
				.catch((err) => {
					console.log(err);
				})
				.then(() => {
					setItemName("");
					setItemPrice(0);
					props.closeModal(null);
					setAdding(false);
				});
		} else {
			alert("Please enter a name");
		}
	};

	return (
		<>
			{adding ? (
				<div className="modal-inner">
					<h2 className="text-white mb-2">Adding new item...</h2>
					<ReactLoading
						type="spin"
						color="#fff"
						height={20}
						width={20}
					/>
				</div>
			) : (
				<form
					className="modal-inner"
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
				</form>
			)}
		</>
	);
}

export default AddItem;
