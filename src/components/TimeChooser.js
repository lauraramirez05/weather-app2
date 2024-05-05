import * as React from 'react';
import { Select as BaseSelect } from '@mui/base/Select';
import { CustomButton, Listbox, Popup, Option } from '../styles/SelectStyles';
import { useWeatherContext } from '../utils/WeatherContext';

const Select = React.forwardRef(function Select(props, ref) {
  const { onChange, ...other } = props;

  const handleSelectChange = (event) => {
    onChange && onChange(event.target.value); // Extract value from the event and call onChange
  };
  const slots = {
    root: CustomButton,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});

export default function TimeChooser() {
  const { day, setDay } = useWeatherContext();

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    // setDay(value);
  };

  console.log('day', day);
  return (
    <div className='time-container'>
      <Select defaultValue={'hello'} onChange={handleSelectChange}>
        <Option value='0'>Every Sunday</Option>
        <Option value='1'>Every Monday</Option>
        <Option value='2'>Every Tuesday</Option>
        <Option value='3'>Every Wednesday</Option>
        <Option value='4'>Every Thursday</Option>
        <Option value='5'>Every Friday</Option>
        <Option value='6'>Every Saturday</Option>
      </Select>
      <Select defaultValue={'Morning'}>
        <Option value={'Morning'}>Morning</Option>
        <Option value={'Afternon'}>Afternoon</Option>
        <Option value={'Evening'}>Evening</Option>
      </Select>
    </div>
  );
}
