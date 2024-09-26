import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SwitchViewButton from './SwitchViewButton';

describe('SwitchViewButton component', () => {
  const setIsListMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders table icon and correct tooltip when isList is true', async () => {
    const user = userEvent.setup();

    render(<SwitchViewButton setIsList={setIsListMock} isList={true} />);

    const button = screen.getByLabelText('Switch to table view');
    expect(button).toBeInTheDocument();

    await user.hover(button);

    expect(await screen.findByText('Switch to table view')).toBeInTheDocument();
  });

  test('renders list icon and correct tooltip when isList is false', async () => {
    const user = userEvent.setup();

    render(<SwitchViewButton setIsList={setIsListMock} isList={false} />);

    const button = screen.getByLabelText('Switch to list view');
    expect(button).toBeInTheDocument();

    await user.hover(button);
    expect(await screen.findByText('Switch to list view')).toBeInTheDocument();
  });

  test('calls setIsList with the correct value when clicked', async () => {
    const user = userEvent.setup();

    render(<SwitchViewButton setIsList={setIsListMock} isList={true} />);

    const button = screen.getByLabelText('Switch to table view');

    await user.click(button);

    expect(setIsListMock).toHaveBeenCalledWith(false);
  });

  test('toggles from list to table view when clicked', async () => {
    const user = userEvent.setup();

    render(<SwitchViewButton setIsList={setIsListMock} isList={false} />);

    const button = screen.getByLabelText('Switch to list view');

    await user.click(button);

    expect(setIsListMock).toHaveBeenCalledWith(true);
  });
});
