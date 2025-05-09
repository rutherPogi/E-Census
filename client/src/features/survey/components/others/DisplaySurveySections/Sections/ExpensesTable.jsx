import { Box, Typography, Tooltip, Button,  TableContainer, TableHead, TableRow, TableCell, TableBody, Table } from "@mui/material";
import { Edit, Person, Work, People } from "@mui/icons-material";
import { formatters } from "../../../../utils/formatter";



export const RenderExpensesTable = ({ formData, expenseType, handleEdit, isViewing = false }) => {

  const expenses = formData?.[expenseType]?.expenses;
  const total = formData?.[expenseType]?.[`${expenseType.replace('Expenses', '')}Total`];

  function formatExpenseType(expenseType) {
    return expenseType
      .replace(/([A-Z])/g, ' $1')     // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
  }

  const expenseTypeMap = {
    foodExpenses: 4,
    educationExpenses: 5,
    familyExpenses: 6,
    monthlyExpenses: 7,
  };
  
  

  return (
    <Box
      sx={{ 
        backgroundColor: 'white',
        padding: { xs: '1em', md: '2em' }
        }}
      >
        <Box sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          pb: 1
        }}>
          <Box sx={{ alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center'}}>
              <People/>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {formatExpenseType(expenseType)}  
              </Typography> 
            </Box>
          </Box>
          {!isViewing && (
            <Tooltip title="Edit section">
              <Button
                onClick={() => handleEdit(expenseTypeMap[expenseType])}
                variant="outlined"
                color="primary"
                startIcon={<Edit/>}
              >
                EDIT
              </Button>
            </Tooltip>
          )}
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Item</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(Object.entries(expenses)) && Object.entries(expenses).length > 0 ? (
                Object.entries(expenses).map(([item, amount]) => (
                  <TableRow key={item} hover>
                    <TableCell component="th" scope="row">
                      {item.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </TableCell>
                    <TableCell align="right">
                      {`₱${amount ? amount : '0.00'}`}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No expenses available
                  </TableCell>
                </TableRow>
              )}
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>TOTAL</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                  {`₱${total ? total.toFixed(2) : '0.00'}`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
  );
};