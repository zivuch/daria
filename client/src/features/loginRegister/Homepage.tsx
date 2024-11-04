import {Link} from 'react-router-dom'


const Homepage = () => {
    return (
        <>
        <h1>Welcome to Bookworm!</h1>
        <Link to='/login'><button>Login</button></Link>
        <Link to='/register'><button>Register</button></Link>
        </>
    )
}

export default Homepage;