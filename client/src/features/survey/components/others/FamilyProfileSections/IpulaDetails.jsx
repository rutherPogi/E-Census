import { TextInput, CheckboxInput } from "../../../../../components/common/FormFields";




export const IpulaDetails = ({ 
  values, 
  handleChange, 
  errors 
}) => {

  return (
    <div className="responsive-form details">
      <div className="section-title field-full">Ipula/Non-Ivatan Details</div>
      <TextInput
        label='Details of Settlement'
        value={values.settlementDetails}
        onChange={handleChange('settlementDetails')}
        error={errors.settlementDetails}
        helperText = {errors.settlementDetails}
        placeholder = 'Enter settlement details'
      />
      <TextInput
        label='Ethnicity'
        value={values.ethnicity}
        onChange={handleChange('ethnicity')}
        error={errors.ethnicity}
        helperText = {errors.ethnicity}
        placeholder = 'Enter your ethnicity'
      />
      <TextInput
        label='Place of Origin'
        value={values.placeOfOrigin}
        onChange={handleChange('placeOfOrigin')}
        error={errors.placeOfOrigin}
        helperText = {errors.placeOfOrigin}
        placeholder = 'Enter your origin'
      />
      <CheckboxInput
        label="Transient"
        checked={values.isTransient}
        onChange={handleChange('isTransient')}
        color="primary"
      />
    </div>
  );
};

export default IpulaDetails;