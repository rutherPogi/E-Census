import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../../pages/FormContext";
import { NumberInput } from "../others/FormFields"



export default function Farmlots({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const [values, setValues] = useState({
    cultivation: '',
    pastureland: '',
    forestland: ''
  })

  const [errors, setErrors] = useState({
    cultivation: false,
    pastureland: false,
    forestland: false
  });

  useEffect(() => {
    if (formData.farmlots) {
      setValues(prev => ({ ...prev, ...formData.farmlots }));
    }
  }, [formData.farmlots]);

  const handleNumChange = (field) => (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const processedValues = { ...values };
    
        Object.keys(processedValues).forEach((key) => {
            const value = processedValues[key];
            if (value === '' || value === null) {
              processedValues[key] = '0';
          }
        });

    updateFormData('farmlots', processedValues);
    console.log("Current Form Values:", processedValues);

    handleNext();
  };

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>NO. OF FARM LOTS</div>
      <div className='responsive-details'>
        <NumberInput
          label="Cultivation"
          value={values.cultivation}
          onChange={handleNumChange('cultivation')}
          error={errors.cultivation}
          helperText={errors.cultivation || 'How many lots for cultivation?'}
          min={0}
        />
        <NumberInput
          label="Pastureland"
          value={values.pastureland}
          onChange={handleNumChange('pastureland')}
          error={errors.pastureland}
          helperText={errors.pastureland || 'How many lots for pastureland?'}
          min={0}
        />
        <NumberInput
          label="Forestland"
          value={values.forestland}
          onChange={handleNumChange('forestland')}
          error={errors.forestland}
          helperText={errors.forestland || 'How many lots for forestland?'}
          min={0}
        />
      </div>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
        </div>     
      </div>
    </div>
  )
}