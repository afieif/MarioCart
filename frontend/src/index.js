import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {HashRouter as Router,Routes,Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<ProtectedRoute/>}>
            <Route exact path='/admin' element={<App/>}/>
          </Route>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
