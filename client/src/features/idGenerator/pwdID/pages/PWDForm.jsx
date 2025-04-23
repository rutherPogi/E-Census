import { useState, useEffect } from "react";
import { FormProvider } from "../components/others/FormContext";
import { 
  PersonalInfo, 
  OtherInfo,
  DisplayPWDInfo, 
  PwdMedia, 
  PrintID,
  FamilyBackground
} from '../components/steps'



export default function PWDForm({ hasPWDID = false, isRegistered = false }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);

  const [registered, setRegistered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [update, setUpdate] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    console.log('REGISTERED', isRegistered);
    if (isRegistered) {
      setRegistered(true);
    } else if (hasPWDID) {
      setCurrentPage(5);
      setEditing(true);
      setMount(true);
    }
  }, [ isRegistered, hasPWDID ]);

  const handleNext = () => {
    if (previousPage === 5) {
      setCurrentPage(5);
      setPreviousPage(null);
      setEditing(false);
      setUpdate(true);
      setMount(false);
    } else if (currentPage < 6) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleEdit = (pageNumber) => {
    setPreviousPage(5);
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
        {currentPage === 2 && <FamilyBackground handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 3 && <OtherInfo handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 4 && <PwdMedia handleNext={handleNext} handleBack={handleBack}/>}
        {currentPage === 5 && 
          <DisplayPWDInfo 
            handleNext={handleNext} 
            handleBack={handleBack} 
            handleEdit={handleEdit}
            isEditing={editing}
            isUpdating={update}
            firstMount={mount}

          />
        }
        {currentPage === 6 && <PrintID handleNext={handleNext} handleBack={handleBack} handleEdit={handleEdit}/>}

        <div className='form-pagination'>
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className={`circle ${currentPage === index + 1 ? "active" : ""}`}></div>
          ))}
        </div>
      </div>
    </FormProvider>
  )
}