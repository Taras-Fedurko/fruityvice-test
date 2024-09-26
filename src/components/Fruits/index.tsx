import React, { useMemo, useState } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

import { FILTER, Fruit } from '../../types';
import { useFruitQuery } from '../../api';

import SwitchViewButton from './SwitchViewButton';
import FilterSelect from './FilterSelect';
import Placeholder from './Placeholder';
import Table from './Table';
import List from './List';

const options = [
  { label: 'None', value: FILTER.NONE },
  { label: 'Family', value: FILTER.FAMILY },
  { label: 'Genus', value: FILTER.GENUS },
  { label: 'Order', value: FILTER.ORDER },
];

function Fruits() {
  const [groupBy, setGroupBy] = useState<FILTER>(FILTER.NONE);
  const [isList, setIsList] = useState<boolean>(true);

  const { data = [], isLoading } = useFruitQuery();

  const groupedFruits = useMemo(() => {
    if (!data || groupBy === FILTER.NONE) return { [FILTER.NONE]: data };

    return data.reduce<Record<string, Fruit[]>>((groups, fruit) => {
      const groupKey = fruit[groupBy];
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(fruit);
      return groups;
    }, {});
  }, [data, groupBy]);

  return (
    <Box>
      <Grid container direction="row" alignItems="center" marginBottom={4}>
        <Grid size={{ xs: 12, sm: 4 }} paddingBottom={{ xs: 3, sm: 0 }} alignItems="center" textAlign={{ xs: 'center', sm: 'start' }}>
          <Typography variant='h4'>Fruits</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }} display="flex" direction="row" justifyContent={{ xs: 'center', sm: 'flex-end' }}  gap={2}>
            <FilterSelect
              disabled={isLoading}
              options={options}
              value={groupBy}
              handleChange={setGroupBy}
            />
            <SwitchViewButton setIsList={setIsList} isList={isList} />
        </Grid>
      </Grid>

      {isLoading && <Placeholder />}

      {isList ? (
        <List groupBy={groupBy} fruits={groupedFruits} />
      ) : (
        <Table groupBy={groupBy} fruits={groupedFruits} />
      )}
    </Box>
  );
}

export default React.memo(Fruits);
