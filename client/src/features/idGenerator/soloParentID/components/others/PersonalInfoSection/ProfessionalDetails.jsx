import { OccupationSection } from './Occupation';
import { DropdownInput, CurrencyInput, TextInput } from "../../../../../../components/common/FormFields";
import { 
  EDUCATIONAL_OPTIONS, 
  OCCUPATION_OPTIONS,
  EMPLOYMENT_STATUS_OPTIONS
} from '../../../utils/options';





export const ProfessionalDetails = ({ 
  values, 
  handleChange, 
  handleIncomeChange,
  errors
}) => {
  return (
    <>
      <div className="section-title field-full">Professional Details</div>
      <DropdownInput
        label = 'Educational Attainment'
        options = {EDUCATIONAL_OPTIONS}
        value = {values.educationalAttainment}
        onChange = {(e, newValue) => handleChange('educationalAttainment')(e, newValue)}
        error = {errors.educationalAttainment} 
        helperText = {errors.educationalAttainment || 'e.g. College Graduate'}
        required
      />
      <OccupationSection 
        values = {values}
        errors = {errors} 
        handleChange = {handleChange}
        options = {OCCUPATION_OPTIONS}
      />
      <TextInput
        label='Company / Agency'
        value={values.company}
        onChange={handleChange('company')}
        error={errors.company}
        helperText = {errors.company || 'e.g. ---'}
      />
      <DropdownInput
        label = 'Employment Status'
        options = {EMPLOYMENT_STATUS_OPTIONS}
        value = {values.employmentStatus}
        onChange = {(e, newValue) => handleChange('employmentStatus')(e, newValue)}
        error = {errors.employmentStatus} 
        helperText = {errors.employmentStatus || 'e.g. College Graduate'}
      />
      <CurrencyInput
        label = 'Monthly Income'
        value =  {values.monthlyIncome}
        onChange =  {handleIncomeChange('monthlyIncome')}
        error =  {errors.monthlyIncome}
        helperText =  {errors.monthlyIncome}
        placeholder= '0.00'
        variant = 'outlined'
        required
      />
    </>
  );
};

export default ProfessionalDetails;