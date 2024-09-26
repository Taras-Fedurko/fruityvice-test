import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import { FILTER } from '../../types';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  options: FilterOption[];
  value: string;
  handleChange: (value: FILTER) => void;
  disabled: boolean;
}

function FilterSelect({
  options,
  value,
  handleChange,
  disabled
}: FilterSelectProps) {
  return (
    <Box width="300px">
      <FormControl fullWidth size="small">
      <InputLabel id="single-select-label">Group By</InputLabel>
      <Select
        disabled={disabled}
        labelId="single-select-label"
        id="single-select"
        value={value}
        onChange={(event) => {
          const {
            target: { value },
          } = event;
          handleChange(value as FILTER);
        }}
        input={<OutlinedInput id="select-single" label="Group By" />}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 224,
              width: 250,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Box>
  );
}

export default FilterSelect;
