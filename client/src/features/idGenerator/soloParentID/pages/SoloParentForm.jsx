import { useState } from "react";
import { FormProvider } from "../components/others/FormContext";
import PersonalInfo from "../components/steps/PersonalInfo";
import ContactInfo from "../components/steps/ContactInfo";
import ProfessionalInfo from "../components/steps/ProfessionalInfo";
import OtherInfo from "../components/steps/OtherInfo";
import HouseholdComposition from "../components/steps/HouseholdComposition";
import HouseholdComposition2 from "../components/steps/HouseholdComposition2";
import ProblemNeeds from "../components/steps/ProblemNeeds";
import EmergencyContact from "../components/steps/EmergencyContact";
import ApplicationDetails from "../components/steps/ApplicationDetails";
import DisplayApplication from "../components/steps/DisplayForm";
import SPMedia from "../components/steps/SPMedia";



export default function SoloParentForm() {

  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);

  const handleNext = () => {
    if (previousPage === 10) {
      setCurrentPage(10);
      setPreviousPage(null);
    } else if (currentPage < 10) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleEdit = (pageNumber) => {
    setPreviousPage(10);
    setCurrentPage(pageNumber);
  };

  return(
    <FormProvider>
      <div className='form-container'>
        {currentPage === 1 && <PersonalInfo handleNext={handleNext}/>}
        {currentPage === 2 && <ContactInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 3 && <ProfessionalInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 4 && <OtherInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 5 && <HouseholdComposition handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 6 && <HouseholdComposition2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 7 && <ProblemNeeds handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 8 && <EmergencyContact handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 9 && <ApplicationDetails handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 10 && <SPMedia handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 11 && <DisplayApplication handleNext={handleNext} handleBack={handleBack} handleEdit={handleEdit}/>}
        

      <div className='form-pagination'>
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className={`circle ${currentPage === index + 1 ? "active" : ""}`}></div>
          ))}
        </div>
      </div>
    </FormProvider>
  )
}