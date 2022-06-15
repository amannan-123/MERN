import { useState, useContext, useRef } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { ItemsContext } from "../Contexts/ItemsContext";
import ListItem from "./ListItem";
import AddItem from "./AddItem";

function Items() {
	const [items, , loading] = useContext(ItemsContext);

	const [modal, setModal] = useState(false);

	const modalElem = useRef(null);

	const toggleModal = () => {
		setModal(!modal);
	};

	const closeModal = (event) => {
		var modalElement = modalElem.current;
		if (event === null || event.target === modalElement) {
			setModal(false);
		}
	};

	return (
		<div className="pos-abs">
			<button className="add-btn" onClick={toggleModal}>
				Add new Item
			</button>

			{loading ? (
				<ReactLoading
					type="bars"
					color="#ff1a1a"
					height={100}
					width={100}
				/>
			) : (
				<div className="list-box">
					{items.length > 0 ? (
						<>
							{items.map((item) => (
								<ListItem key={item._id} item={item} />
							))}
						</>
					) : (
						<h1>No items</h1>
					)}
				</div>
			)}

			{modal && (
				<div className="modal" ref={modalElem} onClick={closeModal}>
					<AddItem closeModal={closeModal} />
				</div>
			)}
		</div>
	);
}

export default Items;
