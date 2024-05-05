const { render, screen } = require('@testing-library/react');
const Weather = require('../components/Weather').default;

describe('Weather component', () => {
  test('renders without crashing', () => {
    render(<Weather />);
  });

  test('fetches data and renders weather information', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          days: [
            {
              datetime: '2024-05-05',
              temp: 25,
              icon: 'sunny',
              conditions: 'Sunny',
              windspeed: 5,
              precipprob: 0,
              humidity: 60,
            },
          ],
        }),
    });

    render(<Weather />);

    // Wait for data to be fetched and component to re-render
    await screen.findByText('Sunny, May 5 2024');

    // Assert that weather information is displayed
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('25°')).toBeInTheDocument();
    expect(screen.getByText('5mph')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<Weather />);

    const errorMessage = await screen.findByText(/error fetching data/i);
    expect(errorMessage).toBeInTheDocument();
  });

  // Add more test cases as needed...
});

test('renders correctly in mobile view', () => {
  jest
    .spyOn(require('../utils/MobileDetectorHook'), 'default')
    .mockReturnValue(true);

  // Mock data for testing
  const mockData = {
    days: [
      {
        datetime: '2024-05-05',
        temp: 25,
        icon: 'sunny',
        conditions: 'Sunny',
        windspeed: 5,
        precipprob: 0,
        humidity: 60,
      },
      // Add more mock data as needed...
    ],
  };
  render(<Weather />);

  // Assert that the component renders in mobile view
  expect(screen.getByTestId('accordion-container')).toBeInTheDocument();

  // Assert that weather information is displayed correctly
  expect(screen.getByText('Sunny, May 5 2024')).toBeInTheDocument();
  expect(screen.getByText('25°')).toBeInTheDocument();
  expect(screen.getByText('5mph')).toBeInTheDocument();
  expect(screen.getByText('0%')).toBeInTheDocument();
  expect(screen.getByText('60%')).toBeInTheDocument();
});
