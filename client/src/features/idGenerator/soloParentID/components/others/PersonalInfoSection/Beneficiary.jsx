import { BARANGAY_OPTIONS, MUNICIPALITY_OPTIONS } from '../../../utils/options';
import { TextInput, DropdownInput, ContactNumberInput } from "../../../../../../components/common/FormFields";




export const Beneficiary = ({ 
  values, 
  handleChange, 
  errors
}) => {
  return (
    <>
      <div className="section-title field-full">Pantawid Beneficiary Details</div>
      <TextInput
        label='Household ID'
        value={values.householdID}
        onChange={handleChange('householdID')}
        error={errors.householdID}
        helperText = {errors.householdID || 'e.g. ---'}
        required
      />
      <TextInput
        label='Beneficiary Code'
        value={values.beneficiaryCode}
        onChange={handleChange('beneficiaryCode')}
        error={errors.beneficiaryCode}
        helperText={errors.beneficiaryCode || 'e.g. 000001'}
        required
      />
    </>
  );
};

export default Beneficiary;