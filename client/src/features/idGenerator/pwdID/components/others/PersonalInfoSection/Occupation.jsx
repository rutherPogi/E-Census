import { useState, useEffect } from "react";
import { DropdownInput, TextInput } from '../../../../../../components/common/FormFields';




export const OccupationSection = ({ 
  values, 
  handleChange, 
  errors,
  options
}) => {

  const [showOtherInput, setShowOtherInput] = useState(false);
  
  useEffect(() => {
    const isOtherSelected = options.findIndex(option => 
      option.value === values.occupation
    ) === -1 && values.occupation !== '';
    
    setShowOtherInput(isOtherSelected || values.occupation === "Others");
  }, [values.occupation, options]);

  const handleDropdownChange = (e, newValue) => {
    handleChange('occupation')(e, newValue);

    if (newValue && newValue.value === "Others") {
      setShowOtherInput(true);
      handleChange('occupation')(e, { value: '' });
    } else {
      setShowOtherInput(false);
    }
  };

  const handleTextInputChange = (e) => {
    handleChange('occupation')(e);
  };

  return (
    <>
      <DropdownInput
        label="Occupation"
        options={options}
        value={!showOtherInput ? values.occupation : "Others"}
        onChange={handleDropdownChange}
        error={errors.occupation && !showOtherInput} 
        helperText={!showOtherInput && errors.occupation ? errors.occupation : ""}
        required
      />
      
      {showOtherInput && (
        <TextInput
          label="Other Occupation (please specify)"
          name="occupation"
          value={values.occupation}
          onChange={handleTextInputChange}
          error={errors.occupation && showOtherInput}
          helperText={showOtherInput && errors.occupation ? errors.occupation : ""}
          required
        />
      )}
    </>
  );
}

export default OccupationSection;