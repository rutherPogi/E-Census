import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";

import { useFormContext } from "../../pages/FormContext";
import { useSurveyData } from "../../hooks/useSurveyData";
import { useNotification } from "../../hooks/useNotification";

import { post, put } from '../../../../utils/api/apiService';
import { saveSurveyToDB, deleteSurveyFromDB } from '../../../../utils/surveyStorage';
import { Notification, FormButtons } from '../../../../components/common';

import DisplaySurveySections from "../others/DisplaySurveySections/DisplaySurveySections";




export default function DisplaySurvey({ 
  handleBack, 
  handleEdit, 
  isEditing = false, 
  isUpdating = false,
  firstMount = false,
  isViewing = false 
}) {

  const navigate = useNavigate();
  const params = useParams();
  const surveyID = params.id;

  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const { formData, setEntireFormData, clearFormData } = useFormContext();
  const { fetchSurveyData } = useSurveyData(surveyID);

  const { 
    snackbarOpen, 
    snackbarMessage, 
    severity, 
    showNotification, 
    setSnackbarOpen 
  } = useNotification();

  useEffect(() => {
    if (isEditing && !initialFetchDone) {
      console.log('Fetching survey data for editing');
      fetchSurveyData()
        .then(() => {
          setInitialFetchDone(true);
        })
        .catch(err => {
          console.error('Error fetching survey data:', err);
          setInitialFetchDone(true);
        });
    }
  }, [isEditing, initialFetchDone, fetchSurveyData]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      
      const processedFormData = { ...formData };

     
      await saveSurveyToDB(`local-${Date.now()}`, processedFormData);
      
      if (formData.houseInfo?.houseImages && formData.houseInfo.houseImages.length > 0) {

        formData.houseInfo.houseImages.forEach((imageObj) => {
          if (imageObj.file) {
            formDataToSend.append('houseImages', imageObj.file);
          }
        });
        
        processedFormData.houseInfo.houseImages = formData.houseInfo.houseImages.map(img => ({
          houseImageID: img.houseImageID,
          title: img.title
        }));
      }

      formDataToSend.append('surveyData', JSON.stringify(processedFormData));

      if(isUpdating) {
        console.log('SURVEY DATA:', processedFormData);
        await put('/surveys/update', formDataToSend, true);
        showNotification('Survey updated successfully!', 'success');
      } else {
        console.log('SURVEY DATA:', processedFormData);
        await post('/surveys/submit', formDataToSend, true);
        showNotification('Survey submitted successfully!', 'success');
      }

      // Delete local data only if server confirms
      await deleteSurveyFromDB(`local-${Date.now()}`);

      clearFormData();
      setTimeout(() => navigate('/main/survey/add'), 1000);
    } catch (error) {
      console.error('Error submitting survey:', error);
      showNotification('Survey submission failed. Data saved for retry.', 'error');
      if (error.response) {
        showNotification(`Server error: ${error.response.data.message || 'Unknown error'}`, 'error');
      } else if (error.request) {
        showNotification('Your answers have been saved locally. Please check your connection and resubmit later.', 'info');
      } else {
        showNotification(`Error preparing request: ${error.message}`, 'error');
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
      }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          size="medium"
          sx={{ mr: 1 }}
        >
          <ArrowBack/>
        </IconButton>
        <Typography>
          Survey #{formData.surveyData.surveyID}
        </Typography>
      </Box> 

      <Box>
        <DisplaySurveySections formData={formData} handleEdit={handleEdit} isViewing={isViewing}/>

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