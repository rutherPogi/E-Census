import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

const initialFormData = {
  surveyData: {},
  familyMembers: [],
  foodExpenses: {},
  educationExpenses: {},
  familyExpenses: {},
  monthlyExpenses: {},
  houseInfo: {},
  waterInfo: {},
  livestock: {},
  farmlots: {},
  cropsPlanted: {},
  fruitBearingTree: {},
  familyResources: {},
  appliancesOwn: {},
  amenitiesOwn: {},
  communityIssues: {},
  serviceAvailed: [],
  affiliation: [],
  nonIvatan: [],
  transient: {}
}; 

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(initialFormData);

  const setEntireFormData = (newFormData) => {
    setFormData(newFormData);
  };

  // Update any form section with new data
  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Generic function to add an item to any array in formData
  // addItem('familyMembers', memberData);
  // addItem('serviceAvailed', serviceData);
  const addItem = (section, item) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
  };

  const updateItem = (section, index, updatedItem) => {
    setFormData(prevData => {
      const updatedSection = [...prevData[section]];
      updatedSection[index] = updatedItem;
      return {
        ...prevData,
        [section]: updatedSection
      };
    });
  };
 
  const clearFormData = () => {
    setFormData(initialFormData);
  };

  // Create a value object with all the context functions
  const contextValue = {
    formData,
    updateFormData,
    addItem,
    updateItem,
    setEntireFormData,
    
    addFamilyMember: (data) => addItem('familyMembers', data),
    addServiceAvailed: (data) => addItem('serviceAvailed', data),
    addAffiliation: (data) => addItem('affiliation', data),
    addNonIvatan: (data) => addItem('nonIvatan', data),
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

// const [foodExpenses, updateFoodExpenses] = useFormSection('foodExpenses');