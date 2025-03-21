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
        {currentPage === 1 && <SurveyDetails handleNext={handleNext}/>}
        {currentPage === 2 && <FamilyProfile handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 3 && <FamilyProfile2 handleNext={handleNext} handleBack={() => setCurrentPage(2)}/>}
        {currentPage === 4 && <FoodExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 5 && <EducationExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 6 && <FamilyExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 7 && <MonthlyExpenses handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 8 && <HouseInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 9 && <HouseInfo2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 10 && <WaterInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 11 && <Livestock handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 12 && <Farmlots handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 13 && <CropsPlanted handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 14 && <FruitBearingTree handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 15 && <FamilyResources handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 16 && <AppliancesOwn handleNext={handleNext} handleBack={handleBack}/>}
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