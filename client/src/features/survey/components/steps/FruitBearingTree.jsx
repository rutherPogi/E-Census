import { useState, useEffect } from "react";
import { Button } from '@mui/material';

import { useFormContext } from "../../pages/FormContext";
import { TREE_TYPES } from "../../utils/constants"
import { formatCurrency } from "../../utils/formatter";
import { TextInput } from "../others/FormFields";



export default function FruitBearingTree({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

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
      setValues(prev => {
        const newValues = { ...prev };
        const treeData = formData.fruitBearingTree.tree;
        
        TREE_TYPES.forEach(field => {
          if (typeof treeData[field] === 'string') {
            newValues[field] = treeData[field];
          }
        });
        
        return newValues;
      });
    }
  }, [formData.fruitBearingTree]);


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

    updateFormData('fruitBearingTree', { tree: processedValues });
    console.log("Current Form Values:", processedValues);

    handleNext();
  };
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>FRUIT BEARING TREES</div>
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
          <Button variant='outlined' onClick={handleBack} sx={{ width: '100%' }}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} sx={{ width: '100%' }}>Next</Button>
        </div>      
      </div>
    </div>
  );
}