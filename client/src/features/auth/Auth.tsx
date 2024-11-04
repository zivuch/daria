import { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../model/baseURL'

interface AuthProps {
  children: ReactNode;
}

const Auth: React.FC<AuthProps>  = ({ children}) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
    verify()
  },[])

  const verify = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/auth`, {
        withCredentials: true,
      });      
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
      setRedirect(false);
    }
  };

  return redirect ? children : 
  <>
    <h2>Not authorized</h2>
    <Link to='/'><button>Back</button></Link>
  </>
  ;
};

export default Auth;
