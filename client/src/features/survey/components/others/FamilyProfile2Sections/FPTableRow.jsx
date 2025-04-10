import { TableCell, TableRow, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';




const FamilyMemberTableRow = ({ member, index, handleEdit, handleDelete }) => {

  return (
    
    <TableRow>
      <TableCell>
        {`${member.firstName} 
          ${member.middleName === 'N/A' ? '' : member.middleName} 
          ${member.lastName} 
          ${member.suffix === 'N/A' ? '' : member.suffix}`}
      </TableCell>
      <TableCell>{member.age}</TableCell>
      <TableCell>
        {
          member.birthdate 
          ? dayjs(member.birthdate).format('MM/DD/YYYY') 
          : 'N/A'
        }
      </TableCell>
      <TableCell>{member.civilStatus}</TableCell>
      <TableCell>{member.relationToFamilyHead}</TableCell>
      <TableCell>{member.occupation}</TableCell>
      <TableCell>{member.skills}</TableCell>
      <TableCell>{member.employmentType}</TableCell>
      <TableCell>{member.philhealthNumber}</TableCell>
      <TableCell>{`₱${member.monthlyIncome}`}</TableCell>
      <TableCell>{member.healthStatus}</TableCell>
      <TableCell>{member.remarks}</TableCell>

      <TableCell>{Boolean(member.outOfTown) ? 'YES' : 'NO' }</TableCell>
      <TableCell>{Boolean(member.isOFW) ? 'YES' : 'NO' }</TableCell>

      <TableCell>{Boolean(member.isOSY) ? 'YES' : 'NO' }</TableCell>
      <TableCell>{Boolean(member.inSchool) ? 'YES' : 'NO' }</TableCell>

      <TableCell>{Boolean(member.isPWD) ? 'YES' : 'NO' }</TableCell>
      <TableCell>{Boolean(member.isSoloParent) ? 'YES' : 'NO'}</TableCell>

      <TableCell>{Boolean(member.isIpula) ? 'YES' : 'NO'}</TableCell>
      <TableCell>{member.settlementDetails}</TableCell>
      <TableCell>{member.ethnicity}</TableCell>
      <TableCell>{member.placeOfOrigin}</TableCell>

      <TableCell>{Boolean(member.isTransient) ? 'YES' : 'NO'}</TableCell>
      <TableCell>{member.houseOwner}</TableCell>
      <TableCell>{Boolean(member.isRegistered) ? 'YES' : 'NO'}</TableCell>
      <TableCell>
        {
          member.dateRegistered === 'N/A' || member.dateRegistered === null
          ? 'N/A'
          : dayjs(member.dateRegistered).format('MM/DD/YYYY') 
        }
      </TableCell>

      <TableCell>{Boolean(member.isAffiliated) ? 'YES' : 'NO'}</TableCell>
      <TableCell>
        {
          member.asOfficer === 'N/A' || member.asOfficer === null
          ? 'N/A'
          : dayjs(member.asOfficer).format('MM/DD/YYYY') 
        }
      </TableCell>
      <TableCell>
        {
          member.asMember === 'N/A' || member.asMember === null
          ? 'N/A'
          : dayjs(member.asMember).format('MM/DD/YYYY') 
        }
      </TableCell>
      <TableCell>{member.organizationAffiliated}</TableCell>
      
      <TableCell>
        <IconButton 
          color="primary" 
          onClick={() => handleEdit(index)}
          aria-label="edit family member"
        >
          <Edit/>
        </IconButton>
        <IconButton 
          color="error" 
          onClick={() => handleDelete(index)}
          aria-label="delete family member"
        >
          <Delete/>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default FamilyMemberTableRow;