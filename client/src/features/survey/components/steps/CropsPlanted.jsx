import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { SizeInput } from "../others/FormFields";
import { useFormContext } from "../../pages/FormContext";
import { CROP_TYPES } from "../../utils/constants";



export default function CropsPlanted({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const [values, setValues] = useState(() => {
    const existingData = formData.cropsPlanted?.crops || {};
    return Object.fromEntries(CROP_TYPES.map(type => [
      type, 
      existingData[type] || ''
    ]));
  }); 
 
  const [errors, setErrors] = useState(
    Object.fromEntries(CROP_TYPES.map(type => [type, false]))
  );

  useEffect(() => {
    if (formData.cropsPlanted) {
      setValues(prev => ({ ...prev, ...formData.cropsPlanted }));
    }
  }, [formData.cropsPlanted]);


  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    if (Number(plainNumber) > 999) {
      setErrors(prev => ({ ...prev, [field]: 'cannot exceed 999' }));
      return;
    }

    setErrors(prev => ({ ...prev, [field]: false }));
    setValues(prevValues => {
      const updatedValues = { ...prevValues, [field]: plainNumber };
      return updatedValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
        if (value === '' || value === null) {
          processedValues[key] = '0';
        }
    });

    updateFormData('cropsPlanted', { crops: processedValues });
    console.log("Current Form Values:", processedValues);

    handleNext();
  };
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>CROPS PLANTED</div>
      <div className='responsive-form'>
        {CROP_TYPES.map((field) => (
          <SizeInput
            key={field}
            label={field}
            name={field}
            value={values[field]}
            onChange={handleChange(field)}
            error={errors[field]}
            helperText={errors[field] || `No. of ${field} crops`}
          />
        ))}
      </div>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
        </div>      
      </div>
    </div>
  );
}