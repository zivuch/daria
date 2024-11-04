import { Link, useNavigate} from 'react-router-dom'
import { useRef, useState } from 'react'
import axios from "axios";
import {useSetUser} from './state/hooks'

const Login = () => {

    // using useRef hook to create ref for each input field
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    // using useState hook to save the message - move to REDUX!!!!!!!!
    const [message, setMessage] = useState('');
    // using useNavigate hook to navigate to Login page after registration
    const navigate = useNavigate();
    const useSetUserHook = useSetUser();

    const login =  async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        const username=usernameRef.current?.value;
        const password= passwordRef.current?.value;
        try {
            // for development !!!!!!!!!!!!
            // const response = await axios.post('http://localhost:3001/user/login',
            // for deployment !!!!!!!!!!!!!!
            const response = await axios.post('/user/login',  
                {
                    username, password
                },
                {withCredentials: true});
            // if login was successful, show the personal greeting message and after 1 second navigate to dashboard
            if (response.status === 200) {
                    useSetUserHook(response.data.user);
                    navigate('/dashboard');  
                }
            
        } catch (error:any) {
            console.log(error);
            // show the error message
            setMessage(error.response.data.message);
            // clear the input fields
            if (usernameRef.current) usernameRef.current.value = '';
            if (passwordRef.current) passwordRef.current.value = '';
        }
    }

    return (
        <>
        <Link to='/'><button>Back</button></Link>
        <Link to='/register'><button>Register</button></Link>
        <h1>Login</h1>
        <form onSubmit={(event) => login(event)}>
            <label >Username: </label>
            <input type='text' name='username' ref={usernameRef}required/><br/>
            <label >Password: </label>
            <input type='password' name='password' ref={passwordRef}required/><br/>
            <button type='submit' >Login</button>
        </form>
        <div id='errorMessage'>{message}</div>
        </>
    )
}

export default Login;