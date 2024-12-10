import logo from './logo.svg';
import './App.css';
import React from 'react';


function App() {

  let clickHandler = (name) => {
    console.log(name);
  };

  const clickHandlerWEvent = (name, e) =>{
    console.log(name, e);
  };

  const [count, setCount] = React.useState(0);
  // const stateHandler = ()=>{
  //   setCount(count+1);
  // }
  return (
    <div className="App">
      <button onClick={()=>clickHandler('test')}> click me </button>
      <button onClick={(e)=>clickHandlerWEvent('test2', e)}> click me </button>
      <button onClick={()=>setCount(count+1)}> {count} </button>

    </div>
  );
}

export default App;
