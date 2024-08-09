import React from 'react'
import { useRoutes } from 'react-router-dom'

import DemoFormReact from '../components/DemoFormReact/DemoFormReact'

const useRouteCostom = () => {
    const element = useRoutes([
      {
        path: "/",
        element: <DemoFormReact/>,
      },
    ])
  return (
    element
  )
}

export default useRouteCostom