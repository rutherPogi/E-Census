import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, IconButton, Typography, Tabs, Tab } from '@mui/material';

import { post, put } from '../../../../../utils/api/apiService';

import { Notification, FormButtons } from "../../../../../components/common";
import { DisplayInfoSections } from '../others/DisplaySection/DisplaySection';

import { useFormContext } from "../others/FormContext";
import { useNotification } from '../../hooks/useNotification';
import { useTransformData } from "../../hooks/useTransformData";
import { ArrowBack } from "@mui/icons-material";



export default function DisplaySPInfo ({ 
  handleBack, 
  handleNext, 
  handleEdit, 
  isEditing = false, 
  isUpdating = false,
  firstMount = false,
  isViewing = false
}) {

  const navigate = useNavigate();

  const { spApplicationID } = useParams();

  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const { formData, updateFormData } = useFormContext();
  const { fetchPersonData } = useTransformData(spApplicationID, null, true);

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

      formDataToSend.append('photoID', formData.spMedia.photoID);
      formDataToSend.append('signature', formData.spMedia.signature);

      //delete formData.pwdMedia.photoIDPreview;

      let res;

      if(isUpdating && !firstMount) {
        console.log('UPDATING...');
        console.log('APPLICATION DATA:', processedFormData);
        formDataToSend.append('applicationData', JSON.stringify(processedFormData));
        res = await put('/soloParentID/update', formDataToSend, true);
        showNotification('Application UPDATED successfully!', 'success');
      } else {
        console.log('SUBMITING...');
        console.log('APPLICATION DATA:', processedFormData);
        formDataToSend.append('applicationData', JSON.stringify(processedFormData));
        res = await post('/soloParentID/submit', formDataToSend, true);
        showNotification('Application SUBMITTED successfully!', 'success');
      }
      console.log('Response:', res);

      updateFormData('personalInfo', {
        ...formData.personalInfo,
        soloParentIDNumber: res.spApplicationID
      });

      console.log('FormData:', formData.personalInfo.soloParentIDNumber );
      console.log('FormData:', formData.personalInfo );

      setTimeout(() => handleNext(), 1000);
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3}}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '1em',
          borderRadius: 2
        }}
      >
        <IconButton 
          onClick={() => navigate(-1)} 
          size="medium"
          sx={{ mr: 1 }}
        >
          <ArrowBack/>
        </IconButton>
        <Typography>
          Solo Parent Application #{formData.personalInfo.spApplicationID}
        </Typography>
      </Box>

      <Box>
        <DisplayInfoSections formData={formData} handleEdit={handleEdit} isViewing={isViewing}/>
        
        {!isViewing && (<FormButtons
          onBack = {handleBack} 
          onNext = {handleSubmit} 
          backLabel = 'Back' 
          nextLabel = {isUpdating && !firstMount ? 'Update' : 'Submit'}
          nextDisabled = { firstMount } 
        />)}

        <Notification
          snackbarMessage={snackbarMessage} 
          snackbarOpen={snackbarOpen} 
          setSnackbarOpen={setSnackbarOpen} 
          severity={severity}
        />
      </Box>
      
      
    </Box>
    
  );
}