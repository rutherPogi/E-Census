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