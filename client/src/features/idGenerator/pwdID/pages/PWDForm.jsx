import { useState } from "react";
import { FormProvider } from "../components/others/FormContext";
import { PersonalInfo, DisabilityInfo, ContactInfo, ProfessionalInfo, OrganizationInfo,
         IDReferenceInfo, FamilyBackground, AccomplishedBy, OtherInfo, ReportingUnit, PhotoID,
         DisplayPWDInfo } from '../components/steps'


export default function PWDForm() {

  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);

  const handleNext = () => {
    if (previousPage === 12) {
      setCurrentPage(12);
      setPreviousPage(null);
    } else if (currentPage < 12) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleEdit = (pageNumber) => {
    setPreviousPage(12);
    setCurrentPage(pageNumber);
  };

  return(
    <FormProvider>
      <div className='form-container'>
        {currentPage === 1 && <PersonalInfo handleNext={handleNext}/>}
        {currentPage === 2 && <DisabilityInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 3 && <ContactInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 4 && <ProfessionalInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 5 && <OrganizationInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 6 && <IDReferenceInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 7 && <FamilyBackground handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 8 && <AccomplishedBy handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 9 && <OtherInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 10 && <ReportingUnit handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 11 && <PhotoID handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 12 && <DisplayPWDInfo handleNext={handleNext} handleBack={handleBack} handleEdit={handleEdit}/>}
        <div className='form-pagination'>
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className={`circle ${currentPage === index + 1 ? "active" : ""}`}></div>
          ))}
        </div>
      </div>
    </FormProvider>
  )
}