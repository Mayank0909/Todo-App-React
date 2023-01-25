import React from "react";

import "../app.css";
function Deleted() {
	const del = JSON.parse(localStorage.getItem("deleted"));

	return (
		<>
			<h1 className="todo-htag">These are the Deleted Items 👇</h1>

			<div className="box">
				{del.map((elem) => {
					return (
						<>
							<div className="showItem">
								<div className="eachItem" key={elem.id}>
									<p className="ptag_time">{elem.mydate}</p>
									<div className="todo_text">
										<h2>{elem.name}</h2>
									</div>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}

export default Deleted;
