import "./App.css";
import Admin from "./components/Admin/Admin.js";
import { logout } from "./firebase";
import marioimg from "./assets/mario-cart.png";

function App() {
	return (
		<>
			<div className="nav">
				<img src={marioimg} alt="" />
				<button onClick={() => logout()} className="logout-button">Log Out</button>
			</div>
			<Admin />
		</>
	);
}

export default App;
