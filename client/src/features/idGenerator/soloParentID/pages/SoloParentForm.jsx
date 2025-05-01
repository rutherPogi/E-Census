import { useState, useEffect } from "react";
import { FormProvider } from "../components/others/FormContext";

import PersonalInfo from "../components/steps/PersonalInfo";
import HouseholdComposition from "../components/steps/HouseholdComposition";
import HouseholdComposition2 from "../components/steps/HouseholdComposition2";
import ProblemNeeds from "../components/steps/ProblemNeeds";
import EmergencyContact from "../components/steps/EmergencyContact";
import DisplaySPInfo from "../components/steps/DisplaySPInfo";
import SPMedia from "../components/steps/SPMedia";
import PrintID from "../components/steps/PrintID";



export default function SoloParentForm({ hasSPID = false, isRegistered = false, isViewing = false}) {

  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);

  const [registered, setRegistered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [mount, setMount] = useState(false);
  const [view, setView] = useState(false);

  useEffect(() => {
    if (isRegistered) {
      setRegistered(true);
    } else if (hasSPID) {
      setCurrentPage(7);
      setEditing(true);
      setMount(true);
    } else if (isViewing) {
      setCurrentPage(7);
      setEditing(true);
      setView(true);
    }
  }, [ isRegistered, hasSPID ]);

  const handleNext = () => {
    if (previousPage === 7) {
      setCurrentPage(7);
      setPreviousPage(null);
      setEditing(false);
      setUpdate(true);
      setMount(false);
    } else if (currentPage < 8) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleEdit = (pageNumber) => {
    setPreviousPage(7);
    setCurrentPage(pageNumber);
  };

  return(
    <FormProvider>
      <div className='form-container'>
        {currentPage === 1 && 
          <PersonalInfo 
            handleNext={handleNext}
            handleBack={handleBack} 
            isRegistered={registered} 
          />
        }

        {currentPage === 2 && <HouseholdComposition handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 3 && <HouseholdComposition2 handleNext={handleNext} handleBack={handleBack}/>}

        {currentPage === 4 && <ProblemNeeds handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 5 && <EmergencyContact handleNext={handleNext} handleBack={handleBack}/>}

        {currentPage === 6 && <SPMedia handleNext={handleNext} handleBack={handleBack}/>}

        {currentPage === 7 && 
          <DisplaySPInfo 
            handleNext={handleNext} 
            handleBack={handleBack} 
            handleEdit={handleEdit}
            isEditing={editing}
            isUpdating={update}
            firstMount={mount}
            isViewing={view}
          />
        } 

        {currentPage === 8 && <PrintID handleNext={handleNext} handleBack={handleBack} />} 

      <div className='form-pagination'>
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className={`circle ${currentPage === index + 1 ? "active" : ""}`}></div>
          ))}
        </div>
      </div>
    </FormProvider>
  )
}