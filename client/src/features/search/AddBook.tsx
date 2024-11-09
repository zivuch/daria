import { Link, useParams, useNavigate  } from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import Logout from "../loginRegister/Logout";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { emptyBookExpanded } from "../../model/types";

const AddBook = () => {
    // state for displaying error message
    const [message, setMessage] = useState('');
    const [book, setBook] = useState(emptyBookExpanded);
    const { id } = useParams();
    const navigate = useNavigate();
    const rateRef = useRef<HTMLInputElement>(null);

    const fetchBook = async ():Promise<void>  =>{
        try {
            const response = await axios.get(`${BASE_URL}/books/search/${id}`,  
                {withCredentials: true});
            //set the books state to the response data

            setBook(response.data);
        } catch (error:any) {
            console.log(error);
            // show the error message
            setMessage(error.message);
        }
    }

        // fetch the book on component mount
    useEffect(() => {
        fetchBook();
    },[])

    // add the book to DB
    const postBook = async ():Promise<void>  =>{
        try {
            const response = await axios.post(`${BASE_URL}/books/add`,  
                {
                    authors:book.authors , booktype:book.booktype, categories:book.categories, date_finish:book.date_finish, date_start: book.date_start,
                    description:book.description, image:book.image, language:book.language, pagecount:book.pagecount, pagetype:book.pagetype, publisher:book.publisher, 
                    reading_progress:book.reading_progress,score:book.score, status:book.status, title:book.title, user_id:localStorage.getItem('user_id')
                },
                {withCredentials: true});
            //set the books state to the response data
            setMessage(response.data);
        } catch (error:any) {
            console.log(error);
            // show the error message
            setMessage(error.message);
        }
    }

    // post book, show the success message and navitage to Dashboard
    const addBookToDB = () => {
        // request to add the book
        postBook();
        // show the success message and navigate to Dashboard after 1.5 seconds
        setTimeout(function() {
            navigate('/dashboard');
          }, 1500); 
    }

  
    const statusFinishedGetAdditionalInfo = () => {
        return (
            <div>
                <p>How would you rate this book?</p>
                <input ref={rateRef}placeholder="0..5"/>
                <button onClick={addBookToDB}>Save</button>
            </div>
        )
    }

    const changeStatusToFinished = () => {
        book.status = 'Finished';
    }



    const renderBook = () => {
        return (
            <div>
            {book.image ? (
                <img src={book.image} alt={book.title} />
                ) : (
                <img src="../../../Missing-book-cover.jpg" alt="Missing Book Cover" />
            )}
                <h2>{book.title}</h2>
                <h4>{book.authors}</h4>
                <p>{book.categories? (<>Categories: {book.categories}</>):<></> }</p>
                <p>{book.language? (<>Language: {book.language}</>):<></> }</p>
                <p>{book.description? (<>Description: {book.description}</>):<></> }</p>
                {}
                <button onClick={()=>{
                    book.status = 'WantToRead';
                    addBookToDB();
                }}>Add to the reading list</button>
                <button >Start reading now</button>
                <button onClick={changeStatusToFinished}>Mark as finished</button>
            </div>

        )
    }
    




    return (
        <>
    <nav>
        <Link to='/books/search'><button>Back</button></Link>
        <Link to='dashboard'><button>Dashboard</button></Link>
        <Logout/>
    </nav>
    {(book.id === 0)? renderBook():<></> }
    {(book.status === 'Finished')? statusFinishedGetAdditionalInfo() :<></>}
    {message}
        </>
    )
}

export default AddBook