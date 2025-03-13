import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from '@mui/material';

import { useFormContext } from "../others/FormContext";
import { post } from '../../../../../utils/api/apiService';

import { AccomplishedBySection, ContactInfoSection, DisabilityInfoSection, 
         FamilyBackgroundSection, IDReferenceSection, OrganizationalInfoSection, 
         OtherInfoSection, PersonalInfoSection, PhotoIDSection, ProfessionalInfoSection, 
         ReportingUnitSection } from "../../components/others/DisplaySection";


export default function DisplayPWDInfo({ handleBack, handleNext, handleEdit }) {

  const navigate = useNavigate();
  const { formData, clearFormData } = useFormContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Submitting form data:', formData);
      const response = await post('/pwdID/submit-pwdID', formData);
      
      if (response.success) {
        setSnackbarMessage("PWD Application submitted!");
        setSeverity('success');
        setSnackbarOpen(true);

        clearFormData();
        navigate('/main/survey');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      if (error.response) {
        setSnackbarMessage(`Server error: ${error.response.data.message || 'Unknown error'}`);
        setSeverity('error');
        setSnackbarOpen(true);
      } else if (error.request) {
        setSnackbarMessage('No response from server. Please check your connection.');
        setSeverity('error');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage(`Error preparing request: ${error.message}`);
        setSeverity('error');
        setSnackbarOpen(true);
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
        <DisabilityInfoSection data={formData} handleEdit={handleEdit}/>
        <ContactInfoSection data={formData} handleEdit={handleEdit}/>
        <ProfessionalInfoSection data={formData} handleEdit={handleEdit}/>
        <OrganizationalInfoSection data={formData} handleEdit={handleEdit}/>
        <IDReferenceSection data={formData} handleEdit={handleEdit}/>
        <FamilyBackgroundSection data={formData} handleEdit={handleEdit}/>
        <AccomplishedBySection data={formData} handleEdit={handleEdit}/>
        <OtherInfoSection data={formData} handleEdit={handleEdit}/>
        <ReportingUnitSection data={formData} handleEdit={handleEdit}/>
        <PhotoIDSection data={formData} handleEdit={handleEdit}/>
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