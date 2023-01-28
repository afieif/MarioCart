import "./App.css";
import Admin from "./components/admin/Admin.js";
import { logout } from "./firebase";
import marioimg from "./assets/mario-cart.png";

function App() {
	return (
		<>
			<div className="nav">
				<img src={marioimg} alt="" />
				<button onClick={() => logout()}>logout</button>
			</div>
			<Admin />
		</>
	);
}

export default App;
