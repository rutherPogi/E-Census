// ExpenseForm.jsx
import { useFormContext } from "../../pages/FormContext";

import { useState } from "react";
import { useMediaQuery, TextField, InputAdornment } from "@mui/material";
import { useParams } from "react-router-dom";


export default function ExpenseForm({ category, handleBack, handleNext }) {
  const isMobile = useMediaQuery('(max-width:425px)');
  const params = useParams();
  const { 
    formData, 
    updateExpenses, 
    calculateExpenseEntries,
    expenseCategories 
  } = useFormContext();

  const fields = expenseCategories[category].fields;

  const [values, setValues] = useState(() => {
    const existingData = formData[`${category}Expenses`]?.expenses || {};
    return Object.fromEntries(fields.map(type => [
      type, 
      existingData[type] || ''
    ]));
  });

  const [total, setTotal] = useState(() => {
    const existingData = formData.foodExpenses?.expenses || {};
    return Object.values(existingData).reduce((sum, val) => 
      sum + (parseFloat(val?.replace(/,/g, '')) || 0), 0
    );
  });

  const formatCurrency = (value) => {
    const plainNumber = value.replace(/\D/g, '');
    return plainNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const plainNumber = value.replace(/,/g, '');
    
    if (!/^\d*$/.test(plainNumber)) {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numbers only' }));
      return;
    }
    
    if (Number(plainNumber) > 9999999) {
      setErrors(prev => ({ ...prev, [field]: 'Total Amount cannot exceed ₱9,999,999' }));
      return;
    }

    setErrors(prev => ({ ...prev, [field]: false }));
    
    setValues(prevValues => {
      const updatedValues = {
        ...prevValues,
        [field]: formatCurrency(plainNumber)
      };

      const newTotal = Object.values(updatedValues).reduce((sum, val) => 
        sum + (parseFloat(val.replace(/,/g, '')) || 0), 0
      );
      
      setTotal(newTotal);
      return updatedValues;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const hasValue = Object.values(values).some(val => 
      parseFloat(val.replace(/,/g, '')) > 0
    );

    if (!hasValue) {
      foodTypes.forEach(type => {
        newErrors[type] = 'At least one expense must be entered';
      });
      isValid = false;
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please enter at least one expense");
      return;
    }

    const expenseEntries = calculateExpenseEntries(category, values, params.id);

    updateExpenses(category, {
      expenses: values,
      total: total,
      entries: expenseEntries
    });

    handleNext();
  };

  return (
    <div className='responsive-container'>
      <div className='responsive-header'>{expenseCategories[category].name.toUpperCase()}</div>
      <div className='responsive-form'>
        {foodTypes.map((field) => (
          <TextField
            key={field}
            label={field}
            name={field}
            value={values[field]}
            onChange={handleChange(field)}
            error={Boolean(errors[field])}
            helperText={errors[field] || `Monthly ${field} expenses`}
            InputProps={{
              startAdornment: <InputAdornment position="start">PHP</InputAdornment>,
            }}
            size={isMobile ? 'small' : 'medium'}
            fullWidth
          />
        ))}
        <TextField
          label="Total Monthly Food Expenses"
          value={`₱${formatCurrency(total.toString())}`}
          InputProps={{
            readOnly: true,
          }}
          size={isMobile ? 'small' : 'medium'}
          fullWidth
          variant="filled"
        />
      </div>
      <div className='form-buttons'>
        <div className='form-buttons-right'>
          <button type='button' className="btn cancel-btn" onClick={handleBack}>
            Back
          </button>
          <button type='button' className="btn submit-btn" onClick={handleSubmit}>
            Next
          </button>
        </div>     
      </div>
    </div>
  );
}

// Then create simple wrapper components:
export function FoodExpenses(props) {
  return <ExpenseForm category="food" {...props} />;
}

export function EducationExpenses(props) {
  return <ExpenseForm category="education" {...props} />;
}

export function FamilyExpenses(props) {
  return <ExpenseForm category="family" {...props} />;
}

export function MonthlyExpenses(props) {
  return <ExpenseForm category="monthly" {...props} />;
}