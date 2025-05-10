import { useState } from "react";
import { formatters, formatCurrency } from '../utils/formatter'; 
import dayjs from 'dayjs';


export const useFormValidation = (
  initialValues,
  required = false,
  baseRequiredFields
) => {

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const getRequiredFields = () => {
    let updatedRequiredFields = [...baseRequiredFields];

    return updatedRequiredFields;
  };
  


  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
  
    if (values.emailAddress && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(values.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
      isValid = false;
    }
  
    if (values.landlineNumber && !/^0\d{2}-?\d{3}-?\d{4}$/.test(values.landlineNumber)) {
      newErrors.landlineNumber = 'Please enter a valid landline number';
      isValid = false;
    }
  
    if(required) {
      const requiredFields = getRequiredFields();
  
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
    
    if (newValue === null) {
      value = '';
    } else if (newValue?.value !== undefined) {
      // For dropdown/autocomplete
      value = newValue.value;
    } else if (e.target.type === 'checkbox') {
      // For checkbox inputs
      value = e.target.checked;
    } else {
      // For regular text inputs
      value = e.target.value;
      if (field === 'causeSoloParent' || field === 'needsSoloParent'  ) {
        if (value.length > 200) {
          value = value.slice(0, 200); // ✂️ Limit to 50 characters
        }
      } else {
        if (value.length > 50) {
          value = value.slice(0, 50); // ✂️ Limit to 50 characters
        }
      }
      
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
  
    if (!parsedDate || !parsedDate.isValid()) {
      setValues(prev => ({ 
        ...prev, 
        [field]: null,
        ...(calculateAge && { age: '', formattedAge: '' })
      }));
      return;
    }
  
    if (calculateAge && parsedDate.isAfter(dayjs())) {
      setErrors(prev => ({ ...prev, [field]: 'Date cannot be in the future' }));
      setValues(prev => ({ ...prev, [field]: parsedDate, age: '', formattedAge: '' }));
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
  
      // Handle formattedAge for <1 year
      let formattedAge = '';
      if (age < 1) {
        const months = dayjs().diff(parsedDate, 'month');
        if (months === 0) {
          const weeks = dayjs().diff(parsedDate, 'week');
          formattedAge = weeks === 0 
            ? `${dayjs().diff(parsedDate, 'day')} day(s)` 
            : `${weeks} week(s)`;
        } else {
          formattedAge = `${months} month(s)`;
        }
      } else {
        formattedAge = `${age} year(s)`;
      }
  
      const formattedDate = parsedDate.format('YYYY-MM-DD'); 
      setValues(prev => ({ 
        ...prev, 
        [field]: formattedDate,
        age: age >= 0 ? age : '',
        formattedAge
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
    handleNumChange
  };
};