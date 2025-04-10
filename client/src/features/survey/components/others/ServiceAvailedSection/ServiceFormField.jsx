import { TextInput, DateInput, GenderInput } from '../../../../../components/common/FormFields';
import { ASSISTANCE_OPTIONS, NGO_OPTIONS } from '../../../utils/options';

import NameofNGO from './NameofNGO';
import ServiceAvailed from './ServiceAvailed';



export const ServiceFormFields = ({ 
  values, 
  errors, 
  handleChange, 
  handleDateChange, 
  handleNumberChange 
}) => {

  return (
    <>
      <DateInput 
        label="Date Availed"
        value={values.dateServiceAvailed}
        onChange={handleDateChange}
        error={errors.dateServiceAvailed}
        helperText={errors.dateServiceAvailed}
      />
      <NameofNGO
        values={values}
        handleChange={handleChange}
        errors={errors}
        options={NGO_OPTIONS}
      />
      <ServiceAvailed
        values={values}
        handleChange={handleChange}
        errors={errors}
        options={ASSISTANCE_OPTIONS}
      />
      <div className='input-field serve'>
        <label>No. of Family Member/s Served</label>
        <GenderInput
          label='Male'
          value={values.maleServed} 
          onChange={handleNumberChange('maleServed')}
          error={errors.maleServed} 
          helperText={errors.maleServed}  
        />
        <GenderInput
          label='Female'
          value={values.femaleServed} 
          onChange={handleNumberChange('femaleServed')}
          error={errors.femaleServed} 
          helperText={errors.femaleServed}  
        />
        <GenderInput
          label='Total'
          value={values.totalServed}
          variant='filled'
        />
      </div>
      <TextInput
        label='How the service helped the family'
        value={values.howServiceHelp}
        onChange={handleChange('howServiceHelp')}
        error={errors.howServiceHelp}
        helperText={errors.howServiceHelp || 'ex. ...'}
        multiline
      />
    </>
  );
};