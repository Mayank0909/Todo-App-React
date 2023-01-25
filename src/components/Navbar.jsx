import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
function Navbar() {
	return (
		<>
			<div className="navbar_div">
				<div>
					<NavLink className="navlink" to="/">
						ToDo App
					</NavLink>
				</div>
				<div>
					<NavLink className="navlink" to="/deleted">
						Deleted Items
					</NavLink>
				</div>
			</div>
		</>
	);
}

export default Navbar;
