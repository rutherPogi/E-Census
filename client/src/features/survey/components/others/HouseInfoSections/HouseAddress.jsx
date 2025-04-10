import { TextInput, DropdownInput } from "../../../../../components/common/FormFields";
import { BARANGAY_OPTIONS, MUNICIPALITY_OPTIONS } from "../../../utils/options";


export default function HouseAddress({ values, handleChange, errors }) {

  return (
    <>
      <TextInput
        label='House Number & Street'
        value={values.houseStreet}
        onChange={handleChange('houseStreet')}
        error={errors.houseStreet}
        helperText = {errors.houseStreet}
        placeholder = 'e.g. 123 Rizal St. '
        required
      />
      <DropdownInput
        label = 'Barangay'
        options = {BARANGAY_OPTIONS}
        value = {values.barangay}
        onChange = {(e, newValue) => handleChange('barangay')(e, newValue)}
        error = {errors.barangay} 
        helperText = {errors.barangay || ''}
        placeholder = 'Enter your barangay'
        required
      />
      <DropdownInput
        label = 'Municipality'
        options = {MUNICIPALITY_OPTIONS}
        value = {values.municipality}
        placeholder = 'Enter your municipality'
        disabled
        required
      />
    </>
  );
}