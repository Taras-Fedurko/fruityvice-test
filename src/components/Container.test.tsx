import { render, screen, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { useFruitQuery } from '../api/useFruitsQuery';
import JarProvider from '../context/JarProvider';
import Container from './Container';

const mockAllFruits = [
  {
    'name': 'Persimmon',
    'id': 52,
    'family': 'Ebenaceae',
    'order': 'Rosales',
    'genus': 'Diospyros',
    'nutritions': {
      'calories': 81,
      'fat': 0,
      'sugar': 18,
      'carbohydrates': 18,
      'protein': 0
    }
  },
  {
    'name': 'Strawberry',
    'id': 3,
    'family': 'Rosaceae',
    'order': 'Rosales1',
    'genus': 'Fragaria',
    'nutritions': {
      'calories': 29,
      'fat': 0.4,
      'sugar': 5.4,
      'carbohydrates': 5.5,
      'protein': 0.8
    }
  },
  {
    'name': 'Banana',
    'id': 1,
    'family': 'Musaceae',
    'order': 'Zingiberales',
    'genus': 'Musa',
    'nutritions': {
      'calories': 96,
      'fat': 0.2,
      'sugar': 17.2,
      'carbohydrates': 22,
      'protein': 1
    }
  },
];

jest.mock('axios');
jest.mock('../api/useFruitsQuery');
jest.mock('react-chartjs-2', () => ({
  Pie: () => <div>Mocked Pie Chart</div>,
}));

describe('Application', () => {
  beforeEach(() => {
    (useFruitQuery as jest.Mock).mockReturnValue({
      data: mockAllFruits,
      isLoading: false,
      isError: false,
    });
  });

  const renderComponent = () => {
    return act(() => {
      render(
        <JarProvider>
          <Container/>
        </JarProvider>
      );
    });
  };

  test('renders initial list of fruits and manages Jar actions with table summary', async () => {
    const user = userEvent.setup();
    renderComponent();
  
    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Jar')).toBeInTheDocument();
    expect(screen.getByText('Total Calories: 0')).toBeInTheDocument();
    expect(screen.getByLabelText('Group By')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
  
    mockAllFruits.forEach(fruit => {
      expect(screen.getByText(fruit.name)).toBeInTheDocument();
      expect(screen.getByText(`${fruit.nutritions.calories} calories`)).toBeInTheDocument();
      expect(screen.getByLabelText(`Add ${fruit.name} to the jar`)).toBeInTheDocument();
      expect(screen.queryByLabelText(`Remove ${fruit.name} from the jar`)).not.toBeInTheDocument();
    });
  
    await user.click(screen.getByLabelText(`Add ${mockAllFruits[0].name} to the jar`));
    expect(screen.getByText('Total Calories: 81')).toBeInTheDocument();
    expect(screen.getByLabelText(`Remove ${mockAllFruits[0].name} from the jar`)).toBeInTheDocument();
  
    expect(screen.getByRole('row', { name: `${mockAllFruits[0].name} 1 81` })).toBeInTheDocument();
  
    await user.click(screen.getByLabelText(`Add ${mockAllFruits[1].name} to the jar`));
    expect(screen.getByText('Total Calories: 110')).toBeInTheDocument();
    expect(screen.getByLabelText(`Remove ${mockAllFruits[1].name} from the jar`)).toBeInTheDocument();
  
    expect(screen.getByRole('row', { name: `${mockAllFruits[0].name} 1 81` })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: `${mockAllFruits[1].name} 1 29` })).toBeInTheDocument();
  
    await user.click(screen.getByLabelText(`Remove ${mockAllFruits[0].name} from the jar`));
    expect(screen.getByText('Total Calories: 29')).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: `${mockAllFruits[0].name} 1 81` })).not.toBeInTheDocument();
  
    await user.click(screen.getByLabelText(`Remove ${mockAllFruits[1].name} from the jar`));
    expect(screen.getByText('Total Calories: 0')).toBeInTheDocument();
    expect(screen.queryByRole('row', { name: `${mockAllFruits[1].name} 1 29` })).not.toBeInTheDocument();
  });
  
  test('switch to table or list view', async () => {
    const user = userEvent.setup();

    renderComponent();

    expect(screen.getByLabelText(/Switch to table view/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Switch to list view/)).not.toBeInTheDocument();

    mockAllFruits.forEach(fruit => {
      expect(screen.getByText(fruit.name)).toBeInTheDocument();
      expect(screen.getByText(`${fruit.nutritions.calories} calories`)).toBeInTheDocument();
    });

    expect(screen.queryByText(/Name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Family/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Order/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Genus/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Action/i)).not.toBeInTheDocument();

    await user.click(screen.getByLabelText(/Switch to table view/));
    expect(screen.queryByLabelText(/Switch to table view/)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Switch to list view/)).toBeInTheDocument();

    mockAllFruits.forEach(fruit => {
      expect(screen.queryByText(`${fruit.nutritions.calories} calories`)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Family/i)).toBeInTheDocument();
    expect(screen.getByText(/Order/i)).toBeInTheDocument();
    expect(screen.getByText(/Genus/i)).toBeInTheDocument();
    expect(screen.getByText(/Action/i)).toBeInTheDocument();

    mockAllFruits.forEach(fruit => {
      expect(screen.getByText(fruit.family)).toBeInTheDocument();
      expect(screen.getByText(fruit.genus)).toBeInTheDocument();
      expect(screen.getByText(fruit.order)).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText(/Switch to list view/));
    expect(screen.queryByLabelText(/Switch to list view/)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Switch to table view/)).toBeInTheDocument();
  })

  test('select filter in list', async () => {
    const user = userEvent.setup();

    renderComponent();

    expect(screen.getByText('None')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Group By'));
    await user.click(screen.getByText('Family'));
    expect(screen.getByText('Family')).toBeInTheDocument();
    expect(screen.queryByText('None')).not.toBeInTheDocument();
    mockAllFruits.forEach(fruit => {
      expect(screen.getByText(fruit.family)).toBeInTheDocument();
      expect(screen.queryByText(fruit.genus)).not.toBeInTheDocument();
      expect(screen.queryByText(fruit.order)).not.toBeInTheDocument();
    });

    await user.click(screen.getByLabelText('Group By'));
    await user.click(screen.getByText('Genus'));
    expect(screen.getByText('Genus')).toBeInTheDocument();
    expect(screen.queryByText('Family')).not.toBeInTheDocument();
    mockAllFruits.forEach(fruit => {
      expect(screen.queryByText(fruit.family)).not.toBeInTheDocument();
      expect(screen.getByText(fruit.genus)).toBeInTheDocument();
      expect(screen.queryByText(fruit.order)).not.toBeInTheDocument();
    });

    await user.click(screen.getByLabelText('Group By'));
    await user.click(screen.getByText('Order'));
    expect(screen.getByText('Order')).toBeInTheDocument();
    expect(screen.queryByText('Genus')).not.toBeInTheDocument();
    mockAllFruits.forEach(fruit => {
      expect(screen.queryByText(fruit.family)).not.toBeInTheDocument();
      expect(screen.queryByText(fruit.genus)).not.toBeInTheDocument();
      expect(screen.getByText(fruit.order)).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText('Group By'));
    await user.click(screen.getByText('None'));
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.queryByText('Order')).not.toBeInTheDocument();
    mockAllFruits.forEach(fruit => {
      expect(screen.queryByText(fruit.family)).not.toBeInTheDocument();
      expect(screen.queryByText(fruit.genus)).not.toBeInTheDocument();
      expect(screen.queryByText(fruit.order)).not.toBeInTheDocument();
    });
  });

  test('select filter in table', async () => {
    const user = userEvent.setup();

    renderComponent();

    expect(screen.getByText('None')).toBeInTheDocument();

    await user.click(screen.getByLabelText(/Switch to table view/));
    expect(screen.queryByLabelText(/Switch to table view/)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Switch to list view/)).toBeInTheDocument();

    await user.click(screen.getByLabelText('Group By'));
    await user.click( screen.getByRole('option', { name: 'Family' }));
    mockAllFruits.forEach(fruit => {
      expect(screen.getAllByText(fruit.family)).toHaveLength(2);
      expect(screen.getByText(fruit.genus)).toBeInTheDocument();
      expect(screen.getByText(fruit.order)).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText('Group By'));
    await user.click(screen.getByRole('option', { name: 'Order' }));
    mockAllFruits.forEach(fruit => {
      expect(screen.getByText(fruit.family)).toBeInTheDocument();
      expect(screen.getByText(fruit.genus)).toBeInTheDocument();
      expect(screen.getAllByText(fruit.order)).toHaveLength(2);
    });

    await user.click(screen.getByLabelText('Group By'));
    await user.click( screen.getByRole('option', { name: 'Family' }));
    mockAllFruits.forEach(fruit => {
      expect(screen.getAllByText(fruit.family)).toHaveLength(2);
      expect(screen.getByText(fruit.genus)).toBeInTheDocument();
      expect(screen.getByText(fruit.order)).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText('Group By'));
    await user.click(screen.getByRole('option', { name: 'Genus' }));
    mockAllFruits.forEach(fruit => {
      expect(screen.getByText(fruit.family)).toBeInTheDocument();
      expect(screen.getAllByText(fruit.genus)).toHaveLength(2);
      expect(screen.getByText(fruit.order)).toBeInTheDocument();
    });
  });
});
