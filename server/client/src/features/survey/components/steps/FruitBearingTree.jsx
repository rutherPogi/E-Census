import { useFormContext } from "../../pages/FormContext";
import { TREE_TYPES } from "../../utils/constants"
import { formatCurrency } from "../../utils/formatter";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextInput } from "../others/FormFields";
import { Snackbar, Alert } from '@mui/material';

export default function FruitBearingTree({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [values, setValues] = useState(() => {
    const existingData = formData.fruitBearingTree?.tree || {};
    return Object.fromEntries(TREE_TYPES.map(type => [
      type, 
      typeof existingData[type] === 'string' ? existingData[type] : ''
    ]));
  });

  const [errors, setErrors] = useState(
    Object.fromEntries(TREE_TYPES.map(type => [type, false]))
  );

  useEffect(() => {
    if (formData.fruitBearingTree && formData.fruitBearingTree.tree) {
      // Only use the tree property from fruitBearingTree
      setValues(prev => {
        const newValues = { ...prev };
        
        // Ensure we're getting data from the tree object
        const treeData = formData.fruitBearingTree.tree;
        
        // Only update fields that exist in TREE_TYPES
        TREE_TYPES.forEach(field => {
          if (typeof treeData[field] === 'string') {
            newValues[field] = treeData[field];
          }
        });
        
        return newValues;
      });
    }
  }, [formData.fruitBearingTree]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
  
    const hasValue = Object.values(values).some(val => {
      // Check if val is a string before trying to use replace
      if (typeof val !== 'string') return false;
      return parseFloat(val.replace(/,/g, '')) > 0;
    });
  
    if (!hasValue) { isValid = false; }
  
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    if (Number(plainNumber) > 9999) {
      setErrors(prev => ({ ...prev, [field]: 'cannot exceed 9999' }));
      return;
    }

    setErrors(prev => ({ ...prev, [field]: false }));
    
    setValues(prevValues => {
      const updatedValues = {
        ...prevValues,
        [field]: formatCurrency(plainNumber)
      };

      return updatedValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage("Please fill in at least one field!");
      setSnackbarOpen(true);
      return;
    } 

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = '0';
        }
    });

    updateFormData('fruitBearingTree', { tree: processedValues });
    console.log("Current Form Values:", processedValues);

    handleNext();
  };
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>Fruit Bearing Trees</div>
      <div className='responsive-form'>
        {TREE_TYPES.map((field) => (
          <TextInput
            key={field}
            label={field}
            value={values[field]}
            onChange={handleChange(field)}
            error={errors[field]}
            helperText={errors[field] || `No. of ${field} tree`}
          />
        ))}
      </div>
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
  );
}