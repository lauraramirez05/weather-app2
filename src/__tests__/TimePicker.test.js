import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TimePicker from '../components/TimePicker';
import { WeatherContextProvider } from '../utils/WeatherContext';

describe('TimePicker component', () => {
  test('calls setDayOfWeek when a day is selected', () => {
    const setDayOfWeek = jest.fn();
    
    const { getByLabelText } = render(
      <WeatherContextProvider value={{ dayOfWeek: 0, setDayOfWeek, setTime: jest.fn(), time: 'morning' }}>
        <TimePicker />
      </WeatherContextProvider>
    );

    const selectDay = getByLabelText('Select Day');
    fireEvent.change(selectDay, { target: { value: '1' } });

    expect(setDayOfWeek).toHaveBeenCalledWith(1);
  });

  test('calls setTime when a time is selected', () => {
    const setTime = jest.fn();
    
    const { getByLabelText } = render(
      <WeatherContextProvider value={{ dayOfWeek: 0, setDayOfWeek: jest.fn(), setTime, time: 'morning' }}>
        <TimePicker />
      </WeatherContextProvider>
    );

    const selectTime = getByLabelText('Select Time');
    fireEvent.change(selectTime, { target: { value: 'afternoon' } });

    expect(setTime).toHaveBeenCalledWith('afternoon');
  });
});
