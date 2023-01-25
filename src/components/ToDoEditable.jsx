import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
const getLocalItems = () => {
	let list = localStorage.getItem("lists");
	if (list) {
		return JSON.parse(localStorage.getItem("lists"));
	} else {
		return [];
	}
};
function ToDoEditable() {
	const [inputData, setInputData] = useState("");
	const [titleData, setTitleData] = useState("");

	const [item, setItem] = useState(getLocalItems());
	const [deletedData, setDeletedData] = useState("");
	const [editButton, setEditButton] = useState(false);
	const [editedItem, setEditedItem] = useState(null);

	const addItems = () => {
		if (!inputData) {
			alert("plese add items on todo");
		} else if (inputData && editButton) {
			setItem(
				item.map((elem) => {
					if (elem.id === editedItem) {
						return {
							...elem,
							title: titleData,
							name: inputData,
							mydate: `Edited on ${new Date().toLocaleString()}`,
						};
					}
					return elem;
				})
			);

			setEditButton(false);
			setInputData("");
			setTitleData("");
			setEditedItem(null);
		} else {
			const allInputData = {
				id: new Date().getTime().toString(),
				title: titleData,
				name: inputData,
				mydate: new Date().toLocaleString(),
			};

			setItem([...item, allInputData]);
			// ? had nit given [] earlier
			// onchange>inputdata >store as string>setItem(additem wala)>stores in array[] >item
			// ...item is old data and above cycle repeates on every onchange and onclick on button

			setInputData(""); //empty the input
			setTitleData("");
		}
	};

	const deleteItem = (index) => {
		// console.log(id)
		const updatedItem = item.filter((elem) => {
			return index !== elem.id;
		});
		const deletedStore = item.filter((elem) => {
			return index == elem.id;
		});
		setItem(updatedItem);
		setDeletedData([...deletedData, deletedStore[0]]);
	};

	const editItem = (id) => {
		const newEditItem = item.find((elem) => {
			return elem.id === id;
		});
		// console.log(newEditItem);
		setEditButton(true);
		setInputData(newEditItem.name);
		setTitleData(newEditItem.title);

		setEditedItem(id); // line 10 else me id pass
	};
	const checked = (id) => {
		let checkedItem = document.getElementById(id);
		checkedItem.setAttribute("class", "done");
	};

	useEffect(() => {
		localStorage.setItem("lists", JSON.stringify(item));
	}, [item]);
	useEffect(() => {
		localStorage.setItem("deleted", JSON.stringify(deletedData));
	}, [deletedData]);

	return (
		<>
			<div className="main-div">
				<div className="child-div">
					<h1 className="todo-htag">ToDo List</h1>
					<div className="addItems">
						<input
							placeholder="Title"
							type="text"
							value={titleData}
							onChange={(e) => {
								setTitleData(e.target.value);
							}}
						/>
						<textarea
							placeholder="📝 Description"
							type="text"
							value={inputData}
							onChange={(e) => {
								setInputData(e.target.value);
							}}
						/>
					</div>
					<br />
					{editButton ? (
						<Button variant="contained" onClick={addItems}>
							Edit
						</Button>
					) : (
						<Button variant="contained" onClick={addItems}>
							Add To ToDo
						</Button>
					)}
					<div className="box">
						{item.map((elem) => {
							return (
								<div className="showItem" key={elem.id} id={elem.id}>
									<div className="eachItem">
										<p className="ptag_time">{elem.mydate}</p>
										<div className="title-tag">
											<h2>
												<span className="checkbox-span">
													<Checkbox onClick={() => checked(elem.id)}></Checkbox>
												</span>
												{elem.title}
											</h2>
										</div>

										<div className="todo_text">
											<h4>{elem.name}</h4>
										</div>
										<div className="button_box">
											<button
												className="mybutton"
												onClick={() => editItem(elem.id)}
											>
												<EditIcon color="primary" sx={{ fontSize: 20 }} />
											</button>
											<button
												className="mybutton"
												onClick={() => deleteItem(elem.id)}
											>
												<DeleteIcon color="primary" sx={{ fontSize: 20 }} />
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default ToDoEditable;
