import { TextInput, DateInput, CheckboxInput } from "../../../../../components/common/FormFields";
import dayjs from "dayjs";


export const TransientDetails = ({ 
  values, 
  handleChange, 
  handleDateChange, 
  errors 
}) => {

  return (
    <div className="responsive-form details">
      <div className="section-title field-full">Transient Details</div>
      <TextInput
        label='House Owner'
        value={values.houseOwner}
        onChange={handleChange('houseOwner')}
        error={errors.houseOwner}
        helperText={errors.houseOwner || 'The owner of the house'}
      />
      
      <CheckboxInput
        label="Registered?"
        checked={values.isRegistered}
        onChange={handleChange('isRegistered')}
        color="primary"
      />

      {values.isRegistered && (
        <DateInput 
          label="Date Registered"
          value={values.transientDateRegistered ? dayjs(values.transientDateRegistered) : null}
          onChange={handleDateChange('transientDateRegistered')}
          error={errors.transientDateRegistered}
          helperText={errors.transientDateRegistered}
        />
      )}
    </div>
  );
};

export default TransientDetails;