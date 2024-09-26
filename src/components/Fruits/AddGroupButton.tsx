import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import AddIcon from '@mui/icons-material/Add';

import { useDispatchJarContext } from '../../context/JarProvider';
import { FILTER } from '../../types';
import { useFruitQuery } from '../../api';

interface AddGroupButtonProps {
  groupBy: FILTER;
  group: string;
}

function AddGroupButton({ groupBy, group }: AddGroupButtonProps) {
  const { data = [] } = useFruitQuery();

  const setJar = useDispatchJarContext();

  const addText = `Add ${group} fruits to the jar`;

  const handleAddToJar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (groupBy === FILTER.NONE) return;

    const selectedItems = data.filter((fruit) => fruit[groupBy] === group);

    setJar((prev) => {
      const newJar = { ...prev };
      
      selectedItems.forEach(fruit => {
        newJar[fruit.id] = (newJar[fruit.id] || 0) + 1;
      });
    
      return newJar;
    });
    
  }

  return (
    <Tooltip placement="top" title={addText}>
      <IconButton aria-label={addText} onClick={handleAddToJar}>
        <Icon>
          <AddIcon />
        </Icon>
      </IconButton>
    </Tooltip>
  );
}

export default AddGroupButton;
