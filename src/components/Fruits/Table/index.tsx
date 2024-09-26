import React, { PropsWithChildren } from 'react';
import {
  Table, TableBody, TableCell as MuiTableCell, TableCellProps, TableContainer, TableHead, TableRow, Typography, Box, Stack,
} from '@mui/material';

import { FilteredFruits, FILTER } from '../../../types';
import Actions from '../Actions';
import GroupItem from './GroupItem';
import TableCell from './TableCell';

interface TableViewProps {
  groupBy: FILTER;
  fruits: FilteredFruits;
}

function TableView({ groupBy, fruits }: TableViewProps) {
  return (
    <TableContainer component={Box}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Family</TableCell>
            <TableCell>Order</TableCell>
            <TableCell>Genus</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell align="right" width="120px">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(fruits).map((group) => (
            <GroupItem
              key={group}
              group={group}
              fruits={fruits[group]}
              groupBy={groupBy}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableView;
