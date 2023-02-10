import { useState, useContext } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { ItemsContext } from "../Contexts/ItemsContext";
import { ThemeContext } from "../Contexts/ThemeContext";
import { AuthContext } from "../Contexts/AuthContext";

function ListItem(props) {
	const [, setItems, , , , setError] = useContext(ItemsContext);
	const [user] = useContext(AuthContext);
	const [darkTheme] = useContext(ThemeContext);
	const [deleting, setDeleting] = useState(false);

	const delItem = (id) => {

		setDeleting(true);

		var config = {};

		if (user) {
			config.headers = {
				Authorization: `Bearer ${user.token}`,
			};
		}

		axios
			.delete(`/api/items/${id}`, config)
			.then(() => {
				setItems((prevItems) =>
					prevItems.filter((item) => item._id !== id)
				)
			})
			.catch((err) => {
				setError(err.response.data.message);
			})
			.then(() => {
				setDeleting(false)
			})
	};

	return (
		<div className="flex items-center justify-between border-solid border-b-2 border-black dark:border-white last:border-b-0">
			<div className="text-black dark:text-white text-lg m-1">
				<h1>{props.item.name}</h1>
				<h2 className="text-xs text-gray-600 dark:text-gray-400">
					Price: {props.item.price}
				</h2>
			</div>
			{deleting ? (
				<ReactLoading
					className="m-1"
					type="spin"
					height={20}
					width={20}
					color={darkTheme ? "white" : "black"}
				/>
			) : (
				<button
					className="centered-flex rounded-[5px] p-1 m-1 h-6 w-6 cursor-pointer text-[25px] leading-none text-white bg-[#ff1a1a] hover:bg-[#e60000] active:bg-[#cc0000]"
					onClick={() => {
						delItem(props.item._id);
					}}
				>
					<span>&times;</span>
				</button>
			)}
		</div>
	);
}

export default ListItem;
