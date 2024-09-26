import React, { useMemo, useState } from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
      <Stack direction="row" alignItems="center" marginBottom={4}>
        <Typography variant='h4'>Fruits</Typography>
        <Stack direction="row" gap={2} marginLeft="auto">
          <FilterSelect
            disabled={isLoading}
            options={options}
            value={groupBy}
            handleChange={setGroupBy}
          />
          <SwitchViewButton setIsList={setIsList} isList={isList} />
        </Stack>
      </Stack>

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
