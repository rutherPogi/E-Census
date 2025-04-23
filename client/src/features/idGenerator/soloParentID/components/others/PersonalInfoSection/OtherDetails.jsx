import { TextInput } from "../../../../../../components/common/FormFields";




export const OtherDetails = ({ 
  values, 
  handleChange, 
  errors
}) => {
  return (
    <>
      <div className="section-title field-full">Other Details</div>
      <TextInput
        label='Solo Parent Category'
        value={values.soloParentCategory}
        onChange={handleChange('soloParentCategory')}
        error={errors.soloParentCategory}
        helperText = {errors.soloParentCategory || 'e.g. ---'}
        required
      />
    </>
  );
};

export default OtherDetails;