import { formatters } from "../../utils/formatter";
import dayjs from "dayjs";

export const mapFamilyMembers = (members) => 
  members.map(member => [
    `${member.firstName} ${member.middleName} ${member.lastName} 
     ${member.suffix === 'N/A' ? '' : member.suffix}`,
    member.age,
    formatters.date(member.birthdate),
    member.civilStatus,
    member.relationFamilyHead,
    member.occupation,
    member.skillsTraining,
    member.employmentType,
    member.philhealthNumber,
    `₱${member.monthlyIncome}`,
    member.healthStatus,
    member.remarks
  ]
);

export const mapAffiliation = (members) => 
  members.map(member => [
    member.nameAffiliated,
    member.asOfficer && dayjs(member.asOfficer).isValid()
      ? dayjs(member.asOfficer).format('MM/DD/YYYY')
      : 'N/A',
    member.asMember && dayjs(member.asMember).isValid()
      ? dayjs(member.asMember).format('MM/DD/YYYY')
      : 'N/A',
    member.organizationAffiliated
  ]
);

export const mapNonIvatan = (members) => 
  members.map(member => [
    member.name,
    member.settlement,
    member.ethnicity,
    member.origin,
    member.transient,
    member.houseOwner,
    member.transientRegistered,
    member.transientDateRegistered && dayjs(member.transientDateRegistered).isValid()
      ? dayjs(member.transientDateRegistered).format('MM/DD/YYYY')
      : 'N/A'
  ]
);

export const mapServiceAvailed = (service) => 
  service.map(service => [
    formatters.date(service.date),
    service.ngo,
    service.assistance,
    service.male,
    service.female,
    service.total,
    service.howServiceHelp,
  ]
);

export const mapLivestockData = (livestock) => 
  LIVESTOCK_TYPES.map(type => [
    type,
    formatters.number(livestock[type]?.number),
    formatters.number(livestock[type]?.own),
    formatters.number(livestock[type]?.dispersal)
  ]
);

export const mapCropsPlantedData = (livestock) => 
  LIVESTOCK_TYPES.map(type => [
    type,
    formatters.number(livestock[type]?.number),
    formatters.number(livestock[type]?.own),
    formatters.number(livestock[type]?.dispersal)
  ]
);