import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterSelect from './FilterSelect';
import { FILTER } from '../../types';

const options = [
  { label: 'None', value: FILTER.NONE },
  { label: 'Family', value: FILTER.FAMILY },
  { label: 'Genus', value: FILTER.GENUS },
  { label: 'Order', value: FILTER.ORDER },
];

describe('FilterSelect component', () => {
  test('renders the correct label and options', async () => {
    render(
      <FilterSelect
        options={options}
        value={FILTER.NONE}
        handleChange={jest.fn()}
        disabled={false}
      />
    );

    const user = userEvent.setup();

    expect(screen.getByLabelText('Group By')).toBeInTheDocument();
    await user.click(screen.getByLabelText('Group By'));

    const listbox = screen.getByRole('listbox');

    options.forEach(option => {
      expect(within(listbox).getByText(option.label)).toBeInTheDocument();
    });
  });

  test('calls handleChange when an option is selected', async () => {
    const handleChangeMock = jest.fn();
    render(
      <FilterSelect
        options={options}
        value={FILTER.NONE}
        handleChange={handleChangeMock}
        disabled={false}
      />
    );

    const user = userEvent.setup();

    await user.click(screen.getByLabelText('Group By'));
    await user.click(screen.getByText('Family'));

    expect(handleChangeMock).toHaveBeenCalledWith(FILTER.FAMILY);
  });

  test('renders disabled select when disabled prop is true', async () => {
    render(
      <FilterSelect
        options={options}
        value={FILTER.NONE}
        handleChange={jest.fn()}
        disabled={true}
      />
    );

    expect(screen.getByLabelText('Group By')).toHaveAttribute('aria-disabled', 'true');
  });
});
