import './App.css';
import { logout } from './firebase';


function App() {
  return (
    <>
    <button onClick={()=>logout()}>
      logout
    </button>Home
    </>
  );
}

export default App;
