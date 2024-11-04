import { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

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
      // for development !!!!!!!!!!!!
      // const response = await axios.get("http://localhost:3001/user/auth", {
      // for deployment !!!!!!!!!!!!!!
      const response = await axios.post('/user/auth', {
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
