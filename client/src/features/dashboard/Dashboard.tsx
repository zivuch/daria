import Logout from '../loginRegister/Logout';
import {useEffect, useState} from 'react'
import axios from "axios";
import { BASE_URL } from '../../model/baseURL'
import { useNavigate, Link } from 'react-router-dom';
import {useSetBooks, useSelectorBooksFinished, useSelectorBooksReading, useSelectorBooksWantToRead} from './state/hooks'



const Dashboard = () => {
    // get user data from localStorage
    const user_first_name = localStorage.getItem('user_first_name');
    const user_family_name = localStorage.getItem('user_family_name');
    const user_id = localStorage.getItem('user_id');
    // state for displaying error message
    const [message, setMessage] = useState('');
    const useSetBooksHook = useSetBooks();
    const navigate = useNavigate();
    const booksReading = useSelectorBooksReading();
    const booksWantToRead = useSelectorBooksWantToRead();
    const booksFinished = useSelectorBooksFinished();

    // fetch all books for the user
    const fecthAllBooks = async ():Promise<void>  =>{
        try {
            const response = await axios.post(`${BASE_URL}/books/allbooks`,  
                {
                 user_id: user_id   
                },
                {withCredentials: true});
            //set the books state to the response data
            useSetBooksHook(response.data);
        } catch (error:any) {
            console.log(error);
            // show the error message
            setMessage(error.message);
        }
    }

    // fetch all books on component mount
    useEffect(() => {
        fecthAllBooks();
    },[])

    return (
        <>
        <nav>
            <Logout/>
        </nav>

        <h3>{user_first_name} {user_family_name}, welcome to your Dashboard!</h3>

        {/* if there are books with status = Reading, display them */}
        {(booksReading.length != 0)? (
            <div>
            <div>Currently reading:</div>
            { booksReading.map(book => (
                <Link to={`/book/${book.id}`}><img key={book.id} src={book.image} alt={book.title} /></Link>
            )) }
            <button onClick={()=>navigate('/books/reading')}>See all</button>
            </div>) 
        :<></>}
        {/* if there are books with status = Finished, display them */}
        {(booksFinished.length != 0)? (
            <div>
            <div>Currently reading:</div>
            { booksFinished.map(book => (
                <Link to={`/book/${book.id}`}><img key={book.id} src={book.image} alt={book.title} /></Link>
            )) }
            <button onClick={()=>navigate('/books/finished')}>See all</button>
            </div>) 
        :<></>}

        {/* if there are books with status = WantToRead, display them */}
         {(booksWantToRead.length != 0)? (
            <div>
            <div>Currently reading:</div>
            { booksWantToRead.map(book => ( 
                <Link to={`/book/${book.id}`}><img key={book.id} src={book.image} alt={book.title} /></Link>
            )) }
            <button onClick={()=>navigate('/books/wanttoread')}>See all</button>
            </div>) 
        :<></>} 

        <Link to='/books/search'><button>Add a book</button></Link>

        {message}

        </>
    )
}

export default Dashboard;