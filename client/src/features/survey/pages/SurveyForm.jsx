import { useState, useEffect } from "react";
import { FormProvider } from "./FormContext";
import { SurveyDetails, FamilyProfile, FamilyProfile2, 
         FoodExpenses, EducationExpenses, FamilyExpenses, MonthlyExpenses,
         HouseInfo, HouseInfo2, WaterInfo, Livestock, Farmlots, CropsPlanted, 
         FruitBearingTree, FamilyResources, AppliancesOwn, Amenities, 
         CommunityIssue, ServiceAvailed, ServiceAvailed2, Affiliation, Affiliation2,
         NonIvatan, NonIvatan2, DisplaySurvey } from "../components/steps";


export default function Form({ isEditing = false }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setCurrentPage(25);
      setEditing(true)
    }
  }, [isEditing]);

  const handleNext = () => {
    if (previousPage === 25) {
      setCurrentPage(25);
      setPreviousPage(null);
    } else if (currentPage < 25) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleEdit = (pageNumber) => {
    setPreviousPage(25); // Store that we came from display page
    setCurrentPage(pageNumber);
  };

  return(
    <FormProvider>
      <div className='form-container'>
        {currentPage === 0 && <SurveyDetails handleNext={handleNext}/>}
        {currentPage === 0 && <FamilyProfile handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 0 && <FamilyProfile2 handleNext={handleNext} handleBack={() => setCurrentPage(2)}/>}
        {currentPage === 0 && <FoodExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 0 && <EducationExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 6 && <FamilyExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 7 && <MonthlyExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 8 && <HouseInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 9 && <HouseInfo2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 10 && <WaterInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 11 && <Livestock handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 1 && <Farmlots handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 2 && <CropsPlanted handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 3 && <FruitBearingTree handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 4 && <FamilyResources handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 5 && <AppliancesOwn handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 17 && <Amenities handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 18 && <CommunityIssue handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 19 && <ServiceAvailed handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 20 && <ServiceAvailed2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 21 && <Affiliation handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 22 && <Affiliation2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 23 && <NonIvatan handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 24 && <NonIvatan2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 25 && <DisplaySurvey handleNext={handleNext} handleBack={handleBack} handleEdit={handleEdit} isEditing={editing}/>}


        <div className='form-pagination'>
          {Array.from({ length: 25 }, (_, index) => (
            <div key={index} className={`circle ${currentPage === index + 1 ? "active" : ""}`}></div>
          ))}
        </div>
      </div>
    </FormProvider>
  )
}