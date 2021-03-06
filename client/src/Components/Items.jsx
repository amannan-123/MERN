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
		<div className="centered-flex justify-start flex-col max-w-3xl relative m-auto p-5 w-3/4">
			<div className="top-div mb-3 min-h-[38px] w-full flex items-center flex-wrap justify-between">
				<button
					className="text-sm bg-white text-black dark:bg-black dark:text-white rounded-xl p-2 h-full border border-black dark:border-white"
					disabled={loading}
					onClick={toggleModal}
				>
					Add New Item
				</button>
				<form className="flex rounded-xl h-full border border-black dark:border-white overflow-hidden">
					<input
						className="text-sm p-2 text-black dark:text-white bg-[white] dark:bg-[#1c1c1c] placeholder:text-gray-600"
						type="search"
						placeholder="Search"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						value={search}
					/>
					<button
						className="bg-[#cecece] dark:bg-black"
						disabled={loading}
						type="submit"
						onClick={onSearch}
					>
						<svg
							className="w-8 p-1 fill-black dark:fill-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
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
				<div className="flex flex-col rounded-[20px] border-black dark:border-white border-2 p-3 mt-1 w-full bg-white dark:bg-[#1c1c1c]">
					{items.length > 0 ? (
						<>
							{items.map((item) => (
								<ListItem key={item._id} item={item} />
							))}
						</>
					) : (
						<h1 className="text-black dark:text-white text-xl font-normal">
							No items
						</h1>
					)}
				</div>
			)}

			{modal && (
				<div
					className="centered-flex absolute inset-0 font-[exo]"
					ref={modalElem}
					onClick={closeModal}
				>
					<AddItem closeModal={closeModal} />
				</div>
			)}
		</div>
	);
}

export default Items;
