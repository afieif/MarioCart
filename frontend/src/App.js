import "./App.css";
// import Supplier from "./components/Supplier/Supplier.js";
import { logout } from "./firebase";
import marioimg from "./assets/mario-cart.png";
// import Warehouse from './components/Warehouse/Warehouse.js';
// import Sales from './components/Sales/Sales.js';
// import Admin from './components/Admin/Admin.js';
import Role from './components/Role/Role.js';

function App({role}) {
	return (
		<>
			<div className="nav">
				<img src={marioimg} alt="" className="logo" />
				<button onClick={() => logout()} className="logout-button">
					Log Out
				</button>
			</div>
			<div>
    		<Role role={role}/>
    		</div>
		</>
	);
}

export default App;
