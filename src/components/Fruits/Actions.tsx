import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatchJarContext, useStoreJarContext } from '../../context/JarProvider';
import { Fruit } from '../../types';

interface ActionsProps {
  fruit: Fruit;
}

function Actions({ fruit }: ActionsProps) {
  const jar = useStoreJarContext();
  const setJar = useDispatchJarContext();

  const { id, name } = fruit;

  const handleAddToJar = () => {
    setJar((prev) => {
      if (prev[id]) {
        return {
          ...prev,
          [id]: prev[id] + 1,
        }
      }

      return {
        ...prev,
        [id]: 1,
      }
    });
  };

  const handleRemoveFromJar = () => {
    setJar((prev) => {
      if (prev[id] > 0) {
        return {
          ...prev,
          [id]: prev[id] - 1,
        }
      }

      return prev;
    });
  };

  const addText = `Add ${name} to the jar`;
  const removeText = `Remove ${name} from the jar`;
  
  return (
    <>
      {!!jar[id] && (
        <Tooltip placement="top" title={removeText}>
          <IconButton aria-label={removeText} onClick={handleRemoveFromJar}>
            <Icon>
              <DeleteIcon />
            </Icon>
          </IconButton>
        </Tooltip>
      )}
      <Tooltip placement="top" title={addText}>
        <IconButton aria-label={addText} onClick={handleAddToJar}>
          <Icon>
            <AddIcon />
          </Icon>
        </IconButton>
      </Tooltip>
    </>
  )
}

export default Actions;