import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const VolumeBarChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current)
      .attr("width", 600)
      .attr("height", 300);

    svg.selectAll("*").remove();

    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([0, 600])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.volume)])
      .range([300, 0]);

    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.date))
      .attr("y", d => y(d.volume))
      .attr("width", x.bandwidth())
      .attr("height", d => 300 - y(d.volume))
      .attr("fill", "teal");

    svg.append("g").call(d3.axisBottom(x)).attr("transform", "translate(0,300)");
    svg.append("g").call(d3.axisLeft(y));
  }, [data]);

  return <svg ref={chartRef} />;
};
