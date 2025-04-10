import { FormButtons } from "../../../../components/common";

import { useServiceForm } from '../../hooks/useService';
import { ServiceFormFields } from '../others/ServiceAvailedSection/ServiceFormField';



export default function ServiceAvailed({ handleBack, handleNext, handleSkip }) {

  const {
    values,
    errors,
    handleChange,
    handleDateChange,
    handleNumberChange,
    handleSubmit,
    isFormEmpty
  } = useServiceForm();

  const nextAction = isFormEmpty ? handleSkip : handleSubmit(handleNext);
  const nextLabel = isFormEmpty ? "Skip" : "Next";

  return(
    <div className='responsive-container'>
      <div className='responsive-header'>ASSISTANCE/SERVICE ALREADY AVAILED</div>
      <div className='responsive-form details'>
        <ServiceFormFields 
          values={values}
          errors={errors}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handleNumberChange={handleNumberChange}
        />
      </div>
      <FormButtons 
        onBack={handleBack}
        onNext={nextAction}
        backLabel="Back"
        nextLabel={nextLabel}
      />
    </div>
  )
}