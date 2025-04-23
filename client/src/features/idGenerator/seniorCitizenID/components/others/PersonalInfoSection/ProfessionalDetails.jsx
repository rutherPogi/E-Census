import { OccupationSection } from './Occupation';
import { DropdownInput, CurrencyInput } from "../../../../../../components/common/FormFields";
import { 
  EDUCATIONAL_OPTIONS, 
  OCCUPATION_OPTIONS,
  SKILLS_OPTIONS
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
        <DropdownInput
          label = 'Skills'
          options = {SKILLS_OPTIONS}
          value = {values.skills}
          onChange = {(e, newValue) => handleChange('skills')(e, newValue)}
          error = {errors.skills} 
          helperText = {errors.skills || 'e.g. College Graduate'}
          required
        />
        <CurrencyInput
          label = 'Annual Income'
          value =  {values.annualIncome}
          onChange =  {handleIncomeChange('annualIncome')}
          error =  {errors.annualIncome}
          helperText =  {errors.annualIncome}
          placeholder= '0.00'
          variant = 'outlined'
        />
        <OccupationSection 
          values = {values}
          errors = {errors} 
          handleChange = {handleChange}
          options = {OCCUPATION_OPTIONS}
        />
        
    </>
  );
};

export default ProfessionalDetails;