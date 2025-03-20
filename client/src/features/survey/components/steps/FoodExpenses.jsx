import { useState, useEffect } from "react";
import { Button, } from '@mui/material';

import { useFormContext } from "../../pages/FormContext";
import { CurrencyInput } from "../others/FormFields"
import { formatCurrency } from '../../utils/formatter'
import { FOOD_EXPENSES } from '../../utils/constants';


export default function FoodExpenses({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const [values, setValues] = useState(() => {
    const existingData = formData.foodExpenses?.expenses || {};
    return Object.fromEntries(FOOD_EXPENSES.map(type => [
      type, 
      typeof existingData[type] === 'string' ? existingData[type] : ''
    ]));
  }); 

  const [errors, setErrors] = useState(
    Object.fromEntries(FOOD_EXPENSES.map(type => [type, false]))
  );

  const [foodTotal, setFoodTotal] = useState(() => {
    const existingData = formData.foodExpenses?.expenses || {};
    return Object.values(existingData).reduce((sum, val) => 
      sum + (parseFloat(val?.replace(/,/g, '')) || 0), 0
    );
  });

  useEffect(() => {
    if (formData.foodExpenses && formData.foodExpenses.expenses) {
      setValues(prev => {
        const newValues = { ...prev };
        
        // Ensure we're getting the correct data structure
        const expenses = formData.foodExpenses.expenses;
        
        FOOD_EXPENSES.forEach(field => {
          if (typeof expenses[field] === 'string') {
            newValues[field] = expenses[field];
          }
        });
        
        return newValues;
      });
    }
  }, [formData.foodExpenses]);

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

      const newFoodTotal = Object.values(updatedValues).reduce((sum, val) => {
        const valStr = typeof val === 'string' ? val : val?.toString() || '0';
        return sum + (parseFloat(valStr.replace(/,/g, '')) || 0);
      }, 0);
      
      setFoodTotal(newFoodTotal);
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

    updateFormData('foodExpenses', { expenses: processedValues, foodTotal });
    console.log(processedValues)

    handleNext();
  };

  
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>FOOD EXPENSES</div>
      <div className='responsive-form'>
        {FOOD_EXPENSES.map((field) => (
          <CurrencyInput
            key={field}
            label={field}
            value={values[field]}
            onChange={handleChange(field)}
            error={errors[field]}
            helperText = {errors[field] || `Enter ${field} expenses`}
            placeholder={'0.00'}
          />
        ))}
          <CurrencyInput
            label = "Total Monthly Food Expenses"
            value = {`${formatCurrency(foodTotal.toString())}`}
            variant = {'filled'}
          />
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