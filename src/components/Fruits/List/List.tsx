import React from 'react';

import { List as MUIList, Divider } from '@mui/material';

import { Fruit } from '../../../types';
import ListItem from './ListItem';

interface ListProps {
  fruits: Fruit[];
}

function List({ fruits }: ListProps) {
  return (
    <MUIList>
      {fruits.map((fruit) => (
        <React.Fragment key={fruit.id}>
          <ListItem fruit={fruit} />
          <Divider component="li" />
        </React.Fragment>
      ))}
    </MUIList>
  );
}

export default React.memo(List);
