import { useState } from 'react';
import {
  TableRow,
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { FILTER, Fruit } from '../../../types';
import Actions from '../Actions';
import TableCell from './TableCell';
import AddGroupButton from '../AddGroupButton';

interface GroupItemProps {
  group: string;
  fruits: Fruit[];
  groupBy: FILTER;
}

function GroupItem({ group, fruits, groupBy }: GroupItemProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <>
      {groupBy !== FILTER.NONE && (
        <TableRow>
          <TableCell colSpan={6} onClick={toggleCollapse} sx={{ cursor: 'pointer', paddingX: 0 }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="h6">{group}</Typography>
              <Stack direction="row" marginLeft="auto" gap={2}>
                <AddGroupButton groupBy={groupBy} group={group} />
                <IconButton area-label="Collapse item" size="small">
                  {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                </IconButton>
              </Stack>
            </Stack>
          </TableCell>
        </TableRow>
      )}

      {!isCollapsed && fruits.map((fruit) => (
        <TableRow key={fruit.id}>
          <TableCell>{fruit.name}</TableCell>
          <TableCell>{fruit.family}</TableCell>
          <TableCell>{fruit.order}</TableCell>
          <TableCell>{fruit.genus}</TableCell>
          <TableCell>{fruit.nutritions.calories}</TableCell>
          <TableCell align="right" width="120px">
            <Stack width="100%" direction="row" justifyContent="flex-end" gap={0.5}>
              <Actions fruit={fruit} />
            </Stack>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default GroupItem;
