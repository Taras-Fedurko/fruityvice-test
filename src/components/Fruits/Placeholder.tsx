import React from 'react';
import { List, ListItem, Divider, Box, Skeleton, IconButton, Icon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ITEMS = 20;

function ListItemPlaceholder() {
  return (
    <ListItem alignItems="center">
      <Box width="45%">
        <Skeleton variant="text" width="100px" />
      </Box>
      <Skeleton variant="text" width="70px" />
      <Box marginLeft="auto">      
        <IconButton disabled>
          <Icon>
            <AddIcon />
          </Icon>
        </IconButton>
      </Box>
    </ListItem>
  )
}

function Placeholder() {
  return (
    <List>
      {Array.from({ length: ITEMS }).map((_, index) => (
        <React.Fragment key={`placeholder-${index}`}>
          <ListItemPlaceholder />
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  )
}

export default Placeholder;