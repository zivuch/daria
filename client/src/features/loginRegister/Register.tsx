import {Link, useNavigate} from 'react-router-dom'
import {useRef, useState} from 'react'
import axios from "axios";

const Register = () => {

    // using useRef hook to create ref for each input field
    const firstNameRef = useRef<HTMLInputElement>(null);
    const familyNameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dateOfBirthRef = useRef<HTMLInputElement>(null);
    // using useState hook to save the message
    const [message, setMessage] = useState('');
    // using useNavigate hook to navigate to Login page after registration
    const navigate = useNavigate();

    const checkBirthDate = (date_of_birth:string|undefined):boolean => {
        if (date_of_birth){
        const currentDate = new Date();
        const birthDate = new Date(date_of_birth);
        // checking if the user is setting their birth date as a date in the future
        if (currentDate.getTime() < birthDate.getTime()) {
            setMessage("You can't set your birth date as a date in the future");
            return false;
        }
        // calculating the age of the user
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        // checking if the user is less than 12 years old
        if (age<12) {
            setMessage("You must be at least 12 years old");
            return false;
        }
        return true;}
        // returning false if variable date_of_birth was undefined
        return false;
    }

    // async registration
    const register =  async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();
        // getting all the values
        const date_of_birth = dateOfBirthRef.current?.value;
        // checking if the user is at least 12 years old and didn't set their birth date as date in the future
        if (!checkBirthDate(date_of_birth)) return;
        const first_name= firstNameRef.current?.value;
        const family_name= familyNameRef.current?.value;
        const username=usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password= passwordRef.current?.value;
        try {
            // for development !!!!!!!!!!!!
            // const response = await axios.post('http://localhost:3001/user/register',
            // for deployment !!!!!!!!!!!!!!
            const response = await axios.post('/user/register',  
                {
                    first_name, family_name, username, password, email, date_of_birth
                },
                {withCredentials: true});
            // if registration was successful, show the personal greeting message and after 2 seconds navigate to login paga
            if (response.status === 201) {
                    setMessage(response.data.message);
                    setTimeout(function() {
                        navigate('/login');
                      }, 2000);   
                }
            
        } catch (error:any) {
            console.log(error);
            // show the error message
            setMessage(error.response.data.message);
        }
    }

    return (
        <>
        <Link to='/'><button>Back</button></Link>
        <Link to='/login'><button>Login</button></Link>
        <h1>Register</h1>
        <form onSubmit={(event) => register(event)}>
            <label >First name: </label>
            <input type='text' name='first_name'  ref={firstNameRef}required/><br/>
            <label >Last name: </label>
            <input type='text' name='last_name' ref={familyNameRef} required/><br/>
            <label >Username: </label>
            <input type='text' name='username' ref={usernameRef}required/><br/>
            <label >Email: </label>
            <input type='email' name='email' ref={emailRef}required/><br/>
            <label >Password: </label>
            <input type='password' name='password' ref={passwordRef}required/><br/>
            <label >Date of birth: </label>
            <input type='date' name='date_of_birth' ref={dateOfBirthRef}required/><br/>
            <button type='submit' >Register</button>
        </form>
        <div id='errorMessage'>{message}</div>
        </>
    )
}

export default Register;