import Grid from '@mui/material/Grid2';

import Fruits from './Fruits';
import Jar from './Jar';

function Container() {  
  return (
    <Grid container spacing={4} margin={4}>
      <Grid size={{ sm: 12, md: 8 }}>
        <Fruits />
      </Grid>
      <Grid size={{ sm: 12, md: 4 }}>
        <Jar />
      </Grid>
    </Grid>
  );
}

export default Container;