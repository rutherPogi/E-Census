import { useState, useEffect } from "react";
import { FormProvider } from "./FormContext";
import { SurveyDetails, FamilyProfile, FamilyProfile2, 
         FoodExpenses, EducationExpenses, FamilyExpenses, MonthlyExpenses,
         HouseInfo, HouseInfo2, WaterInfo, Livestock, Farmlots, CropsPlanted, 
         FruitBearingTree, FamilyResources, AppliancesOwn, Amenities, 
         CommunityIssue, ServiceAvailed, ServiceAvailed2, DisplaySurvey } from "../components/steps";


         
export default function Form({ isViewing = false, isEditing = false }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);

  const [view, setView] = useState(false);
  const [editing, setEditing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (isViewing) {
      setCurrentPage(21);
      setEditing(true);
      setView(true);
    } else if (isEditing) {
      setCurrentPage(21);
      setEditing(true);
    }
  }, [isViewing, isEditing]);

  const handleNext = () => {
    if (previousPage === 21) {
      setCurrentPage(21);
      setPreviousPage(null);
      setEditing(false);
      setUpdate(true);
    } else if (currentPage < 21) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    setCurrentPage((prev) => prev + 2);
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleRestart = () => {
    setCurrentPage(1);
  };

  const handleEdit = (pageNumber) => {
    setPreviousPage(21); // Store that we came from display page
    setCurrentPage(pageNumber);
  };

  return(
    <FormProvider>
      <div className='form-container'>
        {currentPage === 1 && <SurveyDetails handleNext={handleNext}/>}
        {currentPage === 2 && <FamilyProfile handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 3 && <FamilyProfile2 handleNext={handleNext} handleBack={handleBack}/>}
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
        {currentPage === 19 && <ServiceAvailed handleNext={handleNext} handleBack={handleBack} handleSkip={handleSkip}/>}
        {currentPage === 20 && <ServiceAvailed2 handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 21 && 
          <DisplaySurvey 
          handleRestart={handleRestart}
          handleBack={handleBack} 
          handleEdit={handleEdit} 
          isEditing={editing}
          isUpdating={update}
          firstMount={mount}
          isViewing={view}/>
        }


        <div className='form-pagination'>
          {Array.from({ length: 21 }, (_, index) => (
            <div key={index} className={`circle ${currentPage === index + 1 ? "active" : ""}`}></div>
          ))}
        </div>
      </div>
    </FormProvider>
  )
}