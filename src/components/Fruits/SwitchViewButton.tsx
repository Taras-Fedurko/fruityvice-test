import ViewListIcon from '@mui/icons-material/ViewList';
import TableViewIcon from '@mui/icons-material/TableView';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';

interface SwitchViewButtonProps {
  isList: boolean;
  setIsList: (isList: boolean) => void
}

function SwitchViewButton({ setIsList, isList }: SwitchViewButtonProps) {
  return (
    <Tooltip placement="bottom" title={`Switch to ${isList ? 'table' : 'list'} view`}>
      <IconButton
        aria-label={isList ? 'Switch to table view' : 'Switch to list view'}
        onClick={() => setIsList(!isList)}
      >
        <Icon>
          {isList ? (
            <TableViewIcon />
          ) : (
            <ViewListIcon />
          )}
        </Icon>
      </IconButton>
    </Tooltip>
  )
}

export default SwitchViewButton;