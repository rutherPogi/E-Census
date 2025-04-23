import { BARANGAY_OPTIONS, MUNICIPALITY_OPTIONS } from '../../../utils/options';
import { TextInput, DateInput } from "../../../../../../components/common/FormFields";




export const OscaDetails = ({ 
  values, 
  handleChange, 
  handleDateChange,
  errors
}) => {
  return (
    <>
      <div className="section-title field-full">OSCA Membership</div>
      <TextInput
        label='Name of Association'
        value={values.associationName}
        onChange={handleChange('associationName')}
        error={errors.associationName}
        helperText = {errors.associationName || 'e.g. ---'}
        required
      />
      <DateInput
        label =  'Date elected as officer'
        value =  {values.asOfficer}
        onChange={handleDateChange('asOfficer')}
        error = {errors.asOfficer}  
        helperText =  {errors.asOfficer || 'If an officer, date elected'}
        required
      />
      <TextInput
        label='Position'
        value={values.position}
        onChange={handleChange('position')}
        error={errors.position}
        helperText = {errors.position || 'e.g. ---'}
        required
      />
    </>
  );
};

export default OscaDetails;