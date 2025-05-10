import { useState, useEffect } from "react";
import { 
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  FormHelperText,
  FormControl,
  FormLabel,
  Box
} from "@mui/material";

export const WATER_SOURCES_OPTIONS = [
  { value: 'Spring', label: 'Spring' },
  { value: 'Water Tank (Communal)', label: 'Water Tank (Communal)' },
  { value: 'Rain Collectors', label: 'Rain Collectors' },
  { value: 'Faucet', label: 'Faucet' },
  { value: 'Refilling Station', label: 'Refilling Station' },
  { value: 'Others', label: 'Others' },
];

export default function WaterSourceSelector({ 
  values, 
  handleChange, 
  errors,
  options = WATER_SOURCES_OPTIONS
}) {
  const [selectedSources, setSelectedSources] = useState([]);
  const [otherSource, setOtherSource] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  
  // Initialize selections from existing values
  useEffect(() => {
    if (values.waterSources) {
      const sourcesArray = values.waterSources.split(',').map(source => source.trim());
      
      // Check if any source is not in predefined options (would be "Other")
      const predefinedValues = options.map(option => option.value);
      const otherValues = sourcesArray.filter(source => 
        !predefinedValues.includes(source) && source !== 'Others'
      );
      
      // Set known options in selectedSources
      const knownSources = sourcesArray.filter(source => 
        predefinedValues.includes(source) || source === 'Others'
      );
      
      setSelectedSources(knownSources);
      
      // If we have other values or "Others" is selected
      if (otherValues.length > 0) {
        setOtherSource(otherValues.join(', '));
        setShowOtherInput(true);
      } else if (knownSources.includes('Others')) {
        setShowOtherInput(true);
      }
    }
  }, []);

  // Update the final value whenever selections change
  useEffect(() => {
    let finalSources = [...selectedSources];
    
    // If "Others" is selected and there's text, add the custom source
    if (showOtherInput && otherSource && !finalSources.includes(otherSource)) {
      if (finalSources.includes('Others')) {
        // Remove "Others" label since we're using the actual value
        finalSources = finalSources.filter(source => source !== 'Others');
      }
      finalSources.push(otherSource);
    }
    
    // Update the form value
    const event = { target: { name: 'waterSources', value: finalSources.join(', ') } };
    handleChange('waterSources')(event);
  }, [selectedSources, otherSource, showOtherInput]);

  const handleCheckboxChange = (value) => {
    setSelectedSources(prev => {
      if (prev.includes(value)) {
        // Uncheck
        const newSources = prev.filter(source => source !== value);
        
        // If unchecking "Others", hide the text input
        if (value === 'Others') {
          setShowOtherInput(false);
          setOtherSource('');
        }
        
        return newSources;
      } else {
        // Check
        const newSources = [...prev, value];
        
        // If checking "Others", show the text input
        if (value === 'Others') {
          setShowOtherInput(true);
        }
        
        return newSources;
      }
    });
  };

  const handleOtherInputChange = (e) => {
    setOtherSource(e.target.value);
  };

  const hasError = Boolean(errors.waterSources);

  return (
    <FormControl 
      component="fieldset" 
      error={hasError} 
      sx={{ width: '100%', mb: 2 }}
    >
      <FormLabel component="legend" required>Sources of Water</FormLabel>
      
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={selectedSources.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                name={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      
      {hasError && <FormHelperText>{errors.waterSources}</FormHelperText>}
      
      {showOtherInput && (
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Other Source (please specify)"
            value={otherSource}
            onChange={handleOtherInputChange}
            error={hasError && selectedSources.includes('Others') && !otherSource}
            helperText={
              hasError && selectedSources.includes('Others') && !otherSource
                ? "Please specify water source"
                : ""
            }
            placeholder="Please specify water source"
            size="small"
            required={selectedSources.includes('Others')}
          />
        </Box>
      )}
    </FormControl>
  );
}