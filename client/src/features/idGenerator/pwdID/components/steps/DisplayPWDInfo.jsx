import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button } from '@mui/material';

import { post, put } from '../../../../../utils/api/apiService';

import { Notification, FormButtons } from "../../../../../components/common";
import { DisplayInfoSections } from '../others/DisplaySection/DisplaySection';

import { useFormContext } from "../others/FormContext";
import { useNotification } from '../../hooks/useNotification';
import { useTransformData } from "../../hooks/useTransformData";



export default function DisplayPWDInfo ({ 
  handleBack, 
  handleNext, 
  handleEdit, 
  isEditing = false, 
  isUpdating = false,
  firstMount = false
}) {

  const navigate = useNavigate();

  const { pwdApplicationID } = useParams();

  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const { formData, clearFormData } = useFormContext();
  const { fetchPersonData } = useTransformData(pwdApplicationID, null, true);

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  useEffect(() => {
    if (isEditing && !initialFetchDone) {
      console.log('Fetching application data for editing');
      fetchPersonData()
        .then(() => {
          setInitialFetchDone(true);
        })
        .catch(err => {
          console.error('Error fetching application data:', err);
          setInitialFetchDone(true);
        });
    }
  }, [isEditing, initialFetchDone, fetchPersonData]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      const processedFormData = { ...formData };

      formDataToSend.append('photoID', formData.pwdMedia.photoID);
      formDataToSend.append('signature', formData.pwdMedia.signature);

      //delete formData.pwdMedia.photoIDPreview;

      if(isUpdating) {
        console.log('UPDATING...');
        console.log('APPLICATION DATA:', processedFormData);
        formDataToSend.append('applicationData', JSON.stringify(processedFormData));
        await put('/pwdID/update', formDataToSend, true);
        showNotification('Application UPDATED successfully!', 'success');
      } else {
        console.log('SUBMITING...');
        console.log('APPLICATION DATA:', processedFormData);
        formDataToSend.append('applicationData', JSON.stringify(processedFormData));
        await post('/pwdID/submit', formDataToSend, true);
        showNotification('Application SUBMITTED successfully!', 'success');
      }

      clearFormData();
      setTimeout(() => navigate('/main/generate-id/pwd'), 1000);
    } catch (error) {
      console.error('Error submitting application:', error);
        
      if (error.response) {
        showNotification(`Server error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        showNotification('No response from server. Please check your connection.');
      } else {
        showNotification(`Error preparing request: ${error.message}`);
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
        
        <DisplayInfoSections formData={formData} handleEdit={handleEdit}/>
        
      </Box>
      <FormButtons
        onBack = {handleBack} 
        onNext = {handleSubmit} 
        backLabel = 'Back' 
        nextLabel = {isUpdating ? 'Update' : 'Submit'}
        nextDisabled = { firstMount }
      />
      <Notification
        snackbarMessage={snackbarMessage} 
        snackbarOpen={snackbarOpen} 
        setSnackbarOpen={setSnackbarOpen} 
        severity={severity}
      />
    </div>
    
  );
}