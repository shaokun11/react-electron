import React from "react"
import Loadable from "react-loadable"
import {Spin} from "antd"


const LoadableComponent = (component) => Loadable({
  loader: component,
  loading: () => <Spin/>
})

export default LoadableComponent