/**
 * Creates a change handler for form inputs
 * @param {Object} values - Current form values
 * @param {Function} setValues - Function to update form values
 * @param {Object} setErrors - Function to update form errors
 * @param {Object} validations - Optional validation rules for fields
 * @returns {Function} - Change handler function
 */

export const createChangeHandler = (values, setValues, setErrors, validations = {}) => {
  return (field) => (event) => {
    const value = event?.target?.value !== undefined ? event.target.value : event;
    
    // Check if there's a specific validation for this field
    if (validations[field]) {
      const validation = validations[field];
      
      // For currency or number fields, prevent invalid characters from being entered
      if (validation.type === 'currency' || validation.type === 'number') {
        // For currency, only allow numbers and a single decimal point
        const regex = validation.type === 'currency' 
          ? /^[0-9]*\.?[0-9]*$/
          : /^[0-9]*$/;
          
        // If the new value doesn't match the pattern and isn't empty, don't update the state
        if (value !== '' && !regex.test(value)) {
          return { value: values[field], isValid: true, field };
        }
      }
    }
    
    // Validate the input based on field type
    let isValid = true;
    let errorMessage = '';
    
    // Check if there's a specific validation for this field
    if (validations[field]) {
      const validation = validations[field];
      
      // Custom validation function if provided
      if (validation.validate) {
        const result = validation.validate(value, values);
        if (result !== true) {
          isValid = false;
          errorMessage = result;
        }
      }
    }
    
    // Update the Values in the form
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Update errors state if validation failed
    if (!isValid) {
      setErrors(prev => ({
        ...prev,
        [field]: errorMessage
      }));
    } else {
      // Clear error if validation passed
      setErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
    
    // Return the new value and validity for potential additional processing
    return { value, isValid, field };
  };
};

/**
 * Creates a handler for Autocomplete component changes
 * @param {Object} values - Current form values
 * @param {Function} setValues - Function to update form values
 * @returns {Function} - Change handler function for Autocomplete
 */

export const createAutocompleteHandler = (values, setValues) => {
  return (field) => (event, newValue) => {
    setValues(prev => ({
      ...prev,
      [field]: newValue ? newValue.value : ''
    }));
    
    return { field, value: newValue ? newValue.value : '' };
  };
};

/**
 * Creates a date change handler with age calculation
 * @param {Object} values - Current form values
 * @param {Function} setValues - Function to update form values
 * @param {Function} setErrors - Function to update form errors
 * @returns {Function} - Date change handler function
 */

export const createDateChangeHandler = (values, setValues, setErrors) => {
  return (date) => {
    if (!date) {
      setValues(prev => ({
        ...prev,
        birthdate: null,
        age: ''
      }));
      setErrors(prev => ({
        ...prev,
        birthdate: false
      }));
      return;
    }
    
    const today = new Date();
    const birthDate = new Date(date);
    
    // Check if the date is in the future
    if (birthDate > today) {
      setErrors(prev => ({
        ...prev,
        birthdate: "Invalid date: Cannot be a future date"
      }));
      return;
    }
    
    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    // Update values and clear error
    setValues(prev => ({
      ...prev,
      birthdate: date,
      age: age.toString()
    }));
    
    setErrors(prev => ({
      ...prev,
      birthdate: false
    }));
  };
};
