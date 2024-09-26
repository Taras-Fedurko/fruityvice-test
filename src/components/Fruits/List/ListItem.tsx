import React from 'react';
import { ListItem as MUIListItem, Typography, Box } from '@mui/material';

import { Fruit } from '../../../types';
import Actions from '../Actions';

interface ListItemProps {
  fruit: Fruit;
}

function ListItem({ fruit }: ListItemProps) {
  return (
    <MUIListItem alignItems="center">
      <Box width="45%">
        <Typography variant="body1" component="span">
          {fruit.name}
        </Typography>
      </Box>
      <Typography variant="body2" component="span" sx={{ color: 'gray' }}>
        {fruit.nutritions.calories} calories
      </Typography>
      <Box marginLeft="auto" display="flex" gap={2}>
        <Actions fruit={fruit} />
      </Box>
    </MUIListItem>
  );
}

export default React.memo(ListItem);
