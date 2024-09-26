import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { FILTER, FilteredFruits } from '../../../types';
import AddGroupButton from '../AddGroupButton';
import List from './List';

interface ListIFilteredProps {
  fruits: FilteredFruits;
  groupBy: FILTER;
}

function ListView({ groupBy, fruits }: ListIFilteredProps) {
  if (groupBy === FILTER.NONE) {
    return <List fruits={fruits[FILTER.NONE]} />
  }

  return (
    <Stack>
      {Object.keys(fruits).map((group) => (
        <Accordion
          key={group}
          defaultExpanded
          sx={{
            boxShadow: 'none',
            background: 'none',
            border: 'none',
            '&.Mui-expanded': {
                margin: 0,
              },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${group}-content`}
            id={`${group}-header`}
          >
            <Typography variant='h6'>{group}</Typography>
            <Box marginLeft="auto" paddingRight={2}>
              <AddGroupButton groupBy={groupBy} group={group} />
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, m: 0 }}>
            <List fruits={fruits[group]} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  )
}

export default ListView;