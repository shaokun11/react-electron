import React, {Suspense, useEffect} from "react"
import "./App.css"
import Api from "./utils/api"
import {Button, Spin} from "antd"
import useSWR from "swr/esm/use-swr"

const electron = window.require("electron")
const ipc = electron.ipcRenderer


const reducer = (state, action) => {
  switch (action.type) {
    case "action_add":
      return {...state, count: state.count + 1}
    case "action_sub":
      return {...state, count: state.count - 1}
    default:
      return state
  }
}

function Test() {
  const {data} = useSWR("posts/1", () => {
    return Api.post("posts", {name: "shaokun"})
  }, {suspense: true})

  if (data === "requestError") {
    return <div>{"something error"}</div>
  }
  return <div>{data.name}</div>
}


function App() {
  const [state, dispatch] = React.useReducer(reducer, {count: 0})
  const btnClick = type => () => dispatch({type})
  const sendClick = () => {
    ipc.send("app close window", "hello world, please close window")
  }
  return (
    <div className="App">
      <p> {state.count} </p>
      <Button
        type={"primary"}
        onClick={btnClick("action_add")}>
        add
      </Button>
      <Button
        type={"primary"}
        onClick={btnClick("action_sub")}>
        sub
      </Button>
      <Button
        type={"primary"}
        onClick={sendClick}>
        send msg
      </Button>
      <div>
        <Suspense fallback={<Spin/>}>
          <Test/>
        </Suspense>
      </div>
    </div>
  )
}

export default App
