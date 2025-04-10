import { TextInput, DropdownInput } from '../../../../../components/common/FormFields';



const OtherInfo = ({ values, handleChange, errors }) => {
  return (
    <>
      <div className="section-title field-full">Other Information</div>     
      <TextInput
        label='Philhealth Number'
        value={values.philhealthNumber}
        onChange={handleChange('philhealthNumber')}
        error={errors.philhealthNumber}
        helperText={errors.philhealthNumber || '123-456-789-000'}
      />
      <TextInput
        label='Health Status'
        value={values.healthStatus}
        onChange={handleChange('healthStatus')}
        error={errors.healthStatus}
        helperText={errors.healthStatus || 'e.g., Hypertension'}
      />
      <TextInput
        label='Remarks'
        value={values.remarks}
        onChange={handleChange('remarks')}
        error={errors.remarks}
        helperText={errors.remarks || 'e.g., '}
      />
    </>
  );
};

export default OtherInfo;