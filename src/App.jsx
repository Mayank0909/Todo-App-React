import React from "react";
// import ToDo from "./components/ToDo";
import "./app.css";
import ToDoEditable from "./components/ToDoEditable";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Deleted from "./components/Deleted";

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<ToDoEditable />}></Route>
					<Route path="/deleted" element={<Deleted />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
