import { FOOD_EXPENSES } from '../../utils/initialValues';
import { FormButtons } from "../../../../components/common";
import { CurrencyInput } from "../../../../components/common/FormFields";

import { useFormContext } from "../../pages/FormContext";
import { useExpenses } from "../../hooks/useExpenses";
import { useEffect } from 'react';


export default function FoodExpenses({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const {
    values,
    errors,
    total,
    handleChange,
    formatCurrency,
  } = useExpenses({
    formKey: 'foodExpenses',
    expenseTypes: FOOD_EXPENSES,
    formData,
    updateFormData
  });

  const onSubmit = (e) => {
    e.preventDefault();
    
    const processedValues = { ...values };
    
    Object.keys(processedValues).forEach((key) => {
      const value = processedValues[key];
      if (value === '' || value === null || value === undefined) {
        processedValues[key] = '0';
      }
    });

    updateFormData('foodExpenses', { 
      expenses: processedValues, 
      foodTotal: total,
      foodExpensesID: formData.foodExpenses.foodExpensesID 
    });

    console.log('FOOD EXPENSES: ', formData.foodExpenses);
    handleNext();
  };


  
  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>FOOD EXPENSES</div>
      <div className='responsive-form'>
        {FOOD_EXPENSES.map((field) => (
          <CurrencyInput
            key={field}
            label={field}
            value={values[field]}
            onChange={handleChange(field)}
            error={errors[field]}
            helperText = {errors[field] || `${field} expenses`}
            placeholder={'0.00'}
          />
        ))}
          <CurrencyInput
            label = "Total Monthly Food Expenses"
            value = {`${formatCurrency(total.toString())}`}
            variant = {'filled'}
          />
      </div>
      <FormButtons
        onBack={handleBack}
        onNext={onSubmit}
        backLabel = 'Back'
        nextLabel = 'Next'
      />
    </div>
  );
}