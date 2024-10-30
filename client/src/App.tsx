import {useState} from "react";
import "./App.css";

function App() {
  const [data, setData] = useState('');
  const [name, setName] = useState('');
  const BASE_URL:string = 'http://localhost:3001';
  const send = () => {
   if(name){
    fetch(`${BASE_URL}/api/${name}`)
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        setData(data.message);
      })
      .catch((e) => console.log(e));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "write your name..." : data}</p>
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{ setName( e.target.value)}}/>
        <button onClick={()=>send()}>Send</button>
      </header>
    </div>
  );
}

export default App;