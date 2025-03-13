import { useFormContext } from "../../pages/FormContext";
import { useState, useEffect } from "react";
import { TextInput } from "../others/FormFields";
import { Snackbar, Alert } from '@mui/material';


export default function CommunityIssue({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const [values, setValues] = useState({ issue: formData.issue || '' })
  const [errors, setErrors] = useState({issue: false});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (formData.communityIssues) {
      setValues(prev => ({
        ...prev,
        ...formData.communityIssues
      }));
    }
  }, [formData.communityIssues]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { issue: false };
  
    if (!values.issue.trim()) {
      newErrors.issue = "This field is required.";
      isValid = false;
    }
  
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (field) => (e, newValue) => {
    const value = newValue?.value || e.target.value;
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateForm()) {
      setSnackbarMessage("Please fill in all required fields");
      setSnackbarOpen(true);
      return;
    };

    updateFormData('communityIssues', values);
    console.log("Current Form Values:", values);

    handleNext()
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>ISSUES/PROBLEMS IN THE COMMUNITY</div>
      <form id='survey-form' className='responsive-details' onSubmit={handleSubmit}>
        <TextInput
          label='Issues/Problems in the community'
          value={values.issue}
          onChange={handleChange('issue')}
          error={errors.issue}
          helperText={errors.issue || 'Enter what are the issues/problem in the community.'}
          multiline
        />
      </form>
      <div className='form-buttons'>
          <div className='form-buttons-right'>
            <button type='button' className="btn cancel-btn" onClick={handleBack}>Back</button>
            <button type='button' className="btn submit-btn" onClick={handleSubmit}>Next</button>
          </div>     
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}