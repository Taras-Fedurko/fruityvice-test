import React, { useMemo } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useDispatchJarContext, useStoreJarContext } from '../../context/JarProvider';
import { FILTER } from '../../types';
import { useFruitQuery } from '../../api';

interface ActionsGroupProps {
  groupBy: FILTER;
  group: string;
}

function ActionsGroup({ groupBy, group }: ActionsGroupProps) {
  const { data = [] } = useFruitQuery();
  const setJar = useDispatchJarContext();
  const jar = useStoreJarContext();

  const addText = `Add ${group} fruits to the jar`;
  const removeText = `Remove ${group} fruits from the jar`;

  const selectedItems = useMemo(() => {
    if (groupBy === FILTER.NONE) {
      return [];
    }

    return data.filter((fruit) => fruit[groupBy] === group);
  }, [groupBy, data, group]);

  const isSomeItemInGroupSelected = useMemo(() => {
    return selectedItems.some((fruit) => jar[fruit.id] > 0);
  }, [selectedItems, jar]);

  const handleAddToJar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (groupBy === FILTER.NONE) return;

    setJar((prev) => {
      const newJar = { ...prev };

      selectedItems.forEach(fruit => {
        newJar[fruit.id] = (newJar[fruit.id] || 0) + 1;
      });

      return newJar;
    });
  };

  const handleRemoveAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (groupBy === FILTER.NONE) return;

    setJar((prev) => {
      const newJar = { ...prev };

      selectedItems.forEach(fruit => {
        if (newJar[fruit.id]) {
          delete newJar[fruit.id];
        }
      });

      return newJar;
    });
  };

  return (
    <Stack direction="row" gap={1}>
      {isSomeItemInGroupSelected && (
        <Tooltip placement="top" title={removeText}>
          <Button
            aria-label={removeText}
            onClick={handleRemoveAll}
            color="secondary"
            variant="outlined"
          >
            Remove all
          </Button>
        </Tooltip>
      )}
      <Tooltip placement="top" title={addText}>
        <Button
          aria-label={addText}
          onClick={handleAddToJar}
          color="secondary"
          variant="contained"
        >
          Add
        </Button>
      </Tooltip>
    </Stack>
  );
}

export default ActionsGroup;
