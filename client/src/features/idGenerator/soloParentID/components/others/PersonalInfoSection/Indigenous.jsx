import { TextInput } from "../../../../../../components/common/FormFields";




export const Indigenous = ({ 
  values, 
  handleChange, 
  errors
}) => {
  return (
    <>
      <div className="section-title field-full">Indigenous Person Details</div>
      <TextInput
        label='Name of Affiliation'
        value={values.indigenousAffiliation}
        onChange={handleChange('indigenousAffiliation')}
        error={errors.indigenousAffiliation}
        helperText = {errors.indigenousAffiliation || 'e.g. ---'}
        required
      />
    </>
  );
};

export default Indigenous;