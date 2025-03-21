import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Box } from "@mui/material";
import { formatters } from "../../utils/formatter";
import { SectionHeader } from "./SectionHeader";

export const ResponsiveTableContainer = ({ children, sx, title, handleEdit, pageNumber }) => (
  <TableContainer 
    component={Paper}
    sx={{ 
      borderRadius: '5px',
      '& .MuiTable-root': {
        borderRadius: '5px',
        overflow: 'hidden'
      },
      ...sx
    }}
  >
    <SectionHeader title={title} handleEdit={handleEdit} pageNumber={pageNumber} />
    {children}
  </TableContainer>
);

export const StandardTable = ({ headers, data, title, handleEdit, pageNumber }) => (
    <Table aria-label={title}>
      <TableHead>
        <TableRow>
          {headers.map((header, index) => (
            <TableCell key={index}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
);

export const ExpenseTable = ({ expenses, total, title }) => (
    <Table aria-label={`${title} expenses table`}>
      <TableHead>
        <TableRow>
          <TableCell>Category</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(expenses).map(([category, amount], index) => (
          <TableRow key={index}>
            <TableCell component="th">{category}</TableCell>
            <TableCell>{`₱${formatters.currency(amount)}`}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell component="th" sx={{ fontWeight: 'bold' }}>Total</TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>{`₱${formatters.currency(total)}`}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
);

export const ResourcesTable = ({ expenses,  title }) => (
  <Table aria-label={`${title} resources table`}>
    <TableHead>
      <TableRow>
        <TableCell>Category</TableCell>
        <TableCell>Amount</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Object.entries(expenses).map(([category, amount], index) => (
        <TableRow key={index}>
          <TableCell component="th">{category}</TableCell>
          <TableCell>{`₱${formatters.currency(amount)}`}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);


export const ItemQuantityTable = ({ items, itemData, title, handleEdit, pageNumber }) => (
  
    <Table aria-label={`${title} table`}>
      <TableHead>
        <TableRow>
          <TableCell>{title}</TableCell>
          <TableCell align="center">Quantity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item}>
            <TableCell component="th">{item}</TableCell>
            <TableCell align="center">{itemData[item]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  
  
);

export const KeyValueTable = ({ 
  data, 
  firstHeader, 
  secondHeader, 
  formatValue = (v) => v,
  unit,
  title
}) => (
  
    <Table aria-label={`${title} table`}>
      <TableHead>
        <TableRow>
          <TableCell>{firstHeader}</TableCell>
          <TableCell>{secondHeader}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(data || {}).map(([key, value], index) => (
          <TableRow key={index}>
            <TableCell component="th">{key}</TableCell>
            <TableCell>
              {formatValue(value)}{unit && ` ${unit}`}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  
  
);

export const LivestockTable = ({ livestock, livestockTypes, title = "livestock"}) => (
      <Table aria-label={`${title} table`}>
        <TableHead>
          <TableRow>
            <TableCell>Livestock/Animals</TableCell>
            <TableCell align="center">Number</TableCell>
            <TableCell align="center">Own</TableCell>
            <TableCell align="center">Dispersal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {livestockTypes.map((type) => (
            <TableRow key={type}>
              <TableCell component="th" scope="row" sx={{ textTransform: 'capitalize' }}>
                {type}
              </TableCell>
              <TableCell align="center">{livestock[type]?.number}</TableCell>
              <TableCell align="center">{livestock[type]?.own}</TableCell>
              <TableCell align="center">{livestock[type]?.dispersal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
  
);