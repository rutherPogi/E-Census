import { TableCell, TableRow, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';




const FamilyMemberTableRow = ({ member, index, handleEdit, handleDelete }) => {

  return (
    
    <TableRow>
      <TableCell>
        {`${member.firstName} 
          ${member.middleName ? member.middleName : '' } 
          ${member.lastName} 
          ${member.suffix ? member.suffix : '' }`}
      </TableCell>
      <TableCell>{member.age || member.formattedAge}</TableCell>
      <TableCell>
        {
          member.birthdate 
          ? dayjs(member.birthdate).format('MM/DD/YYYY') 
          : 'N/A'
        }
      </TableCell>
      <TableCell>{member.civilStatus}</TableCell>
      <TableCell>{member.relationToFamilyHead}</TableCell>
      <TableCell>{member.occupation || 'N/A'}</TableCell>
      <TableCell>{member.skills || 'N/A'}</TableCell>
      <TableCell>{member.employmentType || 'N/A'}</TableCell>
      <TableCell>{member.philhealthNumber || 'N/A'}</TableCell>
      <TableCell>{`₱${member.monthlyIncome}`}</TableCell>
      <TableCell>{member.healthStatus || 'N/A'}</TableCell>
      <TableCell>{member.remarks || 'N/A'}</TableCell>

      <TableCell>{Boolean(member.outOfTown) ? 'YES' : 'NO' }</TableCell>
      <TableCell>{Boolean(member.isOFW) ? 'YES' : 'NO' }</TableCell>

      <TableCell>{Boolean(member.isOSY) ? 'YES' : 'NO' }</TableCell>
      <TableCell>{Boolean(member.inSchool) ? 'YES' : 'NO' }</TableCell>

      <TableCell>{Boolean(member.isPWD) ? 'YES' : 'NO' }</TableCell>
      <TableCell>{Boolean(member.isSoloParent) ? 'YES' : 'NO'}</TableCell>

      <TableCell>{Boolean(member.isIpula) ? 'YES' : 'NO'}</TableCell>
      <TableCell>{member.settlementDetails || 'N/A'}</TableCell>
      <TableCell>{member.ethnicity || 'N/A'}</TableCell>
      <TableCell>{member.placeOfOrigin || 'N/A'}</TableCell>

      <TableCell>{Boolean(member.isTransient) ? 'YES' : 'NO'}</TableCell>
      <TableCell>{member.houseOwner || 'N/A'}</TableCell>
      <TableCell>{Boolean(member.isRegistered) ? 'YES' : 'NO'}</TableCell>
      <TableCell>
        {
          member.dateRegistered
          ? dayjs(member.dateRegistered).format('MM/DD/YYYY') 
          : 'N/A'
        }
      </TableCell>

      <TableCell>{Boolean(member.isAffiliated) ? 'YES' : 'NO'}</TableCell>
      <TableCell>
        {
          member.asOfficer
          ? dayjs(member.asOfficer).format('MM/DD/YYYY') 
          : 'N/A'
        }
      </TableCell>
      <TableCell>
        {
          member.asMember
          ? dayjs(member.asMember).format('MM/DD/YYYY') 
          : 'N/A'
        }
      </TableCell>
      <TableCell>{member.organizationAffiliated || 'N/A'}</TableCell>
      
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