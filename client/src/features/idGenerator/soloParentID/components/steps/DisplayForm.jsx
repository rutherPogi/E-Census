import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from '@mui/material';

import { useFormContext } from "../../components/others/FormContext";
import { HOUSEHOLD_COMPOSITION_HEADERS } from "../../utils/constants";
import { Notification } from "../../../components/Notification";
import { post } from '../../../../../utils/api/apiService';

import { PersonalInfoSection, ContactInfoSection, ProfessionalInfoSection,
         OtherInfoSection, mapFamilyMembers, HouseholdCompositionSection,
         ProblemNeedsSection, EmergencyContactSection, ApplicationDetailsSection} from "../others/DisplaySection";



export default function DisplayApplication({ handleBack, handleNext, handleEdit }) {

  const navigate = useNavigate();
  const { formData, clearFormData } = useFormContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const showNotification = (message, type) => {
    setSnackbarMessage(message);
    setSeverity(type);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Submitting form data:', formData);
      const response = await post('/soloParentID/submit-soloParentID', formData);
      
      if (response.success) {
        showNotification('Solo Parent ID Application submitted!', 'success');

        setTimeout(() => {
          clearFormData();
          navigate('/main/survey');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      if (error.response) {
        showNotification(`Server error: ${error.response.data.message || 'Unknown error'}`, 'error');
      } else if (error.request) {
        showNotification('No response from server. Please check your connection.', 'error');
      } else {
        showNotification(`Error preparing request: ${error.message}`, 'error');
      }
    }
  };


  return (
    <div className='responsive-container'>
      <Box
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '2em',
          backgroundColor: '#fff',
          padding: '1em'
      }}>
        <PersonalInfoSection data={formData} handleEdit={handleEdit}/>
        <ContactInfoSection data={formData} handleEdit={handleEdit}/>
        <ProfessionalInfoSection data={formData} handleEdit={handleEdit}/>
        <OtherInfoSection data={formData} handleEdit={handleEdit}/>
        <HouseholdCompositionSection 
          title='Household Composition'
          headers={HOUSEHOLD_COMPOSITION_HEADERS}
          data={mapFamilyMembers(formData.householdComposition)} 
          handleEdit={handleEdit}/>
        <ProblemNeedsSection data={formData} handleEdit={handleEdit}/>
        <EmergencyContactSection data={formData} handleEdit={handleEdit}/>
        <ApplicationDetailsSection data={formData} handleEdit={handleEdit}/>

      </Box>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
        </div>     
      </div>
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
    
  );
}