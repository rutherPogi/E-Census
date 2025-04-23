import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/auth/authContext.jsx';
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';


import Main from './components/layout/Main.jsx';
import LandingPage from './features/Home/pages/LandingPage.jsx';


import { Login } from './features/auth/pages';

import { AddSurvey, ManageSurvey, SurveyForm } from './features/survey/pages';

import { AddSeniorCitizenID, SeniorCitizenForm } from './features/idGenerator/seniorCitizenID/pages'
import { AddSoloParentID, SoloParentForm } from './features/idGenerator/soloParentID/pages'
import { AddPwdID, PWDForm } from './features/idGenerator/pwdID/pages'

import ManagePwdID from './features/idGenerator/pwdID/pages/ManagePwdID.jsx';
import ManageSeniorCitizenID from './features/idGenerator/seniorCitizenID/pages/ManageSeniorCitizenID.jsx';
import ManageSoloParentID from './features/idGenerator/soloParentID/pages/ManageSoloParentID.jsx';
import ManageAccounts from './features/accounts/pages/ManageAccounts.jsx';
import AddAccount from './features/accounts/pages/AddAccount.jsx';
import AddMultipleAccounts from './features/accounts/pages/AddMultipleAccounts.jsx';
import HazzardMap from './features/hazzardMap/map.jsx';
import Profile from './features/profile/Profile.jsx';
import Dashboard from './features/dashboard/dashboard.jsx';

import Manage from './features/population/pages/Manage.jsx';

import PWDFindPerson from './features/idGenerator/pwdID/pages/FindPerson.jsx';
import SCFindPerson from './features/idGenerator/seniorCitizenID/pages/FindPerson.jsx';
import SPFindPerson from './features/idGenerator/soloParentID/pages/FindPerson.jsx';

import EditPost from './features/post/pages/EditPost.jsx';
import AddPost from './features/post/pages/AddPost.jsx';
import PostLists from './features/post/pages/PostLists.jsx';
import ViewPost from './features/post/pages/ViewPost.jsx';

import Segregation from './features/dataBank/pages/Segregation.jsx';
import YouthMasterlist from './features/dataBank/pages/YouthMasterlist.jsx';
import OSY from './features/dataBank/pages/OSY.jsx';
import WomenMasterlist from './features/dataBank/pages/WomenMasterlist.jsx';
import PWDMasterlist from './features/dataBank/pages/PWDMasterlist.jsx';
import SoloParentMasterlist from './features/dataBank/pages/SoloParentMasterlist.jsx';
import NonIvatan from './features/dataBank/pages/NonIvatan.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/main' element={<Main />}>
              <Route index element={<Dashboard/>}/>
              <Route path='dashboard' element={<Dashboard/>}/>

              <Route path='updates' element={<PostLists/>}/>
              <Route path='post/add' element={<AddPost/>}/>
              <Route path='post/edit/:postID' element={<EditPost/>}/>
              <Route path='post/view/:postID' element={<ViewPost/>}/>

              <Route path='accounts' element={<ManageAccounts/>}/>
              <Route path='accounts/addAccount' element={<AddAccount/>}/>
              <Route path='accounts/addMultipleAccounts' element={<AddMultipleAccounts/>}/>

              <Route path='survey' element={<AddSurvey/>}/>
              <Route path='survey/:id' element={<SurveyForm/>}/>
              <Route path='view-survey/:id' element={<SurveyForm isViewing={true}/>}/>
              <Route path='edit-survey/:id' element={<SurveyForm isEditing={true}/>}/>
              <Route path='manage-survey' element={<ManageSurvey />}/>

              <Route path='population' element={<Manage/>}/>

              <Route path="manage-pwdID" element={<ManagePwdID />} />
              <Route path="manage-soloParentID" element={<ManageSoloParentID />} />
              <Route path="manage-seniorCitizenID" element={<ManageSeniorCitizenID/>} />

              <Route path='databank'>
                <Route index element={<Manage />} />
                <Route path='segregation' element={<Segregation/>}/>
                <Route path='youth-masterlist' element={<YouthMasterlist/>}/>
                <Route path='osy' element={<OSY/>}/>
                <Route path='solo-parent' element={<SoloParentMasterlist/>}/>
                <Route path='women' element={<WomenMasterlist/>}/>
                <Route path='pwd' element={<PWDMasterlist/>}/>
                <Route path='non-ivatan' element={<NonIvatan/>}/>
              </Route>
              

              <Route path="generate-id">
                <Route index element={<AddSoloParentID />} />

                {/* SOLO PARENT ROUTES */}
                <Route path='solo-parent' element={<AddSoloParentID/>}/>
                <Route path='solo-parent/find-person' element={<SPFindPerson/>}/>

                <Route path='solo-parent/new/:spApplicationID' element={<SoloParentForm/>}/>
                <Route path='solo-parent/resident/:spApplicationID/:populationID' element={<SoloParentForm isRegistered={true}/>}/>
                <Route path='solo-parent/renewal/:spApplicationID' element={<SoloParentForm hasSPID={true}/>}/>

                {/* SENIOR CITIZEN ROUTES */}
                <Route path='senior-citizen' element={<AddSeniorCitizenID/>}/>
                <Route path='senior-citizen/find-person' element={<SCFindPerson/>}/>

                <Route path='senior-citizen/new/:scApplicationID' element={<SeniorCitizenForm/>}/>
                <Route path='senior-citizen/resident/:scApplicationID/:populationID' element={<SeniorCitizenForm isRegistered={true}/>}/>
                <Route path='senior-citizen/renewal/:scApplicationID' element={<SeniorCitizenForm hasSCID={true}/>}/>

                {/* PWD ROUTES */}
                <Route path='pwd' element={<AddPwdID/>}/>
                <Route path='pwd/find-person' element={<PWDFindPerson/>}/>
                
                <Route path='pwd/new/:pwdApplicationID' element={<PWDForm/>}/>
                <Route path='pwd/resident/:pwdApplicationID/:populationID' element={<PWDForm isRegistered={true}/>}/>
                <Route path='pwd/renewal/:pwdApplicationID' element={<PWDForm hasPWDID={true}/>}/>
              </Route>      
              <Route path='hazard-map' element={<HazzardMap/>}/>
              <Route path='profile' element={<Profile/>}/>
            </Route>

          </Route>       
          <Route path='/register' element={<AddAccount />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/home' element={<LandingPage />}/>
          <Route path='/' element={<LandingPage />}/>
          <Route path='post/view/:postID' element={<ViewPost/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}
