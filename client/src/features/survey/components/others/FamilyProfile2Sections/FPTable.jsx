import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import FamilyMemberTableHeader from './FPTableHeader';
import FamilyMemberTableRow from './FPTableRow';




const FamilyMemberTable = ({ familyMembers, handleEdit, handleDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <FamilyMemberTableHeader />
        <TableBody>
          {familyMembers.map((member, index) => (
            <FamilyMemberTableRow 
              key={index}
              member={member}
              index={index}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FamilyMemberTable;