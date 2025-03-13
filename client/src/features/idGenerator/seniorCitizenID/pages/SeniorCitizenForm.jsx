import { useState } from "react";
import { FormProvider } from "../components/others/FormContext";

import { PersonalInfo, ContactInfo, ProfessionalInfo, FamilyComposition, FamilyComposition2,
         OscaMembership, PhotoSignature, DisplayForm } from '../components/steps'


      
export default function SeniorCitizenForm() {

  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);

  const handleNext = () => {
    if (previousPage === 8) {
      setCurrentPage(8);
      setPreviousPage(null);
    } else if (currentPage < 8) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleEdit = (pageNumber) => {
    setPreviousPage(8);
    setCurrentPage(pageNumber);
  };

  return(
    <FormProvider>
      <div className='form-container'>
        {currentPage === 1 && <PersonalInfo handleNext={handleNext}/>}
        {currentPage === 2 && <ContactInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 3 && <ProfessionalInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 4 && <FamilyComposition handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 5 && <FamilyComposition2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 6 && <OscaMembership handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 7 && <PhotoSignature handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 8 && <DisplayForm handleNext={handleNext} handleBack={handleBack} handleEdit={handleEdit}/>}

      <div className='form-pagination'>
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className={`circle ${currentPage === index + 1 ? "active" : ""}`}></div>
          ))}
        </div>
      </div>
    </FormProvider>
  )
}