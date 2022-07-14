import { useState, useContext, useRef } from "react";
import ReactLoading from "react-loading";
import { ItemsContext } from "../Contexts/ItemsContext";
import { useSearchParams } from "react-router-dom";
import ListItem from "./ListItem";
import AddItem from "./AddItem";

function Items() {
	const [items, , loading] = useContext(ItemsContext);

	const [modal, setModal] = useState(false);
	const [search, setSearch] = useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const modalElem = useRef(null);

	const toggleModal = () => {
		setModal(!modal);
	};

	const onSearch = (e) => {
		e.preventDefault();
		if (search.trim().length > 0) {
			searchParams.set("search", search);
			setSearchParams(searchParams);
		} else {
			if (searchParams.has("search")) {
				searchParams.delete("search");
				setSearchParams(searchParams);
			}
		}
	};

	const closeModal = (event) => {
		var modalElement = modalElem.current;
		if (event === null || event.target === modalElement) {
			setModal(false);
		}
	};

	return (
		<div className="pos-rel">
			<div className="top-div">
				<button onClick={toggleModal}>Add New Item</button>
				<form>
					<input
						type="text"
						placeholder="Search"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						value={search}
					/>
					<button type="submit" onClick={onSearch}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path
								fill="#FFFFFF"
								d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
							/>
						</svg>
					</button>
				</form>
			</div>

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
