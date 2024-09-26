import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddGroupButton from './AddGroupButton';
import { FILTER } from '../../types';
import { useFruitQuery } from '../../api';
import { useDispatchJarContext } from '../../context/JarProvider';

jest.mock('../../api/useFruitsQuery');
jest.mock('../../context/JarProvider');

const mockFruits = [
  { id: 1, name: 'Apple', family: 'Rosaceae', genus: 'Malus', order: 'Rosales', nutritions: { calories: 52, fat: 0, sugar: 10, carbohydrates: 14, protein: 0.3 } },
  { id: 2, name: 'Strawberry', family: 'Rosaceae', genus: 'Fragaria', order: 'Rosales', nutritions: { calories: 29, fat: 0.4, sugar: 5.4, carbohydrates: 5.5, protein: 0.8 } },
  { id: 3, name: 'Banana', family: 'Musaceae', genus: 'Musa', order: 'Zingiberales', nutritions: { calories: 96, fat: 0.2, sugar: 17, carbohydrates: 27, protein: 1 } },
];

describe('AddGroupButton component', () => {
  const mockSetJar = jest.fn();
  const mockUseFruitQuery = useFruitQuery as jest.Mock;
  const mockUseDispatchJarContext = useDispatchJarContext as jest.Mock;

  beforeEach(() => {
    mockUseFruitQuery.mockReturnValue({ data: mockFruits });
    mockUseDispatchJarContext.mockReturnValue(mockSetJar);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the button and tooltip correctly', () => {
    render(<AddGroupButton groupBy={FILTER.FAMILY} group="Rosaceae" />);

    expect(screen.getByLabelText(/Add Rosaceae fruits to the jar/)).toBeInTheDocument();
  });

  test('adds fruits to the jar on click when group is selected', async () => {
    const user = userEvent.setup();

    render(<AddGroupButton groupBy={FILTER.FAMILY} group="Rosaceae" />);

    const addButton = screen.getByLabelText(/Add Rosaceae fruits to the jar/);

    await user.click(addButton);

    expect(mockSetJar).toHaveBeenCalledTimes(1);
    expect(mockSetJar).toHaveBeenCalledWith(expect.any(Function));

    const updatedJar = mockSetJar.mock.calls[0][0]({});
    expect(updatedJar[1]).toBe(1);
    expect(updatedJar[2]).toBe(1);
    expect(updatedJar[3]).toBeUndefined();
  });
});
