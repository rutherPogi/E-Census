import { useState, useEffect } from "react";

export const useLivestockForm = (initialValues, formData, updateFormData) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(
    Object.fromEntries(
      Object.keys(initialValues).map(type => [
        type,
        { number: false, own: false, dispersal: false }
      ])
    )
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (formData.livestock) {
      setValues(prev => ({ ...prev, ...formData.livestock }));
    }
  }, [formData.livestock]);

  // Check if all fields are empty
  const areAllFieldsEmpty = () => {
    return Object.keys(values).every(type => {
      return ['number', 'own', 'dispersal'].every(field => {
        return values[type][field] === '' || values[type][field] === '0';
      });
    });
  };

  // Validate that own + dispersal <= number
  const validateSumConstraint = (livestockType, field, value) => {
    const currentValues = values[livestockType];
    const updatedValues = { ...currentValues, [field]: value };
    
    const number = Number(updatedValues.number) || 0;
    const own = Number(updatedValues.own) || 0;
    const dispersal = Number(updatedValues.dispersal) || 0;
    
    // Only validate if we're changing own or dispersal, or if number is being decreased
    if ((field === 'own' || field === 'dispersal') || 
        (field === 'number' && number < (own + dispersal))) {
      if (own + dispersal > number) {
        return 'Own + Dispersal cannot exceed Number';
      }
    }
    
    return false;
  };

  const handleChange = (livestockType, field) => (e) => {
    let value = e.target.value;
    
    // Validate numbers only
    if (!/^\d*$/.test(value)) {
      showSnackbarError('Please enter numbers only');
      setErrors(prev => ({
        ...prev,
        [livestockType]: {
          ...prev[livestockType],
          [field]: 'Please enter numbers only'
        }
      }));
      return;
    }
    
    // Validate maximum value
    if (Number(value) > 999) {
      showSnackbarError('Value cannot exceed 999');
      setErrors(prev => ({
        ...prev,
        [livestockType]: {
          ...prev[livestockType],
          [field]: 'cannot exceed 999'
        }
      }));
      return;
    }

    // Validate the sum constraint
    const sumError = validateSumConstraint(livestockType, field, value);
    if (sumError) {
      showSnackbarError(sumError);
      setErrors(prev => ({
        ...prev,
        [livestockType]: {
          ...prev[livestockType],
          [field]: sumError
        }
      }));
      return;
    }

    // Clear errors and update value if all validations pass
    setErrors(prev => ({ 
      ...prev,
      [livestockType]: { ...prev[livestockType], [field]: false }
    }));
    
    setValues(prev => ({
      ...prev,
      [livestockType]: { ...prev[livestockType], [field]: value}
    }));
  };

  const showSnackbarError = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all entries before submission
    let hasErrors = false;
    const newErrors = { ...errors };
    
    Object.keys(values).forEach(type => {
      const { number, own, dispersal } = values[type];
      const numValue = Number(number) || 0;
      const ownValue = Number(own) || 0;
      const dispersalValue = Number(dispersal) || 0;
      
      // Check if number is provided but own + dispersal doesn't equal number
      if (numValue > 0 && (ownValue + dispersalValue !== numValue)) {
        newErrors[type].own = 'Own + Dispersal must equal Number';
        hasErrors = true;
        showSnackbarError(`For ${type}: Own + Dispersal must equal Number`);
      }
    });
    
    if (hasErrors) {
      setErrors(newErrors);
      return null;
    }

    const processedValues = { ...values };

    Object.keys(processedValues).forEach((livestockType) => {
      Object.keys(processedValues[livestockType]).forEach((field) => {
        if (!processedValues[livestockType][field]) {
          processedValues[livestockType][field] = '0';
        }
      });
    });

    updateFormData('livestock', processedValues);
    console.log("LIVESTOCK/ANIMALS:", processedValues);
    
    return processedValues;
  };

  return {
    values,
    errors,
    areAllFieldsEmpty,
    handleChange,
    handleSubmit,
    snackbarOpen,
    snackbarMessage,
    handleCloseSnackbar
  };
};