import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/" style={{ color: pathname == "/" ? "blue" : "black" }}>AsyncRedux</Link>
          <Link to="/syncRedux" style={{ color: pathname == "/syncRedux" ? "blue" : "black" }}>SyncRedux</Link>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/asyncZustand" style={{ color: pathname == "/asyncZustand" ? "blue" : "black" }}>AsyncZustand</Link>
          <Link to="/syncZustand" style={{ color: pathname == "/syncZustand" ? "blue" : "black" }}>SyncZustand</Link>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/asyncJotai" style={{ color: pathname == "/asyncJotai" ? "blue" : "black" }}>AsyncJotai</Link>
          <Link to="/syncJotai" style={{ color: pathname == "/syncJotai" ? "blue" : "black" }}>SyncJotai</Link>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/asyncMobx" style={{ color: pathname == "/asyncMobx" ? "blue" : "black" }}>AsyncMobx</Link>
          <Link to="/syncMobx" style={{ color: pathname == "/syncMobx" ? "blue" : "black" }}>SyncMobx</Link>
        </div>
        <div>
          <Link to="/themeContext" style={{ color: pathname == "/themeContext" ? "blue" : "black" }}>ThemeContext</Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
export default Layout
