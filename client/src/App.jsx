import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/auth/authContext.jsx';
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';


import Main from './components/layout/Main.jsx';
import LandingPage from './features/Home/pages/LandingPage.jsx';
import EditPost from './features/Home/pages/EditPost.jsx';

import { Login, Register } from './features/auth/pages';

import { AddSurvey, ManageSurvey, SurveyForm } from './features/survey/pages';

import { AddSeniorCitizenID, SeniorCitizenForm } from './features/idGenerator/seniorCitizenID/pages'
import { AddSoloParentID, SoloParentForm } from './features/idGenerator/soloParentID/pages'
import { AddPwdID, PWDForm } from './features/idGenerator/pwdID/pages'

import ManagePwdID from './features/idGenerator/pwdID/pages/ManagePwdID.jsx';
import ManageSeniorCitizenID from './features/idGenerator/seniorCitizenID/pages/ManageSeniorCitizenID.jsx';
import ManageSoloParentID from './features/idGenerator/soloParentID/pages/ManageSoloParentID.jsx';
import ManageAccounts from './features/accounts/pages/ManageAccounts.jsx';
import AddAccount from './features/accounts/pages/AddAccount.jsx';
import HazzardMap from './features/hazzardMap/map.jsx';
import Profile from './features/profile/Profile.jsx';
import Dashboard from './features/dashboard/dashboard.jsx';
import ManagePopulation from './features/population/ManagePopulation.jsx';
import FindPerson from './features/idGenerator/pwdID/pages/FindPerson.jsx';



export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/main' element={<Main />}>
              <Route index element={<Dashboard/>}/>
              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='edit' element={<EditPost/>}/>
              <Route path='accounts' element={<ManageAccounts/>}/>
              <Route path='accounts/addAccount' element={<AddAccount/>}/>
              <Route path='survey' element={<AddSurvey/>}/>
              <Route path='survey/:id' element={<SurveyForm/>}/>
              <Route path='view-survey/:id' element={<SurveyForm isViewing={true}/>}/>
              <Route path='edit-survey/:id' element={<SurveyForm isEditing={true}/>}/>

              <Route path='population' element={<ManagePopulation/>}/>

              <Route path="manage-pwdID" element={<ManagePwdID />} />
              <Route path="manage-soloParentID" element={<ManageSoloParentID />} />
              <Route path="manage-seniorCitizenID" element={<ManageSeniorCitizenID/>} />
              <Route path="manage-survey">
                <Route index element={<ManageSurvey />} />
              </Route>
              <Route path="generate-id">
                <Route index element={<AddSoloParentID />} />
                <Route path='solo-parent' element={<AddSoloParentID/>}/>
                <Route path='solo-parent/:soloParentID' element={<SoloParentForm/>}/>
                <Route path='senior-citizen' element={<AddSeniorCitizenID/>}/>
                <Route path='senior-citizen/:seniorCitizenID' element={<SeniorCitizenForm/>}/>
                <Route path='pwd' element={<AddPwdID/>}/>
                <Route path='pwd/find-person' element={<FindPerson/>}/>
                <Route path='pwd/new/:pwdID' element={<PWDForm/>}/>
                <Route path='pwd/registered/:pwdID/:populationID' element={<PWDForm isRegistered={true}/>}/>
                <Route path='pwd/renewal/:pwdID/:populationID' element={<PWDForm hasPWDID={true}/>}/>
              </Route>      
              <Route path='hazard-map' element={<HazzardMap/>}/>
              <Route path='profile' element={<Profile/>}/>
            </Route>

          </Route>       
          <Route path='/register' element={<AddAccount />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<LandingPage />}/>
          <Route path='/' element={<LandingPage />}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}
