import { useState, useEffect } from "react";
import { DropdownInput, TextInput } from '../../../../../components/common/FormFields';

export default function NameofNGO({ 
  values, 
  handleChange, 
  errors,
  options
}) {
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  useEffect(() => {
    const isOtherSelected = options.findIndex(option => 
      option.value === values.ngoName
    ) === -1 && values.ngoName !== '';
    
    setShowOtherInput(isOtherSelected || values.ngoName === "Others");
  }, [values.ngoName, options]);

  const handleDropdownChange = (e, newValue) => {
    handleChange('ngoName')(e, newValue);

    if (newValue && newValue.value === "Others") {
      setShowOtherInput(true);
      handleChange('ngoName')(e, { value: '' });
    } else {
      setShowOtherInput(false);
    }
  };

  const handleTextInputChange = (e) => {
    handleChange('ngoName')(e);
  };

  return (
    <>
      <DropdownInput
        label="Name of NGO"
        options={options}
        value={!showOtherInput ? values.ngoName : "Others"}
        onChange={handleDropdownChange}
        error={errors.ngoName && !showOtherInput} 
        helperText={!showOtherInput && errors.ngoName ? errors.ngoName : ""}
        required
      />
      
      {showOtherInput && (
        <TextInput
          label="Other Source (please specify)"
          name="ngoName"
          value={values.ngoName}
          onChange={handleTextInputChange}
          error={errors.ngoName && showOtherInput}
          helperText={showOtherInput && errors.ngoName ? errors.ngoName : ""}
          required
        />
      )}
    </>
  );
}