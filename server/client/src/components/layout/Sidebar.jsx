import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Poll, Badge, ArrowDropDown, Map, Person} from '@mui/icons-material';


export default function Sidebar({ isActive }) {

  const [isSurveyMenuOpen, setSurveyMenuOpen] = useState(false);
  const [isIDMenuOpen, setIDMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const surveyID = 0;

  return(
    <nav className={`sidebar ${isActive ? "active" : ""}`}>
      <ul>
        <li className='profile'>       
          <div className='profile-description'>
            <h1>Ruther Solloso</h1>
            <h2>MSWDO Head</h2>
          </div>
        </li>
        <li>
          <Link to='/main/edit' className={location.pathname === '/main' ? 'active-link' : ''}>
            <Home/>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to='/main/survey' className={location.pathname === '/survey' ? 'active-link' : ''}>
            <Poll/>
            <span>Survey</span>
          </Link>
        </li>
        <li>
          <button className='dropdown-button' onClick={() => setIDMenuOpen(!isIDMenuOpen)}>
             <Badge/>
             <span>ID Generator</span>
             <ArrowDropDown/>
          </button>
            <ul className={isIDMenuOpen ? 'sub-menu open' : 'sub-menu closed'}>
              <div>
                <Link to={`/main/generate-id/solo-parent/${surveyID}`} className={location.pathname === '/register' ? 'active-link' : ''}>Solo Parent ID</Link>
                <Link to={`/main/generate-id/senior-citizen/${surveyID}`} className={location.pathname === '/register' ? 'active-link' : ''}>Senior Citizen ID</Link>
                <Link to={`/main/generate-id/pwd/${surveyID}`} className={location.pathname === '/register' ? 'active-link' : ''}>PWD ID</Link>
              </div>
            </ul>
        </li>
        <li>
          <Link to='/register' className={location.pathname === '/register' ? 'active-link' : ''}>
            <Map/>
            <span>Hazard Map</span>
          </Link>
        </li>
        <li>
          <Link to='/register' className={location.pathname === '/register' ? 'active-link' : ''}>
            <Person/>
            <span>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}