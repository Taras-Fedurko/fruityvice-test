import { PropsWithChildren } from 'react';
import { TableCell as MuiTableCell, TableCellProps } from '@mui/material';

function TableCell({ children, ...props }: PropsWithChildren<TableCellProps>) {
  return (
    <MuiTableCell
      align="left" 
      sx={{ p: 1 }}
      {...props}
    >{children}</MuiTableCell>
  )
}

export default TableCell;
