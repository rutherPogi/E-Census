import { useState, useEffect } from "react";
import { useFormContext } from "../pages/FormContext";
import dayjs from 'dayjs';

export const useServiceForm = () => {
  const { formData, addItem, updateItem } = useFormContext();
  const { serviceAvailed = [] } = formData;

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const [values, setValues] = useState({
    dateServiceAvailed: null,
    ngoName: '',
    assistance: '',
    maleServed: '',
    femaleServed: '',
    totalServed: '',
    howServiceHelp: ''
  });

  const [errors, setErrors] = useState({
    dateServiceAvailed: false,
    ngoName: false,
    assistance: false,
    maleServed: false,
    femaleServed: false,
    howServiceHelp: false
  });

  // Check if the form is empty - with null/undefined checks
  const isFormEmpty = () => {
    return !values.dateServiceAvailed && 
           (!values.ngoName || values.ngoName.trim?.() === '') && 
           (!values.assistance || values.assistance.trim?.() === '') && 
           !values.maleServed && 
           !values.femaleServed && 
           (!values.howServiceHelp || values.howServiceHelp.trim?.() === '');
  };

  // Load existing data for editing
  useEffect(() => {
    const storedEditIndex = sessionStorage.getItem('editingMemberIndex');
    
    if (storedEditIndex !== null) {
      const index = parseInt(storedEditIndex);
      if (serviceAvailed[index]) {
        setIsEditing(true);
        setEditIndex(index);
        
        // Transform the data for editing
        const memberToEdit = serviceAvailed[index];
        setValues({
          ...memberToEdit,
          // Convert string date to dayjs object if it exists
          dateServiceAvailed: memberToEdit.dateServiceAvailed ? dayjs(memberToEdit.dateServiceAvailed) : null
        });
      }
    }
  }, [serviceAvailed]);

  const updateTotal = (currentValues) => {
    const maleValue = parseInt(currentValues.maleServed) || 0;
    const femaleValue = parseInt(currentValues.femaleServed) || 0;
    setValues(prev => ({ ...prev, totalServed: maleValue + femaleValue }));
  };

  const handleNumberChange = (field) => (e) => {
    const value = e.target.value;
  
    if (value === '') {
      setValues(prev => ({ ...prev, [field]: '' }));
      updateTotal({ ...values, [field]: '' });
      return;
    }
  
    if (!/^\d*$/.test(value)) {
      setErrors(prev => ({ ...prev, [field]: "Please enter numbers only" }));
      return;
    }
  
    if (Number(value) > 99) {
      setErrors(prev => ({ ...prev, [field]: "Number cannot exceed 99" }));
      return;
    }
  
    setErrors(prev => ({ ...prev, [field]: false }));
    setValues(prev => ({ ...prev, [field]: value }));
    
    updateTotal({ ...values, [field]: value });
  };

  const handleDateChange = (newValue) => {
    if (!newValue || !newValue.isValid()) {
      setValues(prev => ({ ...prev, dateServiceAvailed: dayjs() }));
      return;
    }
    setValues(prev => ({ ...prev, dateServiceAvailed: newValue }));
  };

  const handleChange = (field) => (e, newValue) => {
    // Handle dropdown select case where newValue is passed
    if (newValue !== undefined) {
      const value = typeof newValue === 'string' ? newValue : newValue?.value || '';
      setValues(prev => ({ ...prev, [field]: value }));
    } 
    // Handle text input case where e.target.value exists
    else if (e && e.target) {
      const value = e.target.value;
      if (value.length > 50) {
        value = value.slice(0, 100); // ✂️ Limit to 50 characters
      }
      setValues(prev => ({ ...prev, [field]: value }));
    }
    
    setErrors(prev => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (handleNext) => (e) => {
    e.preventDefault();

    const processedValues = {
      ...values,
      dateServiceAvailed: values.dateServiceAvailed && values.dateServiceAvailed.isValid() 
        ? values.dateServiceAvailed.format('YYYY-MM-DD')
        : null,
      // Ensure these are strings even if they were objects
      ngoName: typeof values.ngoName === 'object' ? values.ngoName.value || null : values.ngoName || null,
      assistance: typeof values.assistance === 'object' ? values.assistance.value || null : values.assistance || null,
      maleServed: parseInt(values.maleServed) || 0,
      femaleServed: parseInt(values.femaleServed) || 0,
      totalServed: parseInt(values.totalServed) || 0,
      howServiceHelp: values.howServiceHelp || null
    };

    if (isEditing) {
      updateItem('serviceAvailed', editIndex, processedValues);
      
      setIsEditing(false);
      setEditIndex(-1);
      sessionStorage.removeItem('editingMemberIndex');
    } else {
      addItem('serviceAvailed', processedValues);
    }

    console.log('SERVICE AVAILED:', processedValues);
    handleNext();
  };

  return {
    values,
    errors,
    handleChange,
    handleDateChange,
    handleNumberChange,
    handleSubmit,
    isEditing,
    isFormEmpty: isFormEmpty()
  };
};