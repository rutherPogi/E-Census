import './Layout.css'
import { Outlet } from 'react-router-dom'

import Topbar from './Topbar'
import Sidebar from './Sidebar'

export default function Layout() {

  return(
    <div className='layout-container'>
      <Topbar/>
      <Sidebar/>
      <div className='main-content'>
        <Outlet/>
      </div>
    </div>
  )
}