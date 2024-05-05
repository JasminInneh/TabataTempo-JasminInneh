import React from "react";
import "../../styles/home.css"; 
import Timer from "./Timer";
import Navbar from "./Navbar";



//create your first component
const Home = () => {
	return (
		<>
		<Navbar / >
		<Timer />
		</>
		
	);
};

export default Home;
