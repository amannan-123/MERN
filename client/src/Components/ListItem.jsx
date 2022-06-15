import { useState, useContext} from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { ItemsContext } from "../Contexts/ItemsContext";

function ListItem(props) {
	const [items, setItems] = useContext(ItemsContext);

	const [deleting, setDeleting] = useState(false);

	const delItem = (id) => {
		setDeleting(true);
		axios
			.delete(`/api/items/${id}`)
			.then(() => {
				setItems(items.filter((item) => item._id !== id));
			})
			.catch((err) => {
				console.log(err);
			})
			.then(() => {
				setDeleting(false);
			});
	};

	return (
		<div className="item">
			<div className="item-text">
				<h1 className="item-text1">{props.item.name}</h1>
				<h2 className="item-text2">Price: {props.item.price}</h2>
			</div>
			{deleting ? (
				<ReactLoading
					type="spin"
					color="#fff"
					height={20}
					width={20}
				/>
			) : (
				<button
					className="item-btn"
					onClick={() => {
						delItem(props.item._id);
					}}
				>
					&times;
				</button>
			)}
		</div>
	);
}

export default ListItem;
