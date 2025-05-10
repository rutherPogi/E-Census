import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import { ArrowBack } from "@mui/icons-material";

import { useFormContext } from "../../pages/FormContext";
import { useSurveyData } from "../../hooks/useSurveyData";
import { useNotification } from "../../hooks/useNotification";

import { post, put } from '../../../../utils/api/apiService';
import { saveSurveyToDB, deleteSurveyFromDB } from '../../../../utils/surveyStorage';
import { Notification, FormButtons } from '../../../../components/common';

import DisplaySurveySections from "../others/DisplaySurveySections/DisplaySurveySections";

export default function DisplaySurvey({ 
  handleRestart,
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditing || isViewing); // Initialize as true if we're editing
  const [fetchError, setFetchError] = useState(null);

  const { formData, clearFormData } = useFormContext();
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
      setIsLoading(true);
      fetchSurveyData()
        .then(() => {
          setInitialFetchDone(true);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching survey data:', err);
          setInitialFetchDone(true);
          setIsLoading(false);
          setFetchError(err.message || 'Failed to load survey data');
          showNotification('Error loading survey data', 'error');
        });
    }
  }, [isEditing, initialFetchDone, fetchSurveyData, showNotification]);

  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    const processedFormData = { ...formData };
        
  
    try {
      const formDataToSend = new FormData();
      
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
  
      if (isUpdating) {
        console.log('UPDATING...', processedFormData);
        await put('/surveys/update', formDataToSend, true);
        showNotification('Survey updated successfully!', 'success');
      } else {
        console.log('SUBMITTING...', processedFormData);
        await post('/surveys/submit', formDataToSend, true);
        showNotification('Survey submitted successfully!', 'success');
      }
  
      setTimeout(() => handleRestart(), 1000);
      clearFormData();
    } catch (error) {
      console.error('Error submitting survey:', error);
      showNotification('Survey submission failed. Saving data locally...', 'error');
  
      try {
        const id = `local-${Date.now()}`;
        console.log('Saving locally with ID:', id);
        await saveSurveyToDB(id, processedFormData);
        console.log('Successfully saved to IndexedDB');
        showNotification('Survey saved locally', 'info');
        setTimeout(() => handleRestart(), 1000);
        clearFormData();
      } catch (err) {
        console.error('Failed to save locally:', err);
        showNotification('Failed to save locally', 'error');
      }
  
      if (error.response) {
        showNotification(`Server error: ${error.response.data.message || 'Unknown error'}`, 'error');
      } else if (error.request) {
        showNotification('Connection issue. Your data has been saved locally.', 'info');
      } else {
        showNotification(`Unexpected error: ${error.message}`, 'error');
      }
    } finally {
      // Reset submission state regardless of success or failure
      setIsSubmitting(false);
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
          {isLoading ? 'Loading survey...' : `Survey #${formData?.surveyData?.surveyID || ''}`}
        </Typography>
        {isLoading && (
          <CircularProgress 
            size={24} 
            sx={{ ml: 2 }}
          />
        )}
      </Box> 

      <Box>
        <DisplaySurveySections 
          formData={formData} 
          handleEdit={handleEdit} 
          isViewing={isViewing}
          isLoading={isLoading}
          error={fetchError}
        />

        {!isViewing && (!isLoading && (
          <FormButtons
            onBack={handleBack} 
            onNext={handleSubmit} 
            backLabel='Back' 
            nextLabel={isUpdating && !firstMount ? 'Update' : isSubmitting ? 'Submitting' : 'Submit'}
            nextDisabled={firstMount || isSubmitting}
            isLoading={isSubmitting}
          />
        ))}

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