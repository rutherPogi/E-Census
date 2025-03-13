import { useState } from "react";
import { FormProvider } from "./FormContext";
import { SurveyDetails, FamilyProfile, FamilyProfile2, 
         FoodExpenses, EducationExpenses, FamilyExpenses, MonthlyExpenses,
         HouseInfo, WaterInfo, Livestock, Farmlots, CropsPlanted, 
         FruitBearingTree, FamilyResources, AppliancesOwn, Amenities, 
         CommunityIssue, ServiceAvailed, ServiceAvailed2, Affiliation, Affiliation2,
         NonIvatan, NonIvatan2, DisplaySurvey } from "../components/steps";


export default function Form() {

  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);

  const handleNext = () => {
    if (previousPage === 24) {
      setCurrentPage(24);
      setPreviousPage(null);
    } else if (currentPage < 24) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleEdit = (pageNumber) => {
    setPreviousPage(24); // Store that we came from display page
    setCurrentPage(pageNumber);
  };

  return(
    <FormProvider>
      <div className='form-container'>
        {currentPage === 1 && <SurveyDetails handleNext={handleNext}/>}
        {currentPage === 2 && <FamilyProfile handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 3 && <FamilyProfile2 handleNext={handleNext} handleBack={() => setCurrentPage(2)}/>}
        {currentPage === 4 && <FoodExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 5 && <EducationExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 6 && <FamilyExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 7 && <MonthlyExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 8 && <HouseInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 9 && <WaterInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 10 && <Livestock handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 11 && <Farmlots handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 12 && <CropsPlanted handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 13 && <FruitBearingTree handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 14 && <FamilyResources handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 15 && <AppliancesOwn handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 16 && <Amenities handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 17 && <CommunityIssue handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 18 && <ServiceAvailed handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 19 && <ServiceAvailed2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 20 && <Affiliation handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 21 && <Affiliation2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 22 && <NonIvatan handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 23 && <NonIvatan2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 24 && <DisplaySurvey handleNext={handleNext} handleBack={handleBack} handleEdit={handleEdit}/>}
        <div className='form-pagination'>
          {Array.from({ length: 24 }, (_, index) => (
            <div key={index} className={`circle ${currentPage === index + 1 ? "active" : ""}`}></div>
          ))}
        </div>
      </div>
    </FormProvider>
  )
}