import { TextInput, DropdownInput, CurrencyInput } from '../../../../../components/common/FormFields';
import { EDUCATIONAL_OPTIONS, EMPLOYMENT_OPTIONS, SKILLS_OPTIONS } from '../../../utils/options';



const ProfessionalInfo = ({ values, handleChange, handleIncomeChange, errors }) => {
  return (
    <>
      <div className="section-title field-full">Education & Employment</div>
      <DropdownInput
        label='Educational Attainment'
        options={EDUCATIONAL_OPTIONS}
        value={values.educationalAttainment}
        onChange={(e, newValue) => handleChange('educationalAttainment')(e, newValue)}
        error={errors.educationalAttainment} 
        helperText={errors.educationalAttainment || 'e.g., College Level'}
        required
      />
      <TextInput
        label='Occupation'
        value={values.occupation}
        onChange={handleChange('occupation')}
        error={errors.occupation}
        helperText={errors.occupation || 'e.g., Teacher'}
      />
      <DropdownInput
        label='Skills'
        options={SKILLS_OPTIONS}
        value={values.skills}
        onChange={(e, newValue) => handleChange('skills')(e, newValue)}
        error={errors.skills} 
        helperText={errors.skills || 'e.g., Carepentry Work'}
      />
      <DropdownInput
        label='Employment Type'
        options={EMPLOYMENT_OPTIONS}
        value={values.employmentType}
        onChange={(e, newValue) => handleChange('employmentType')(e, newValue)}
        error={errors.employmentType} 
        helperText={errors.employmentType || 'e.g., Employed (Permanent)'}
      />
      <CurrencyInput
        label='Average Monthly Income'
        value={values.monthlyIncome}
        onChange={handleIncomeChange('monthlyIncome')}
        error={errors.monthlyIncome}
        helperText={errors.monthlyIncome}
        placeholder={'0.00'}
      />
    </>
  );
};

export default ProfessionalInfo;