import React,{useEffect} from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import App from '../../App';
import axios from 'axios';


export default function ProtectedRoute() {
    const {user, role, setRole} = useAuth();
    useEffect(() => {
        axios.get("http://127.0.0.1:5001/role",{ params: { uid: user.uid }})
        .then((response) => {
            setRole(response.data);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    

    
  return ( 
    <div>
    {user? <App role={role}/>:<Navigate to='/login' replace={true}/>}
    </div>  
  )
}
