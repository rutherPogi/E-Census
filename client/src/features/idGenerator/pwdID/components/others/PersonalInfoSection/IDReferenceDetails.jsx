import dayjs from 'dayjs';
import { SUFFIX_OPTIONS, SEX_OPTIONS, CIVIL_STATUS_OPTIONS } from '../../../utils/options';
import { TextInput, DropdownInput, DateInput } from "../../../../../../components/common/FormFields";




export const IDReferenceDetails = ({ 
  values, 
  handleChange, 
  errors
}) => {
  return (
    <>
      <div className="section-title field-full">ID Reference No.</div>
      <TextInput
        label='SSS No.'
        value={values.sssNumber}
        onChange={handleChange('sssNumber')}
        error={errors.sssNumber}
        helperText = {errors.sssNumber || 'e.g. --'}
      />
      <TextInput
        label='GSIS No.'
        value={values.gsisNumber}
        onChange={handleChange('gsisNumber')}
        error={errors.gsisNumber}
        helperText = {errors.gsisNumber || 'e.g. --'}
      />
      <TextInput
        label='PAG-IBIG No.'
        value={values.pagibigNumber}
        onChange={handleChange('pagibigNumber')}
        error={errors.pagibigNumber}
        helperText = {errors.pagibigNumber || 'e.g. --'}
      />
      <TextInput
        label='PSN No.'
        value={values.psnNumber}
        onChange={handleChange('psnNumber')}
        error={errors.psnNumber}
        helperText = {errors.psnNumber || 'e.g. --'}
      />
      <TextInput
        label='Philhealth No.'
        value={values.philhealthNumber}
        onChange={handleChange('philhealthNumber')}
        error={errors.philhealthNumber}
        helperText = {errors.philhealthNumber || 'e.g. --'}
      />
    </>
  );
};

export default IDReferenceDetails;