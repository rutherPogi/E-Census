import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from '@mui/material';

import { useFormContext } from "../../pages/FormContext";
import { useSurveyData } from "../../hooks/useSurveyData";
import { useNotification } from "../../hooks/useNotification";

import { post, put } from '../../../../utils/api/apiService';
import { Notification, FormButtons } from '../../../../components/common';

import DisplaySurveySections from "../others/DisplaySurveySections/DisplaySurveySections";

export default function DisplaySurvey({ handleBack, handleEdit, isEditing = false, isUpdating = false }) {

  const navigate = useNavigate();
  const params = useParams();
  const surveyID = params.id;

  const [initialFetchDone, setInitialFetchDone] = useState(false);

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

      if(isUpdating) {
        console.log('SURVEY DATA:', processedFormData);
        formDataToSend.append('surveyData', JSON.stringify(processedFormData));
        await put('/surveys/update-survey', formDataToSend, true);
        showNotification('Survey updated successfully!', 'success');
      } else {
        console.log('SURVEY DATA:', processedFormData);
        formDataToSend.append('surveyData', JSON.stringify(processedFormData));
        await post('/surveys/submit-survey', formDataToSend, true);
        showNotification('Survey submitted successfully!', 'success');
      }

      clearFormData();
      setTimeout(() => navigate('/main/survey'), 1000);
    
    } catch (error) {
      console.error('Error submitting survey:', error);
      
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
        <DisplaySurveySections formData={formData} handleEdit={handleEdit} />
      </Box> 

      <FormButtons 
        onBack={handleBack}
        onNext={handleSubmit}
        backLabel="Back"
        nextLabel={isUpdating ? 'Update' : 'Submit'}
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