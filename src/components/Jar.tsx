import { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Divider, Stack, Typography, Grid2 as Grid } from '@mui/material';

import { Chart, ArcElement, Tooltip } from 'chart.js';

import { useStoreJarContext } from '../context/JarProvider';
import { useFruitQuery } from '../api';

Chart.register(ArcElement, Tooltip);

export const CHART_COLORS = [
  '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF',
  '#FFC0CB', '#F3E5AB', '#B0E0E6', '#FFDAB9', '#E6E6FA',
  '#FFFACD', '#FFE4E1', '#D8BFD8', '#E0FFFF', '#F5DEB3',
  '#FFD700', '#FF69B4', '#98FB98', '#AFEEEE', '#F08080'
];

interface FruitDetails {
  id: number;
  name: string;
  count: number;
  calories: number;
}

function Jar() {
  const jar = useStoreJarContext();
  const { data: fruits = [] } = useFruitQuery();

  const { totalCalories, chartData, fruitDetails } = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColors: string[] = [];
    let totalCalories = 0;
    const fruitDetails: FruitDetails[] = [];

    Object.entries(jar).forEach(([fruitId, count]) => {
      const fruit = fruits.find(({ id }) => +fruitId === id);

      if (fruit && count > 0) {
        const calories = fruit.nutritions.calories * count;
        totalCalories += calories;
        
        labels.push(fruit.name);
        data.push(calories);

        fruitDetails.push({
          id: fruit.id,
          name: fruit.name,
          count: Number(count),
          calories,
        });

        backgroundColors.unshift(CHART_COLORS[labels.length]);         
      }
    });

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Calories by Fruit',
          data,
          backgroundColor: backgroundColors,
          hoverOffset: 4,
        },
      ],
    };

    return { totalCalories, chartData, fruitDetails };
  }, [jar, fruits]);

  return (
    <Box>
      <Stack direction="row" alignItems="center">
        <Typography variant="h4">Jar</Typography>
        <Box marginLeft="auto">
          <Typography variant="h6">
            Total Calories: {totalCalories}
          </Typography>
        </Box>
      </Stack>
      <Divider />

      {!!fruitDetails.length && (
        <Grid container spacing={2} mt={4}>
          <Grid size={{ xs: 12, sm: 6, md: 12 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              maxHeight="100%"
              maxWidth="100%"
            >
              <Pie
                data={chartData}
                width="300px"
                height="300px"
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 12 }}>
            <Stack spacing={1} mt={4}>
              <Stack width="100%" direction="row">
                <Typography variant="subtitle1" fontWeight="600">
                  Fruit (count)
                </Typography>
                <Box marginLeft="auto">
                  <Typography variant="subtitle1" fontWeight="600">
                    Calories
                  </Typography>
                </Box>
              </Stack>
              <Divider />
              {fruitDetails.map(({ id, name, count, calories }) => (
                <Stack key={id} width="100%" direction="row">
                  <Typography variant="body1">
                    {name} x {count}
                  </Typography>
                  <Box marginLeft="auto">
                    <Typography variant="caption">
                      {calories}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Jar;
