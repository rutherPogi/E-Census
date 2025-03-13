import { useMediaQuery, TextField, Autocomplete, InputAdornment } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";


export const TextInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText, 
  placeholder, 
  multiline,
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      label = {label}
      variant = 'outlined'
      value = {value || ''}
      onChange = {onChange}
      error = {Boolean(error)}
      helperText = {error || helperText}
      placeholder = {placeholder}
      size = {isMobile ? 'small' : 'medium'}
      multiline = {multiline}
      fullWidth
      {...props}
    />
  );
};

export const CurrencyInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText,  
  placeholder,
  variant,
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      label = {label}
      value = {value || ''}
      onChange = {onChange}
      error = {Boolean(error)}
      helperText = {error || helperText}
      placeholder = {placeholder}
      variant = {variant}
      InputProps = {{
        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
      }}
      size = {isMobile ? 'small' : 'medium'}
      {...props}
    />
  );
};

export const SizeInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText,  
  placeholder,
  variant,
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      label = {label}
      value = {value || ''}
      onChange = {onChange}
      error = {Boolean(error)}
      helperText = {error || helperText}
      placeholder = {placeholder}
      variant = {variant}
      InputProps = {{
        endAdornment: <InputAdornment position="end">m<sup>2</sup></InputAdornment>,
      }}
      size = {isMobile ? 'small' : 'medium'}
      {...props}
    />
  );
};

export const DropdownInput = ({ 
  label, 
  options, 
  value, 
  onChange, 
  error, 
  helperText, 
  placeholder, 
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');
  
  return (
    <Autocomplete
      options = {options}
      value = {options.find(option => option.value === value) || null}
      onChange = {(e, newValue) => onChange(e, newValue)}
      renderInput = {(params) => (
        <TextField 
          {...params} 
          label = {label} 
          error = {Boolean(error)}
          helperText = {error || helperText}
          placeholder = {placeholder}
        />
      )}
      size = {isMobile ? 'small' : 'medium'}
      {...props}
    />
  );
};

export const DateInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText,  
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');
  const dateError = error || (value && dayjs(value).isAfter(dayjs()) ? "Invalid date: Cannot be a future date" : "");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            size: isMobile ? 'small' : 'medium',
            error: Boolean(dateError),
            helperText: dateError || helperText
          }
        }}
        {...props}
      />
    </LocalizationProvider>
  );
};

export const NumberInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText, 
  placeholder,
  min = 0,
  max, 
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value || ''}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error || helperText}
      placeholder={placeholder}
      size={isMobile ? 'small' : 'medium'}
      type="text" // Using text type with regex validation for better control
      inputProps={{ 
        inputMode: 'numeric',
        pattern: '[0-9]*',
        min: min,
        max: max
      }}
      {...props}
    />
  );
};

export const GenderInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  helperText,  
  placeholder,
  variant,
  ...props 
}) => {

  const isMobile = useMediaQuery('(max-width:425px)');

  return (
    <TextField
      value = {value || ''}
      onChange = {onChange}
      error = {Boolean(error)}
      helperText = {error || helperText}
      placeholder = {placeholder}
      variant = {variant}
      InputProps = {{
        startAdornment: <InputAdornment position="start">{label}</InputAdornment>,
      }}
      size = {isMobile ? 'small' : 'medium'}
      {...props}
    />
  );
};