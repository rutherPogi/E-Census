import { useState, useEffect } from "react";
import { DropdownInput, TextInput } from '../../../../../components/common/FormFields';

export default function ServiceAvailed({ 
  values, 
  handleChange, 
  errors,
  options
}) {
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  useEffect(() => {
    const isOtherSelected = options.findIndex(option => 
      option.value === values.serviceAvailed
    ) === -1 && values.serviceAvailed !== '';

    setShowOtherInput(isOtherSelected || values.serviceAvailed === "Others");
  }, [values.serviceAvailed, options]);

  const handleDropdownChange = (e, newValue) => {
    
    handleChange('serviceAvailed')(e, newValue);

    if (newValue && newValue.value === "Others") {
      setShowOtherInput(true);
      handleChange('serviceAvailed')(e, { value: '' });
    } else {
      setShowOtherInput(false);
    }
  };

  const handleTextInputChange = (e) => {
    handleChange('serviceAvailed')(e);
  };

  return (
    <>
      <DropdownInput
        label="Service/Assistance Availed"
        options={options}
        value={!showOtherInput ? values.serviceAvailed : "Others"}
        onChange={handleDropdownChange}
        error={errors.serviceAvailed && !showOtherInput} 
        helperText={!showOtherInput && errors.serviceAvailed ? errors.serviceAvailed : ""}
        required
      />
      
      {showOtherInput && (
        <TextInput
          label="Others (please specify)"
          name="serviceAvailed"
          value={values.serviceAvailed}
          onChange={handleTextInputChange}
          error={errors.serviceAvailed && showOtherInput}
          helperText={showOtherInput && errors.serviceAvailed ? errors.serviceAvailed : ""}
          required
        />
      )}
    </>
  );
}