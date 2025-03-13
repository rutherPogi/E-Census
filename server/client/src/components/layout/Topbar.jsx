import { useAuth } from '../../utils/auth/authContext';
import { useNavigate } from 'react-router-dom';

function Topbar({toggleSidebar}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return(
    <nav id="header">
      <div id="header-left">
        <button id="toggle-button" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
        </button> 
      </div>
      <div id="header-right">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-360 280-560h400L480-360Z"/></svg>
        <div className='dropdown'>
          <div className='logout' onClick={handleLogout}>Logout</div>
        </div>
      </div>
    </nav>
  )
}

export default Topbar