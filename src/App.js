import React, {useCallback, useEffect, useReducer, useState} from "react"
import "./App.css"
import Api from "./utils/api"
import {Button, Spin} from "antd"
import {useAsync} from "react-use"
import Loading from "./component/loading"
import Error from "./component/error"

const electron = window.require("electron")
const ipcRenderer = electron.ipcRenderer

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

const PostComponent = ({url, body}) => {
  const state = useAsync(async () => {
    return await Api.post(url, body)
  }, [url])
  if (state.loading) return <Loading/>
  if (state.error) return <Error error={state.error}/>
  return <div>name:{state.value.name}</div>
}

function App() {
  const [state, dispatch] = useReducer(reducer, {count: 0})
  const [remoteState, dispatchRemoteState] = useState({
    name: "shaokun",
    age: 18,
    body: ""
  })
  const btnClick = type => () => dispatch({type})
  const sendClick = () => {
    ipcRenderer.send("app close window", "hello world, please close window")
  }
  const getUserInfo = () => {
    ipcRenderer.send("userInfo")
  }

  const listener = useCallback(() => {
    ipcRenderer.on("userInfo", function (event, msg) {
      dispatchRemoteState(v => ({
        v, ...msg
      }))
    })
  }, [])

  useEffect(() => {
    listener()
  }, [])

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

      <Button
        type={"primary"}
        onClick={getUserInfo}>
        get user info
      </Button>
      <ul>
        <li>name:{remoteState.name}</li>
        <li>age:{remoteState.age}</li>
        <li>age:{remoteState.body}</li>
      </ul>
      <PostComponent
        url={"posts"}
        body={{name: "shaokun"}}/>
    </div>
  )
}

export default App
