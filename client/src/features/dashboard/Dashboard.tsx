// import { useSelectUser} from '../loginRegister/state/hooks'
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { BASE_URL } from '../../model/baseURL'

const Dashboard = () => {
    const navigate = useNavigate();
    // const useSelectUserHook = useSelectUser();
    const user_first_name = localStorage.getItem('user_first_name');
    const user_family_name = localStorage.getItem('user_family_name');

    const logout = async():Promise<void> => {
        try {
            const response = await axios.delete(`${BASE_URL}/user/logout`,  
            {withCredentials: true});
            if (response.status === 200) {
                // remove user from the localStorage
                localStorage.deleteItem('user_id');
                localStorage.deleteItem('user_email');
                localStorage.deleteItem('user_first_name');
                localStorage.deleteItem('user_family_name');
                localStorage.deleteItem('user_username');
            }
            
        } catch (error) {
            console.log(error);
        }
        navigate('/'); 
    }
    return (
        <>
        <button onClick={logout}>Logout</button>
        <h1>{user_first_name} {user_family_name}, welcome to your Dashboard!</h1>
        </>
    )
}

export default Dashboard;