/**
 * Calculates the sum of specified fields in the form values
 * @param {Object} values - Form values
 * @param {Array} fields - Fields to sum
 * @returns {number} - Total sum
 */

export const calculateTotal = (values, fields) => {
  return fields.reduce((total, field) => {
    const value = values[field] ? parseFloat(values[field]) : 0;
    return total + (isNaN(value) ? 0 : value);
  }, 0);
};

/**
 * Creates an age calculator function based on a birthdate
 * @param {Date} birthdate - Birthdate to calculate age from
 * @returns {number} - Calculated age
 */

export const calculateAge = (birthdate) => {
  if (!birthdate) return '';
  
  const today = new Date();
  const birthDate = new Date(birthdate);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Recalculates derived values in a form
 * @param {Object} values - Current form values
 * @param {Object} calculationRules - Rules for calculating derived values
 * @returns {Object} - Updated values with calculated fields
 */

export const recalculateDerivedValues = (values, calculationRules) => {
  const updatedValues = { ...values };
  
  Object.keys(calculationRules).forEach(field => {
    const rule = calculationRules[field];
    updatedValues[field] = rule.calculate(values);
  });
  
  return updatedValues;
};