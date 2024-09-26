import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Actions from './Actions';
import { useDispatchJarContext, useStoreJarContext } from '../../context/JarProvider';
import { Fruit } from '../../types';

jest.mock('../../context/JarProvider');

const mockFruit: Fruit = {
  id: 1,
  name: 'Apple',
  family: 'Rosaceae',
  genus: 'Malus',
  order: 'Rosales',
  nutritions: { calories: 52, fat: 0, sugar: 10, carbohydrates: 14, protein: 0.3 },
};

describe('Actions component', () => {
  const mockSetJar = jest.fn();
  const mockUseStoreJarContext = useStoreJarContext as jest.Mock;
  const mockUseDispatchJarContext = useDispatchJarContext as jest.Mock;

  beforeEach(() => {
    mockUseDispatchJarContext.mockReturnValue(mockSetJar);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Add button and no Remove button when fruit is not in jar', () => {
    mockUseStoreJarContext.mockReturnValue({});

    render(<Actions fruit={mockFruit} />);

    expect(screen.getByLabelText('Add Apple to the jar')).toBeInTheDocument();
    expect(screen.queryByLabelText('Remove Apple from the jar')).not.toBeInTheDocument();
  });

  test('renders both Add and Remove buttons when fruit is in the jar', () => {
    mockUseStoreJarContext.mockReturnValue({ 1: 1 });

    render(<Actions fruit={mockFruit} />);

    expect(screen.getByLabelText('Add Apple to the jar')).toBeInTheDocument();
    expect(screen.getByLabelText('Remove Apple from the jar')).toBeInTheDocument();
  });

  test('calls setJar correctly when Add button is clicked', async () => {
    mockUseStoreJarContext.mockReturnValue({});

    const user = userEvent.setup();
    render(<Actions fruit={mockFruit} />);

    const addButton = screen.getByLabelText('Add Apple to the jar');

    await user.click(addButton);

    expect(mockSetJar).toHaveBeenCalledTimes(1);
    expect(mockSetJar).toHaveBeenCalledWith(expect.any(Function));

    const updatedJar = mockSetJar.mock.calls[0][0]({});
    expect(updatedJar).toEqual({ 1: 1 });
  });

  test('calls setJar correctly when Remove button is clicked', async () => {
    mockUseStoreJarContext.mockReturnValue({ 1: 2 });

    const user = userEvent.setup();
    render(<Actions fruit={mockFruit} />);

    const removeButton = screen.getByLabelText('Remove Apple from the jar');

    await user.click(removeButton);

    expect(mockSetJar).toHaveBeenCalledTimes(1);
    expect(mockSetJar).toHaveBeenCalledWith(expect.any(Function));

    const updatedJar = mockSetJar.mock.calls[0][0]({ 1: 2 });
    expect(updatedJar).toEqual({ 1: 1 });
  });

  test('does not remove fruit if count is 0', async () => {
    mockUseStoreJarContext.mockReturnValue({ 1: 1 });

    const user = userEvent.setup();
    render(<Actions fruit={mockFruit} />);

    const removeButton = screen.getByLabelText('Remove Apple from the jar');

    await user.click(removeButton);
    await user.click(removeButton);

    expect(mockSetJar).toHaveBeenCalledTimes(2);

    const updatedJar = mockSetJar.mock.calls[1][0]({ 1: 0 });
    expect(updatedJar).toEqual({ 1: 0 });
  });
});
