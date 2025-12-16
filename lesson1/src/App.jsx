import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/layout'
import AsyncRedux from './redux/asyncRedux'
import SyncRedux from './redux/syncRedux'
import AsyncZustand from './zustand/asyncZustand'
import SyncZustand from './zustand/syncZustand'
import AsyncJotai from './jotai/asyncJotai'
import SyncJotai from './jotai/syncJotai'
import AsyncMobx from './mobx/asyncMobx'
import SyncMobx from './mobx/syncMobx'
import ThemeSwitcher from './context/ThemeContext'
import InfoPage from './redux/infobyid'

const App = () => {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          index:true,
          element:<AsyncRedux/>
        },
        {
          path:"/syncRedux",
          element:<SyncRedux/>
        },
        {
          path:"/asyncZustand",
          element:<AsyncZustand/>
        },
        {
          path:"/syncZustand",
          element:<SyncZustand/>
        },
        {
          path:"/asyncJotai",
          element:<AsyncJotai/>
        },
        {
          path:"/syncJotai",
          element:<SyncJotai/>
        },
        {
          path:"/asyncMobx",
          element:<AsyncMobx/>
        },
        {
          path:"/syncMobx",
          element:<SyncMobx/>
        },
        {
          path:"/infobyid/:id",
          element:<InfoPage/>
        },
        {
          path:"/themeContext",
          element:<ThemeSwitcher/>
        },
      ]
    }
  ])
  return <RouterProvider router={router}/> 
}
export default App

