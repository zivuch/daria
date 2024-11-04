import { useSelectUser, useSetUser} from '../loginRegister/state/hooks'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {UserInterface} from '../../model/user'

const Dashboard = () => {
    const navigate = useNavigate();
    const useSetUserHook = useSetUser();
    const useSelectUserHook = useSelectUser();

    const logout = async():Promise<void> => {
        try {
            // for development !!!!!!!!!!!!
            // const response = await axios.delete('http://localhost:3001/user/logout',
            // for deployment !!!!!!!!!!!!!!
            const response = await axios.post('/user/register',  
            {withCredentials: true});
            if (response.status === 200) {
                // remove user from the state
                const emptyUser:UserInterface = {
                    id: 0,
                    email: '', 
                    first_name: '',
                    family_name: '',
                    username: ''
                }
                useSetUserHook(emptyUser);
                navigate('/'); 
            }
            
        } catch (error) {
            console.log(error);
            
        }

    }
    return (
        <>
        {console.log(useSelectUserHook)}
        <button onClick={logout}>Logout</button>
        <h1>{useSelectUserHook.first_name} {useSelectUserHook.family_name}, welcome to your Dashboard!</h1>

        </>
    )
}

export default Dashboard;