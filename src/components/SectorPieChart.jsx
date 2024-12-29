import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const SectorPieChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label));

    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .text(d => d.data.label);
  }, [data]);

  return <svg ref={chartRef} />;
};
