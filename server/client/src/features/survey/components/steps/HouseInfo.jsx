import { useFormContext } from "../../pages/FormContext";
import { useState, useEffect } from "react";
import { Snackbar, Alert } from '@mui/material';
import { 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel, 
  FormHelperText
} from "@mui/material";


export default function HouseInfo({ handleBack, handleNext}) {

  const { formData, updateFormData } = useFormContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [values, setValues] = useState({
    houseCondition: formData.houseCondition || '',
    houseStructure: formData.houseStructure || ''
  })

  const [errors, setErrors] = useState({
    houseCondition: false,
    houseStructure: false
  });

  useEffect(() => {
    if (formData.houseInfo) {
      setValues({
        houseCondition: formData.houseInfo.houseCondition || "",
        houseStructure: formData.houseInfo.houseStructure || ""
      });
    }
  }, [formData.houseInfo]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
    // Clear error when field is filled
    if (value) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  

  const validateForm = () => {
    const newErrors = {
      houseCondition: !values.houseCondition,
      houseStructure: !values.houseStructure
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage("Please fill in all required fields");
      setSnackbarOpen(true);
      return;
    }

    updateFormData('houseInfo', values);

    console.log("Current Form Values:", values);
    console.log("All Form Data:", formData);

    handleNext();
  }; 

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>HOUSING CONDITIONING AND STRUCTURE</div>
      <form id="survey-form" className="responsive-details" onSubmit={handleSubmit}>
        <FormControl 
          component="fieldset" 
          error={errors.houseCondition} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Housing Conditioning</FormLabel>
          <RadioGroup
            name="houseCondition"
            value={values.houseCondition}
            onChange={handleChange}
          >
            <FormControlLabel value="Own" control={<Radio />} label="Own" />
            <FormControlLabel value="Rent" control={<Radio />} label="Rent" />
            <FormControlLabel value="Caretaker" control={<Radio />} label="Caretaker" />
            <FormControlLabel value="Share" control={<Radio />} label="Share" />
          </RadioGroup>
          {errors.houseCondition && (
            <FormHelperText>Please select a housing condition</FormHelperText>
          )}
        </FormControl>

        <FormControl 
          component="fieldset" 
          error={errors.houseStructure} 
          fullWidth 
          margin="normal"
        >
          <FormLabel component="legend">Housing Structure</FormLabel>
          <RadioGroup
            name="houseStructure"
            value={values.houseStructure}
            onChange={handleChange}
          >
            <FormControlLabel value="Concrete" control={<Radio />} label="Concrete" />
            <FormControlLabel value="Semi Concrete" control={<Radio />} label="Semi Concrete" />
            <FormControlLabel value="Light Materials" control={<Radio />} label="Light Materials" />
            <FormControlLabel value="Make Shift" control={<Radio />} label="Make Shift" />
          </RadioGroup>
          {errors.houseStructure && (
            <FormHelperText>Please select a housing structure</FormHelperText>
          )}
        </FormControl>
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