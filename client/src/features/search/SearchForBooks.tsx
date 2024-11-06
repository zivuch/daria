import { Link  } from "react-router-dom";
import Logout from "../loginRegister/Logout";
const SearchForBooks = () => {
    return (
        <>
        <nav>
            <Link to='/dashboard'><button>Back</button></Link>
            <Logout/>
        </nav>
        Search
        </>
    )
}

export default SearchForBooks;