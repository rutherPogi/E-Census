import { useFormContext } from "../../pages/FormContext";
import { useState, useEffect } from "react";
import { CurrencyInput } from "../others/FormFields"
import { formatCurrency } from '../../utils/formatter'
import { MONTHLY_EXPENSES } from '../../utils/constants';
import { Snackbar, Alert } from '@mui/material';

export default function MonthlyExpenses({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [values, setValues] = useState(() => {
    const existingData = formData.monthlyExpenses?.expenses || {};
    return Object.fromEntries(MONTHLY_EXPENSES.map(type => [
      type, 
      typeof existingData[type] === 'string' ? existingData[type] : ''
    ]));
  }); 

  const [errors, setErrors] = useState(
    Object.fromEntries(MONTHLY_EXPENSES.map(type => [type, false]))
  );

  const [monthlyTotal, setMonthlyTotal] = useState(() => {
    const existingData = formData.monthlyExpenses?.expenses || {};
    return Object.values(existingData).reduce((sum, val) => 
      sum + (parseFloat(val?.replace(/,/g, '')) || 0), 0
    );
  });

  useEffect(() => {
      if (formData.monthlyExpenses && formData.monthlyExpenses.expenses) {
        setValues(prev => {
          const newValues = { ...prev };
          
          // Ensure we're getting the correct data structure
          const expenses = formData.monthlyExpenses.expenses;
          
          MONTHLY_EXPENSES.forEach(field => {
            if (typeof expenses[field] === 'string') {
              newValues[field] = expenses[field];
            }
          });
          
          return newValues;
        });
      }
    }, [formData.monthlyExpenses]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const hasValue = Object.values(values).some(val => 
      parseFloat(val.replace(/,/g, '')) > 0
    );

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
    
    if (Number(plainNumber) > 999999999) {
      setErrors(prev => ({ ...prev, [field]: 'Total Amount cannot exceed ₱999,999,999' }));
      return;
    }

    setErrors(prev => ({ ...prev, [field]: false }));
    
    setValues(prevValues => {
      const updatedValues = {
        ...prevValues,
        [field]: formatCurrency(plainNumber)
      };

      const newMonthlyTotal = Object.values(updatedValues).reduce((sum, val) => {
        // Ensure val is a string before calling replace
        const valStr = typeof val === 'string' ? val : '0';
        return sum + (parseFloat(valStr.replace(/,/g, '')) || 0);
      }, 0);
      
      setMonthlyTotal(newMonthlyTotal);
      return updatedValues;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbarMessage("Please fill in at least one!");
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

    updateFormData('monthlyExpenses', { expenses: processedValues, monthlyTotal });
    console.log(processedValues)

    handleNext();
  };
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>AVERAGE MONTHLY EXPENSES</div>
      <div className='responsive-form'>
        {MONTHLY_EXPENSES.map((field) => (
          <CurrencyInput
            key={field}
            label={field}
            value={values[field]}
            onChange={handleChange(field)}
            error={errors[field]}
            helperText = {errors[field] || `Enter ${field} expenses`}
          />
        ))}
          <CurrencyInput
            label = "Total Average Monthly Expenses"
            value = {`${formatCurrency(monthlyTotal.toString())}`}
            variant = {'filled'}
          />
      </div>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <button type='button' className="btn cancel-btn" onClick={handleBack}>Back</button>
          <button type='button' className="btn submit-btn" onClick={handleSubmit}>Next</button>
        </div>     
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
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