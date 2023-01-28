import "./App.css";
import { logout } from "./firebase";
import marioimg from "./components/Login/mario-cart.png";

function App() {
	return (
		<>
			<div className="nav">
				<img src={marioimg} alt="" />
			</div>
			<button onClick={() => logout()}>logout</button>Home
		</>
	);
}

export default App;
