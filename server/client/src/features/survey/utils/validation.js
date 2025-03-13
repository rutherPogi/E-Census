/**
 * Validates a complete form based on required fields and custom validations
 * @param {Object} values - Form values
 * @param {Array} requiredFields - Array of field names that are required
 * @param {Object} customValidations - Optional custom validation rules
 * @param {Function} setErrors - Function to update form errors
 * @returns {boolean} - Whether the form is valid
 */

export const validateForm = (values, requiredFields = [], customValidations = {}, setErrors) => {
  const newErrors = {};
  let isValid = true;

  // Validate required fields
  requiredFields.forEach(field => {
    if (!values[field] && values[field] !== 0) {
      newErrors[field] = 'This field is required';
      isValid = false;
    }
  });

  // Apply custom validations
  Object.keys(customValidations).forEach(field => {
    const validation = customValidations[field];
    
    // Skip if field is empty and not required (already checked above)
    if (!values[field] && !requiredFields.includes(field)) {
      return;
    }
    
    if (validation.validate) {
      const result = validation.validate(values[field], values);
      if (result !== true) {
        newErrors[field] = result;
        isValid = false;
      }
    }
  });

  // Update errors state
  if (setErrors) {
    setErrors(prev => ({ ...prev, ...newErrors }));
  }
  
  return { isValid, errors: newErrors };
};

/**
 * Creates validation rules for a currency field
 * @param {Object} options - Validation options
 * @returns {Object} - Validation rule object
 */

export const currencyValidation = (options = {}) => {
  return {
    type: 'currency',
    validate: (value, allValues) => {
      if (value === '') return true;
      
      const numValue = parseFloat(value);
      
      if (isNaN(numValue)) {
        return 'Please enter a valid amount';
      }
      
      if (options.min !== undefined && numValue < options.min) {
        return `Amount must be at least ${options.min}`;
      }
      
      if (options.max !== undefined && numValue > options.max) {
        return `Amount must be at most ${options.max}`;
      }
      
      return true;
    }
  };
};

/**
 * Creates validation rules for a number field
 * @param {Object} options - Validation options
 * @returns {Object} - Validation rule object
 */

export const numberValidation = (options = {}) => {
  return {
    type: 'number',
    validate: (value, allValues) => {
      if (value === '') return true;
      
      const numValue = parseInt(value, 10);
      
      if (isNaN(numValue)) {
        return 'Please enter a valid number';
      }
      
      if (options.min !== undefined && numValue < options.min) {
        return `Number must be at least ${options.min}`;
      }
      
      if (options.max !== undefined && numValue > options.max) {
        return `Number must be at most ${options.max}`;
      }
      
      return true;
    }
  };
};

/**
 * Validation rule for birthdate
 */

export const birthdateValidation = {
  validate: (value) => {
    if (!value) return true;
    
    const today = new Date();
    const birthDate = new Date(value);
    
    if (birthDate > today) {
      return "Invalid date: Cannot be a future date";
    }
    
    return true;
  }
};