import React from 'react';
import './App.css';

const electron = window.require("electron")
const ipc = electron.ipcRenderer
const reducer = (state, action) => {
    switch (action.type) {
        case "action_add":
            return {...state, count: state.count + 1};
        case "action_sub":
            return {...state, count: state.count - 1};
        default:
            return state;
    }
}

function App() {
    const [state, dispatch] = React.useReducer(reducer, {count: 0})
    const btnClick = type => () => dispatch({type})
    const sendClick = () => {
        ipc.send('app close window',"hello world, please close window")
    }
    return (
        <div className="App">
            <p> {state.count} </p>
            <button onClick={btnClick("action_add")}>
                add
            </button>
            <button onClick={btnClick("action_sub")}>
                sub
            </button>
            <button onClick={sendClick}>
                send msg

            </button>
        </div>
    );
}

export default App;
