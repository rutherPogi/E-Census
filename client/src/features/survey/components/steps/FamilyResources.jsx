import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../../pages/FormContext";
import { CurrencyInput } from "../others/FormFields"
import { formatCurrency } from '../../utils/formatter'
import { FAMILY_RESOURCES } from '../../utils/constants';



export default function FamilyResources({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const [values, setValues] = useState(() => {
    const existingData = formData.familyResources?.resources || {};
    return Object.fromEntries(FAMILY_RESOURCES.map(type => [
      type, 
      existingData[type] || ''
    ]));
  });

  const [errors, setErrors] = useState(
    Object.fromEntries(FAMILY_RESOURCES.map(type => [type, false]))
  );

  useEffect(() => {
    if (formData.familyResources) {
      setValues(prev => ({ ...prev, ...formData.familyResources }));
    }
  }, [formData.familyResources]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    if (Number(plainNumber) > 999999999) {
      setErrors(prev => ({ ...prev, [field]: 'Total Amount cannot exceed ₱999,999,999' }));
      return;
    }

    setErrors(prev => ({ ...prev, [field]: false }));
    
    setValues(prevValues => {
      const updatedValues = { ...prevValues, [field]: formatCurrency(plainNumber) };

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

    updateFormData('familyResources', { resources: processedValues });
    console.log("Current Form Values:", processedValues);

    handleNext();
  };
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>FAMILY RESOURCES</div>
      <div className='responsive-form'>
        {FAMILY_RESOURCES.map((field) => (
          <CurrencyInput
            key={field}
            label={field}
            name={field}
            value={values[field]}
            onChange={handleChange(field)}
            error={errors[field]}
            helperText={errors[field] || `Amount of ${field} resources`}
            placeholder={'0.00'}
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