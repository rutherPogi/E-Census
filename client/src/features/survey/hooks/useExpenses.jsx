import { useState, useEffect } from "react";
import { formatCurrency } from '../utils/formatter';

/**
 * Custom hook for handling expense forms
 * @param {Object} options - Hook configuration options
 * @param {string} options.formKey - The key to use in the formData object
 * @param {string[]} options.expenseTypes - Array of expense type names
 * @param {Object} options.formData - The existing form data
 * @param {Function} options.updateFormData - Function to update form data
 * @returns {Object} Expense form state and handlers
 */

export const useExpenses = ({ formKey, expenseTypes, formData, updateFormData }) => {
  // Get the ID field name based on the form key
  const idField = `${formKey}ID`;

  const [values, setValues] = useState(() => {
    const existingData = formData[formKey]?.expenses || {};
    return Object.fromEntries(expenseTypes.map(type => [
      type, 
      typeof existingData[type] === 'string' ? existingData[type] : ''
    ]));
  });

  // Track the ID separately
  const [expenseId, setExpenseId] = useState(() => {
    return formData[formKey]?.[idField] || null;
  });

  const [errors, setErrors] = useState(
    Object.fromEntries(expenseTypes.map(type => [type, false]))
  );

  const [total, setTotal] = useState(() => {
    const existingData = formData[formKey]?.expenses || {};
    return Object.values(existingData).reduce((sum, val) => 
      sum + (parseFloat(val?.replace(/,/g, '')) || 0), 0
    );
  });

  useEffect(() => {
    if (formData[formKey]) {
      if (formData[formKey][idField] !== undefined) {
        setExpenseId(formData[formKey][idField]);
      }
      
      // Update expense values if they exist
      if (formData[formKey].expenses) {  
        const expenses = formData[formKey].expenses;
      
        // Create new values object based on expenses data
        const newValues = {...values};

        expenseTypes.forEach(field => {
          if (expenses[field] !== undefined) {
            newValues[field] = expenses[field];
          }
        });
        
        setValues(newValues);
        
        // Also update the total based on these values
        const newTotal = Object.values(expenses).reduce((sum, val) => {
          const valStr = typeof val === 'string' ? val : '0';
          return sum + (parseFloat(valStr.replace(/,/g, '')) || 0);
        }, 0);
        
        setTotal(newTotal);
      }
    }
  }, [formData, formKey, expenseTypes, idField]);

  // Handle input change for a field
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    // Validate input is numeric
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    // Validate amount is within allowed range
    if (Number(plainNumber) > 999999999) {
      setErrors(prev => ({ ...prev, [field]: 'Total Amount cannot exceed ₱999,999,999' }));
      return;
    }

    // Clear errors
    setErrors(prev => ({ ...prev, [field]: false }));
    
    // Update values and calculate new total
    setValues(prevValues => {
      const updatedValues = { ...prevValues, [field]: formatCurrency(plainNumber) };

      const newTotal = Object.values(updatedValues).reduce((sum, val) => {
        const valStr = typeof val === 'string' ? val : '0';
        return sum + (parseFloat(valStr.replace(/,/g, '')) || 0);
      }, 0);
      
      setTotal(newTotal);
      return updatedValues;
    });
  };

  // Handle form submission
  const handleSubmit = (e, handleNext) => {
    e.preventDefault();

    const processedValues = { ...values };
    
    // Replace empty values with "0"
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
      if (value === '' || value === null) {
        processedValues[key] = '0';
      }
    });

    // Update form data with processed values, total, and ID
    const updatedData = {
      expenses: processedValues,
      [`${formKey.replace('Expenses', '')}Total`]: total
    };
    
    // Only include the ID if it exists
    if (expenseId !== null) {
      updatedData[idField] = expenseId;
    }

    updateFormData(formKey, updatedData);

    if (handleNext) {
      handleNext();
    }
  };

  return {
    values,
    errors,
    total,
    expenseId,
    handleChange,
    handleSubmit,
    formatCurrency,
  };
};