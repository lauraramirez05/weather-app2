import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useWeatherContext } from '../utils/WeatherContext';

//Function to conver farenheit into Celsius
const convertToCelsius = (farenheit) => {
  return ((farenheit - 32) * 5) / 9;
};

const LineChart = ({ data, currentDay }) => {
  const { time, units, darkMode } = useWeatherContext();
  //Gives d3 access to the DOM
  const svgRef = useRef();

  useEffect(() => {
    //Remove previous chart when a change occurs
    d3.select(svgRef.current).selectAll('*').remove();

    //Create set of data for each line
    const temperatureData = data.map(({ datetime, temp }) => ({
      datetime: new Date(`${currentDay} ${datetime}`),
      temp:
        units === 'F' ? Math.round(temp) : Math.round(convertToCelsius(temp)),
    }));

    const humidityData = data.map(({ datetime, humidity }) => ({
      datetime: new Date(`${currentDay} ${datetime}`),
      humidity: Math.round(humidity),
    }));

    const windSpeedData = data.map(({ datetime, windspeed }) => ({
      datetime: new Date(`${currentDay} ${datetime}`),
      windData: Math.round(windspeed),
    }));

    //Set up svg
    const width = 350;
    const height = 260;
    const margin = { top: 20, right: 20, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top;

    //Calculate the y-axis
    const [minTemp, maxTemp] = d3.extent(temperatureData, (d) =>
      Math.round(d.temp)
    );

    const [minHumidity, maxHumidity] = d3.extent(humidityData, (d) =>
      Math.round(d.humidity)
    );

    const [minWindSpeed, maxWindSpeed] = d3.extent(windSpeedData, (d) =>
      Math.round(d.windData)
    );

    const yScale = d3
      .scaleLinear()
      .domain([
        Math.min(minTemp, minHumidity, minWindSpeed) - 1,
        Math.max(maxTemp, maxHumidity, maxWindSpeed) + 3,
      ])
      .range([innerHeight, margin.top]);

    const yAxis = d3.axisLeft(yScale);

    // Set up the x-axis with dynamic ticks and labels
    const [minHour, maxHour] = d3.extent(temperatureData, (d) =>
      d.datetime.getHours()
    );

    const xScale = d3
      .scaleLinear()
      .domain([minHour, maxHour])
      .range([margin.left, innerWidth]); // Width of chart

    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(d3.range(minHour, maxHour + 1)) // Set tick values from minHour to maxHour
      .tickFormat((d) => {
        if (d >= 12) {
          return `${d} PM`;
        } else {
          return `${d} AM`;
        }
      });

    //Create svg
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g');

    // Append vertical lines for minHour and maxHour
    svg
      .append('line')
      .attr('x1', xScale(minHour + 1))
      .attr('y1', 20)
      .attr('x2', xScale(minHour + 1))
      .attr('y2', innerHeight)
      .attr('stroke', '#E0C3FC')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    svg
      .append('line')
      .attr('x1', xScale(maxHour - 1))
      .attr('y1', 20)
      .attr('x2', xScale(maxHour - 1))
      .attr('y2', innerHeight)
      .attr('stroke', '#E0C3FC')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5');

    //Plot the lines for temp and humidity
    const tempLine = d3
      .line()
      .x((d) => xScale(d.datetime.getHours()))
      .y((d) => yScale(d.temp))
      .curve(d3.curveCatmullRom);

    const humidityLine = d3
      .line()
      .x((d) => xScale(d.datetime.getHours()))
      .y((d) => yScale(d.humidity))
      .curve(d3.curveMonotoneX);

    const windSpeedLine = d3
      .line()
      .x((d) => xScale(d.datetime.getHours()))
      .y((d) => yScale(d.windData))
      .curve(d3.curveMonotoneX);

    // Append lines to SVG

    //===== TEMPERATURE LINE ======//

    d3.select(svgRef.current)
      .append('path')
      .datum(temperatureData)
      .attr('fill', 'none')
      .attr('stroke', '#00DBDE')
      .attr('stroke-width', 2)
      .attr('d', tempLine);

    svg
      .selectAll('.temp-circle') // Select all circles with class 'temp-circle'
      .data(temperatureData) // Bind data
      .enter() // Enter selection
      .append('circle') // Append a circle for each data point
      .attr('class', 'temp-circle') // Add class for styling
      .attr('cx', (d) => xScale(d.datetime.getHours())) // Set x position based on hour
      .attr('cy', (d) => yScale(d.temp)) // Set y position based on temperature
      .attr('r', 2) // Set radius of the circle
      .attr('fill', '#00dbde'); // Set color of the circle

    //===== HUMIDITY LINE ======//
    d3.select(svgRef.current)
      .append('path')
      .datum(humidityData)
      .attr('fill', 'none')
      .attr('stroke', '#0047AB')
      .attr('stroke-width', 2)
      .attr('d', humidityLine);

    svg
      .selectAll('.humidity-circle')
      .data(humidityData)
      .enter()
      .append('circle')
      .attr('class', 'humidity-circle')
      .attr('cx', (d) => xScale(d.datetime.getHours()))
      .attr('cy', (d) => yScale(d.humidity))
      .attr('r', 2)
      .attr('fill', '#0047AB');

    //===== WINDSPEED LINE ======//
    d3.select(svgRef.current)
      .append('path')
      .datum(windSpeedData)
      .attr('fill', 'none')
      .attr('stroke', '#0093E9')
      .attr('stroke-width', 2)
      .attr('d', windSpeedLine);

    svg
      .selectAll('.windspeed-circle')
      .data(windSpeedData)
      .enter()
      .append('circle')
      .attr('class', 'windspeed-circle')
      .attr('cx', (d) => xScale(d.datetime.getHours()))
      .attr('cy', (d) => yScale(d.windData))
      .attr('r', 2)
      .attr('fill', '#0093E9');

    //Move x-axis to bottom
    svg
      .append('g')
      .attr('transform', `translate(0, ${innerHeight})`) // Move the x-axis to the bottom
      .call(xAxis) // Call the axis generator to render the x-axis
      .selectAll('text')
      .style('fill', darkMode ? '#ffffff' : '#003366');

    //Append yAxis
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis)
      .selectAll('text')
      .style('fill', darkMode ? '#ffffff' : '#003366');

    // Style x-axis line
    svg
      .select('.x-axis .domain')
      .style('stroke', darkMode ? '#ffffff' : '#003366');

    // Style y-axis line
    svg
      .select('.y-axis .domain')
      .style('stroke', darkMode ? '#ffffff' : '#003366');

    // Create legends
    svg
      .append('text')
      .attr('x', 10)
      .attr('y', 10)
      .text(`Temperature (${units})`)
      .attr('fill', '#00dbde')
      .attr('font-size', '11px')
      .attr('font-weight', '700');

    svg
      .append('text')
      .attr('x', 120)
      .attr('y', 10)
      .text('Humidity (%)')
      .attr('fill', '#0047ab')
      .attr('font-size', '11px')
      .attr('font-weight', '700');
    svg
      .append('text')
      .attr('x', 200)
      .attr('y', 10)
      .text('Wind Speed (mph)')
      .attr('fill', '#0093e9')
      .attr('font-size', '11px')
      .attr('font-weight', '700');
  }, [data, time, units, darkMode]);

  return (
    <div className='weather-graph'>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
