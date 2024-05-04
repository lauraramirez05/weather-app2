import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useWeatherContext } from '../utils/WeatherContext';

const LineChart = ({ data, currentDay }) => {
  const { time } = useWeatherContext();
  //Gives d3 access to the DOM
  const svgRef = useRef();

  useEffect(() => {
    //Remove previous chart when a change occurs
    d3.select(svgRef.current).selectAll('*').remove();

    //Create set of data for each line
    const temperatureData = data.map(({ datetime, temp }) => ({
      datetime: new Date(`${currentDay} ${datetime}`),
      temp: Math.round(temp),
    }));

    const humidityData = data.map(({ datetime, humidity }) => ({
      datetime: new Date(`${currentDay} ${datetime}`),
      humidity,
    }));

    //Set up svg
    const width = 350;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    //Calculate the y-axis
    const [minTemp, maxTemp] = d3.extent(temperatureData, (d) =>
      Math.round(d.temp)
    );
    const tempScale = d3
      .scaleLinear()
      .domain([minTemp - 1, maxTemp + 3])
      .range([innerHeight, margin.top]);

    const [minHumidity, maxHumidity] = d3.extent(humidityData, (d) =>
      Math.round(d.humidity)
    );

    const humidityScale = d3
      .scaleLinear()
      .domain([minHumidity - 1, maxHumidity + 3])
      .range([innerHeight, margin.top]);

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

    //Plot the lines for temp and humidity
    const tempLine = d3
      .line()
      .x((d) => xScale(d.datetime.getHours()))
      .y((d) => tempScale(d.temp))
      .curve(d3.curveCatmullRom);

    const humidityLine = d3
      .line()
      .x((d) => xScale(d.datetime.getHours()))
      .y((d) => humidityScale(d.humidity))
      .curve(d3.curveMonotoneX);

    // Append lines to SVG

    //===== TEMPERATURE LINE ======//
    d3.select(svgRef.current)
      .append('path')
      .datum(temperatureData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', tempLine);

    svg
      .selectAll('.temp-circle') // Select all circles with class 'temp-circle'
      .data(temperatureData) // Bind data
      .enter() // Enter selection
      .append('circle') // Append a circle for each data point
      .attr('class', 'temp-circle') // Add class for styling
      .attr('cx', (d) => xScale(d.datetime.getHours())) // Set x position based on hour
      .attr('cy', (d) => tempScale(d.temp)) // Set y position based on temperature
      .attr('r', 4) // Set radius of the circle
      .attr('fill', 'steelblue'); // Set color of the circle

    svg
      .selectAll('.temp-label') // Select all text elements with class 'temp-label'
      .data(temperatureData) // Bind data
      .enter() // Enter selection
      .append('text') // Append a text element for each data point
      .attr('class', 'temp-label') // Add class for styling
      .attr('x', (d) => xScale(d.datetime.getHours())) // Set x position with a small offset
      .attr('y', (d) => tempScale(d.humidity)) // Set y position with a small offset
      .text((d) => `(${d.datetime.getHours()}, ${d.temp})`) // Set text content to (hour, temperature)
      .attr('font-size', '10px') // Set font size
      .attr('fill', 'steelblue'); // Set color of the text

    //===== HUMIDITY LINE ======//
    d3.select(svgRef.current)
      .append('path')
      .datum(humidityData)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('d', humidityLine);

    svg
      .selectAll('.humidity-circle') // Select all circles with class 'temp-circle'
      .data(humidityData) // Bind data
      .enter() // Enter selection
      .append('circle') // Append a circle for each data point
      .attr('class', 'humidity-circle') // Add class for styling
      .attr('cx', (d) => xScale(d.datetime.getHours())) // Set x position based on hour
      .attr('cy', (d) => humidityScale(d.humidity)) // Set y position based on temperature
      .attr('r', 4) // Set radius of the circle
      .attr('fill', 'green'); // Set color of the circle

    svg
      .selectAll('.humidity-label') // Select all text elements with class 'temp-label'
      .data(humidityData) // Bind data
      .enter() // Enter selection
      .append('text') // Append a text element for each data point
      .attr('class', 'humidity-label') // Add class for styling
      .attr('x', (d) => xScale(d.datetime.getHours()) + 8) // Set x position with a small offset
      .attr('y', (d) => humidityScale(d.temp) - 8) // Set y position with a small offset
      .text((d) => `(${d.datetime.getHours()}, ${d.humidity})`) // Set text content to (hour, temperature)
      .attr('font-size', '10px') // Set font size
      .attr('fill', 'green'); // Set color of the text

    //Move x-axis to bottom
    svg
      .append('g')
      .attr('transform', `translate(0, ${innerHeight})`) // Move the x-axis to the bottom
      .call(xAxis); // Call the axis generator to render the x-axis
  }, [data, time]);

  return (
    <div className='weather-graph'>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LineChart;
