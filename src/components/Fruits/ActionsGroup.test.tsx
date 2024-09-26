import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionsGroup from './ActionsGroup';
import { FILTER } from '../../types';
import { useFruitQuery } from '../../api';
import { useDispatchJarContext, useStoreJarContext } from '../../context/JarProvider';

jest.mock('../../api');
jest.mock('../../context/JarProvider');

const mockFruits = [
  { id: 1, name: 'Apple', family: 'Rosaceae', genus: 'Malus', order: 'Rosales', nutritions: { calories: 52, fat: 0, sugar: 10, carbohydrates: 14, protein: 0.3 } },
  { id: 2, name: 'Strawberry', family: 'Rosaceae', genus: 'Fragaria', order: 'Rosales', nutritions: { calories: 29, fat: 0.4, sugar: 5.4, carbohydrates: 5.5, protein: 0.8 } },
  { id: 3, name: 'Banana', family: 'Musaceae', genus: 'Musa', order: 'Zingiberales', nutritions: { calories: 96, fat: 0.2, sugar: 17, carbohydrates: 27, protein: 1 } },
];

describe('ActionsGroup component', () => {
  const mockSetJar = jest.fn();
  const mockUseFruitQuery = useFruitQuery as jest.Mock;
  const mockUseStoreJarContext = useStoreJarContext as jest.Mock;
  const mockUseDispatchJarContext = useDispatchJarContext as jest.Mock;

  beforeEach(() => {
    mockUseFruitQuery.mockReturnValue({ data: mockFruits });
    mockUseStoreJarContext.mockReturnValue({});
    mockUseDispatchJarContext.mockReturnValue(mockSetJar);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the "Add" button correctly', () => {
    render(<ActionsGroup groupBy={FILTER.FAMILY} group="Rosaceae" />);

    expect(screen.getByLabelText(/Add Rosaceae fruits to the jar/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Remove Rosaceae fruits from the jar/)).not.toBeInTheDocument();
  });

  test('adds fruits to the jar when "Add" button is clicked', async () => {
    const user = userEvent.setup();

    render(<ActionsGroup groupBy={FILTER.FAMILY} group="Rosaceae" />);

    const addButton = screen.getByLabelText(/Add Rosaceae fruits to the jar/);
    await user.click(addButton);

    expect(mockSetJar).toHaveBeenCalledTimes(1);
    expect(mockSetJar).toHaveBeenCalledWith(expect.any(Function));

    const updatedJar = mockSetJar.mock.calls[0][0]({});
    expect(updatedJar).toEqual({
      1: 1,
      2: 1,
    });
  });

  test('renders the "Remove all" button and removes fruits from the jar', async () => {
    mockUseStoreJarContext.mockReturnValue({
      1: 1,
      2: 1,
    });

    const user = userEvent.setup();

    render(<ActionsGroup groupBy={FILTER.FAMILY} group="Rosaceae" />);

    expect(screen.getByLabelText(/Remove Rosaceae fruits from the jar/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Add Rosaceae fruits to the jar/)).toBeInTheDocument();

    const removeButton = screen.getByLabelText(/Remove Rosaceae fruits from the jar/);
    await user.click(removeButton);

    expect(mockSetJar).toHaveBeenCalledTimes(1);
    expect(mockSetJar).toHaveBeenCalledWith(expect.any(Function));

    const updatedJar = mockSetJar.mock.calls[0][0]({ 1: 1, 2: 1 });
    expect(updatedJar).toEqual({}); // Both fruits removed from the jar
  });

  test('does not render the "Remove all" button when no fruits are selected', () => {
    mockUseStoreJarContext.mockReturnValue({});

    render(<ActionsGroup groupBy={FILTER.FAMILY} group="Rosaceae" />);

    expect(screen.getByLabelText(/Add Rosaceae fruits to the jar/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Remove Rosaceae fruits from the jar/)).not.toBeInTheDocument();
  });
});
