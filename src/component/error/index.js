import React from "react"
import styled from "styled-components"

const MaxLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Error = ({error}) => {
  return <MaxLayout>
    <span>{error}</span>
  </MaxLayout>
}

export default Error