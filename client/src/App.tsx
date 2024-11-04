import "./App.css";
import Homepage from "./features/loginRegister/Homepage";
import Register from "./features/loginRegister/Register";
import Login from "./features/loginRegister/Login";
import Dashboard from "./features/dashboard/Dashboard";
import Auth from "./features/auth/Auth";
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
      <Route path='' element={<Homepage/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/dashboard' element={<Auth><Dashboard /></Auth>}/>
    </Routes>
    </>
  );
}

export default App;