import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/auth/authContext.jsx';
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';

import { Login, Register } from './features/auth/pages';
import Main from './components/layout/Main.jsx';
import { AddSurvey, EditSurvey, ManageSurvey, ViewSurvey, SurveyForm } from './features/survey/pages';
import Home from './features/Home/Home.jsx';
import EditPost from './features/Home/EditPost.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/main' element={<Main />}>
              <Route index element={<EditPost/>}/>
              <Route path='edit' element={<EditPost/>}/>
              <Route path='survey' element={<AddSurvey/>}/>
              <Route path='survey/:id' element={<SurveyForm/>}/>
              <Route path="manage-survey">
                <Route index element={<ManageSurvey />} />
                <Route path="view/:viewId" element={<ViewSurvey />}/>
                <Route path="edit/:editId" element={<EditSurvey />}/>
              </Route>
              {/*<Route path="generate-id">
                <Route index element={<AddNewID />} />
                <Route path='solo-parent/:soloParentID' element={<SoloParentForm/>}/>
                <Route path='senior-citizen/:seniorCitizenID' element={<SeniorCitizenForm/>}/>
                <Route path='pwd/:pwdID' element={<PWDForm/>}/>
              </Route> */}        
            </Route>
          </Route>       
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}
