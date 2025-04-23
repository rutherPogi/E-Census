import { 
  AcquiredConditionSelection,
  CongenitalConditionSelection,
  DisabilityCauseSelection,
  DisabilityTypeSelection 
} from '../DisabilitySection'



export const DisabilityDetails = ({ 
  values, 
  handleChange, 
  errors
}) => {
  return (
    <>
      <div className="section-title field-full">Disability Details</div>
      <DisabilityTypeSelection 
        value={values.disabilityType} 
        handleChange={handleChange} 
        error={errors.disabilityType} 
      />

      <DisabilityCauseSelection 
        value={values.disabilityCause} 
        handleChange={handleChange} 
        error={errors.disabilityCause} 
      />

      {values.disabilityCause === "Congenital / Inborn" && (
        <CongenitalConditionSelection 
          value={values.disabilitySpecific} 
          handleChange={handleChange} 
          error={errors.disabilitySpecific} 
        />
      )}

      {values.disabilityCause === "Acquired" && (
        <AcquiredConditionSelection 
          value={values.disabilitySpecific} 
          handleChange={handleChange} 
          error={errors.disabilitySpecific} 
        />
      )}
    </>
  );
};

export default DisabilityDetails;