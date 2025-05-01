import { useState } from "react";
import { formatters, formatCurrency } from '../utils/formatter'; 
import dayjs from 'dayjs';

import { AFFILIATION_REQUIRED_FIELDS, IPULA_REQUIRED_FIELDS, 
         TRANSIENT_REQUIRED_FIELDS } from "../utils/requiredFields";



export const useFormValidation = (
  initialValues,
  required = false,
  baseRequiredFields
) => {

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  

  const getRequiredFields = () => {
    let updatedRequiredFields = [...baseRequiredFields];

    if (values.age >= 15 && values.age <= 24) {
      updatedRequiredFields = [...updatedRequiredFields, 'youthStatusRequired'];
    }

    if (values.isAffiliated) {
      updatedRequiredFields = [...updatedRequiredFields, ...AFFILIATION_REQUIRED_FIELDS];
    }
    if (values.isIpula) {
      updatedRequiredFields = [...updatedRequiredFields, ...IPULA_REQUIRED_FIELDS];
    }
    if (values.isTransient) {
      updatedRequiredFields = [...updatedRequiredFields, ...TRANSIENT_REQUIRED_FIELDS];
    }
    if(values.isRegistered) {
      updatedRequiredFields = [
        ...updatedRequiredFields, 
        'transientDateRegistered'
      ];
    }    

    return updatedRequiredFields;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if(required) {
      const requiredFields = getRequiredFields();

      requiredFields.forEach(key => {
        // Special handling for youth status fields
        if (key === 'youthStatusRequired') {
          if (values.age >= 15 && values.age <= 24 && !values.isOSY && !values.inSchool) {
            newErrors.isOSY = 'Select at least one youth status option';
            newErrors.inSchool = 'Select at least one youth status option';
            isValid = false;
            console.log('Youth status is required for age 18-24');
          }
        } else {
          const value = values[key];
          if (!value) {
            newErrors[key] = 'This field is required';
            isValid = false;
            console.log(`Field "${key}" is empty. Value:`, value);
          }
        }
      });

      // Add validation to ensure that isOSY and inSchool are not both selected
      if (values.isOSY && values.inSchool) {
        newErrors.isOSY = 'Cannot select both options';
        newErrors.inSchool = 'Cannot select both options';
        isValid = false;
      }
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
      if (value.length > 50) {
        value = value.slice(0, 50); // ✂️ Limit to 50 characters
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

  const handleIDChange = (field) => (e) => {
    let value = e.target.value;
  
    if (field === 'philhealthNumber') {
      // Remove non-numeric characters
      value = value.replace(/\D/g, '');
  
      // Limit to max 12 digits
      if (value.length > 12) value = value.slice(0, 12);
  
      // Format: 123-456-789-000
      const parts = value.match(/.{1,3}/g);
      value = parts ? parts.join('-') : value;
    }
  
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
    handleIDChange,
    handleDateChange,
    handleIncomeChange,
    handleNumChange,
    processValues
  };
};