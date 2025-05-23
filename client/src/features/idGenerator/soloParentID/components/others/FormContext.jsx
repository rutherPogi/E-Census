import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

const initialFormData = {
  personalInfo: {},
  householdComposition: [],
  problemNeeds: {},
  emergencyContact: {},
  spMedia: {}
}; 

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(initialFormData);

  const setEntireFormData = (newFormData) => {
    setFormData(newFormData);
  };

  const updateFormData = (section, data) => {
    setFormData(prev => ({ ...prev, [section]: data }));
  };

  const addItem = (section, item) => {
    setFormData(prev => {
      const existing = Array.isArray(prev[section]) ? prev[section] : [];
      return { ...prev, [section]: [...existing, item] };
    });
  };

  const updateItem = (section, index, updatedItem) => {
    setFormData(prevData => {
      const updatedSection = [...prevData[section]];
      updatedSection[index] = updatedItem;

      return { ...prevData, [section]: updatedSection };
    });
  };

  const clearFormData = () => {
    setFormData(initialFormData);
  };

  const contextValue = {
    formData,
    updateFormData,
    addItem,
    updateItem,
    setEntireFormData,

    addHouseholdComposition: (data) => addItem('householdComposition', data),
    clearFormData
  };

  return (
    <FormContext.Provider value={ contextValue }>
      {children}
    </FormContext.Provider>
  );
}

// Custom hook for accessing form context
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}

export function useFormSection(section) {
  const { formData, updateFormData } = useFormContext();
  
  const sectionData = formData[section] || {};
  
  const updateSection = (newData) => {
    updateFormData(section, { ...sectionData, ...newData });
  };
  
  return [sectionData, updateSection];
}