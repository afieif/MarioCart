import "./App.css";
import Admin from "./components/Admin/Admin.js";
import Sales from "./components/Sales/Sales.js";
import Warehouse from "./components/Warehouse/Warehouse.js";
import Supplier from "./components/Supplier/Supplier.js";
import { logout } from "./firebase";
import marioimg from "./assets/mario-cart.png";

function App() {
	return (
		<>
			<div className="nav">
				<img src={marioimg} alt="" className="logo" />
				<button onClick={() => logout()} className="logout-button">
					Log Out
				</button>
			</div>
			{/* <Admin /> */}
			{/* <Sales /> */}
			{/* <Warehouse /> */}
			<Supplier />

		</>
	);
}

export default App;
