import { render } from '@testing-library/react';

// import userEvent from '@testing-library/user-event';
import { TEST_TEST_IDS } from '../lib/constants';
import { Test } from '../ui/Test';

describe('<Test />', () => {
  const renderComponent = (props = {}) => render(<Test {...props} />);

  it('should render button', () => {
    const { getByTestId } = renderComponent();

    expect(getByTestId(TEST_TEST_IDS.button)).toBeInTheDocument();
  });
});
