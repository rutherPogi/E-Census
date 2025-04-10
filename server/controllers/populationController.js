import pool from '../config/database.js';



export const managePopulation = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.populationID,
        p.surveyID,
        p.philhealthNumber,
        p.healthStatus,
        p.remarks,
        p.isOSY,
        p.inSchool,
        p.outOfTown,
        p.isOFW,
        p.isPWD,
        p.isSoloParent,

        pi.personalInfoID,
        pi.firstName,
        pi.middleName,
        pi.lastName,
        pi.suffix,
        pi.birthdate,
        pi.age,
        pi.sex,
        pi.birthplace,
        pi.religion,
        pi.civilStatus,
        pi.relationToFamilyHead,
        pi.pwdIDNumber,
        pi.soloParentIDNumber,
        pi.seniorCitizenIDNumber,

        prof.professionalInfoID,
        prof.educationalAttainment,
        prof.skills,
        prof.occupation,
        prof.company,
        prof.employmentStatus,
        prof.employmentCategory,
        prof.employmentType,
        prof.monthlyIncome,
        prof.annualIncome,

        ci.contactInfoID,
        ci.street,
        ci.barangay,
        ci.municipality,
        ci.province,
        ci.region,
        ci.mobileNumber,
        ci.landlineNumber,
        ci.emailAddress,

        ga.governmentAffiliationID,
        ga.isAffiliated,
        ga.asOfficer,
        ga.asMember,
        ga.organizationAffiliated,

        ni.nonIvatanID,
        ni.isIpula,
        ni.settlementDetails,
        ni.ethnicity,
        ni.placeOfOrigin,
        ni.isTransient,
        ni.houseOwner,
        ni.isRegistered,
        ni.dateRegistered

        FROM Population p
        LEFT JOIN PersonalInformation pi ON p.populationID = pi.populationID
        LEFT JOIN ProfessionalInformation prof ON p.populationID = prof.populationID
        LEFT JOIN ContactInformation ci ON p.populationID = ci.populationID
        LEFT JOIN GovernmentAffiliation ga ON p.populationID = ga.populationID
        LEFT JOIN NonIvatan ni ON p.populationID = ni.populationID
        
        ORDER BY p.populationID ASC
  `);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching population:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching population', 
      error: error.message 
    });
  }
}