import { Box, TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from "@mui/material";



export const renderExpensesTable = (formData, expenseType) => {

  const expenses = formData?.[expenseType]?.expenses;
  const total = formData?.[expenseType]?.[`${expenseType.replace('Expenses', '')}Total`];
  
  if (!expenses) return null;
  
  return (
    <Box sx={{ mb: 4 }}>
      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Item</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(expenses).map(([item, amount]) => (
              <TableRow key={item} hover>
                <TableCell component="th" scope="row">
                  {item.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </TableCell>
                <TableCell align="right">
                  {`₱${amount ? amount : '0.00'}`}
                </TableCell>
              </TableRow>
            ))}
            {total && (
              <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {`₱${total ? total : '0.00'}`}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};