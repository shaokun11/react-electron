import React from "react"
import styled from "styled-components"
import {Spin} from "antd"

const MaxLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Loading = () => {
  return <MaxLayout>
    <Spin size={"large"}/>
  </MaxLayout>
}

export default Loading