import { OccupationSection } from './Occupation';
import { DropdownInput } from "../../../../../../components/common/FormFields";
import { 
  EDUCATIONAL_OPTIONS, 
  EMPLOYMENT_STATUS_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  EMPLOYMENT_CATEGORY_OPTIONS,
  OCCUPATION_OPTIONS
} from '../../../utils/options';





export const ProfessionalDetails = ({ 
  values, 
  handleChange, 
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
          label = 'Status of Employment'
          options = {EMPLOYMENT_STATUS_OPTIONS}
          value = {values.employmentStatus}
          onChange = {(e, newValue) => handleChange('employmentStatus')(e, newValue)}
          error = {errors.employmentStatus} 
          helperText = {errors.employmentStatus || 'e.g. Employed'}
        />
        <DropdownInput
          label = 'Type of Employment'
          options = {EMPLOYMENT_TYPE_OPTIONS}
          value = {values.employmentType}
          onChange = {(e, newValue) => handleChange('employmentType')(e, newValue)}
          error = {errors.employmentType} 
          helperText = {errors.employmentType || 'e.g. Permanent'}
        />
        <DropdownInput
          label = 'Category of Employment'
          options = {EMPLOYMENT_CATEGORY_OPTIONS}
          value = {values.employmentCategory}
          onChange = {(e, newValue) => handleChange('employmentCategory')(e, newValue)}
          error = {errors.employmentCategory} 
          helperText = {errors.employmentCategory || 'e.g. Private'}
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