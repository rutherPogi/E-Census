import { EDUCATION_EXPENSES } from '../../utils/initialValues';
import { FormButtons } from "../../../../components/common";
import { CurrencyInput } from "../../../../components/common/FormFields";

import { useFormContext } from "../../pages/FormContext";
import { useExpenses } from "../../hooks/useExpenses";
import FoodExpenses from './FoodExpenses';



export default function EducationExpenses({ handleBack, handleNext }) {

  const { formData, updateFormData } = useFormContext();

  const {
    values,
    errors,
    total,
    handleChange,
    formatCurrency,
  } = useExpenses({
    formKey: 'educationExpenses',
    expenseTypes: EDUCATION_EXPENSES,
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

    updateFormData('educationExpenses', { 
      expenses: processedValues, 
      educationTotal: total,
      educationExpensesID: formData.educationExpenses.educationExpensesID
    });
    console.log('EDUCATION EXPENSES: ', processedValues);
    handleNext();
  };


  
  return (
    <div className='responsive-container'>
      <div className='responsive-header'>EDUCATION EXPENSES</div>
      <div className='responsive-form'>
        {EDUCATION_EXPENSES.map((field) => (
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
            label = "Total Monthly Education Expenses"
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