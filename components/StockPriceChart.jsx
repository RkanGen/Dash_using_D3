import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const StockPriceChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current)
      .attr("width", 600)
      .attr("height", 300);

    svg.selectAll("*").remove();

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([0, 600]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)])
      .range([300, 0]);

    const line = d3.line()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.price));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.append("g").call(d3.axisBottom(x).ticks(6)).attr("transform", "translate(0,300)");
    svg.append("g").call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={chartRef} />;
};
