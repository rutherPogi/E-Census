import { useState } from "react";
import { formatters, formatCurrency } from '../utils/formatter'; 
import dayjs from 'dayjs';



export const useFormValidation = (
  initialValues,
  required = false,
  requiredFields
) => {

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  


  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if(required) {

      requiredFields.forEach(key => {
        const value = values[key];
          if (!value) {
            newErrors[key] = 'This field is required';
            isValid = false;
            console.log(`Field "${key}" is empty. Value:`, value);
          }
      });
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle changes for text inputs and dropdowns
  const handleChange = (field) => (e, newValue) => {
    let value;
    
    if (newValue?.value !== undefined) {
      // For dropdown/autocomplete
      value = newValue.value;
    } else if (e.target.type === 'checkbox') {
      // For checkbox inputs
      value = e.target.checked;
    } else {
      // For regular text inputs
      value = e.target.value;
    }
    
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleContactChange = (field) => (e) => {
    let value = e.target.value;
    
    value = formatters.phone(value, 'mobile');
    
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  // Handle date changes with age calculation
  const handleDateChange = (field, calculateAge = false) => (dateValue) => {

    const parsedDate = dayjs(dateValue);

    if (!parsedDate) {
      setValues(prev => ({ 
        ...prev, 
        [field]: null,
        ...(calculateAge && { age: '' })
      }));
      return;
    }

    if (calculateAge && parsedDate.isAfter(dayjs())) {
      setErrors(prev => ({ ...prev, [field]: 'Date cannot be in the future' }));
      setValues(prev => ({ ...prev, [field]: parsedDate, age: '' }));
      return;
    }

    setErrors(prev => ({ ...prev, [field]: false }));

    if (calculateAge) {
      const birthdate = parsedDate.toDate();
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();
      
      const monthDiff = today.getMonth() - birthdate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
      }
    
      setValues(prev => ({ 
        ...prev, 
        [field]: parsedDate,
        age: age >= 0 ? age : '' 
      }));
    } else {
      setValues(prev => ({ ...prev, [field]: parsedDate }));
    }
  };

  // Handle currency/income fields
  const handleIncomeChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    // Validate numeric input
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    // Validate maximum value
    if (Number(plainNumber) > 999999999) {
      setErrors(prev => ({ ...prev, [field]: 'Amount cannot exceed ₱999,999,999' }));
      return;
    }
    
    // Clear errors and format the currency
    setErrors(prev => ({ ...prev, [field]: false }));
    setValues(prev => ({ ...prev, [field]: formatCurrency(plainNumber) }));
  };

  const handleNumChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    if (Number(plainNumber) > 999) {
      setErrors(prev => ({ ...prev, [field]: `can't exceed 999` }));
      return;
    }

    setErrors(prev => ({ ...prev, [field]: false }));
    setValues(prev => ({ ...prev, [field]: plainNumber }));
  };

  // Process form values before submission
  const processValues = (defaultValueForEmpty = 'N/A', defaultValueForMoney = '0') => {
    
    const processedValues = { ...values };

    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
      if (value === '' || value === null) {
        if (key === 'monthlyIncome' || key.includes('Income') || key.includes('Amount')) {
          processedValues[key] = defaultValueForMoney;
        } else {
          processedValues[key] = defaultValueForEmpty;
        }
      }
    });

    return processedValues;
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    validateForm,
    handleChange,
    handleContactChange,
    handleDateChange,
    handleIncomeChange,
    handleNumChange,
    processValues
  };
};