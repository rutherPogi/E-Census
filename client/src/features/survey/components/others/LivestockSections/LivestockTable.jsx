import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper
} from '@mui/material';
import NumberField from "./NumberField";




const LivestockTable = ({ types, values, errors, handleChange }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Livestock/Animals</TableCell>
            <TableCell align="center">Number</TableCell>
            <TableCell align="center">Own</TableCell>
            <TableCell align="center">Dispersal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {types.map((type) => (
            <TableRow key={type}>
              <TableCell component="th" scope="row" style={{ textTransform: 'capitalize' }}>
                {type}
              </TableCell>
              {['number', 'own', 'dispersal'].map((field) => (
                <TableCell key={`${type}-${field}`} align="center" sx={{padding:0}}>
                  <NumberField
                    value={values[type][field]}
                    onChange={handleChange(type, field)}
                    error={errors[type]?.[field]}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LivestockTable;