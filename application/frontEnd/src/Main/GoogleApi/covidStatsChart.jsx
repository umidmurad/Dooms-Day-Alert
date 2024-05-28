/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import FileCSS from "../../Css/minor-stylings.module.css";

const CovidStatsChart = ({ chartData }) => {
  const loadData = () => {
    /* global google */
    google.charts.load("current", { packages: ["bar"] });
    google.charts.setOnLoadCallback(drawChart);
  };

  const drawChart = () => {
    const formattedChartData = [
      ["", "Confirmed Cases", "Deaths", "Recoveries"],
      ...chartData.map((item) => [item[0], item[1], item[2], item[3]]),
    ];

    const data = google.visualization.arrayToDataTable(formattedChartData);

    const options = {
      chart: {},
      bars: "vertical",
      vAxis: { format: "decimal" },
      height: 400,
      colors: ["#1b9e77", "#d95f02", "#7570b3"],
      series: {
        0: { color: "#1b9e77" }, // Confirmed Cases
        1: { color: "#d95f02" }, // Deaths
        2: { color: "#7570b3" }, // Recoveries
      },
    };

    const chart = new google.charts.Bar(document.getElementById("chart_div"));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  };

  useEffect(() => {
    loadData();
  }, [chartData]);

  return (
    <div>
      <div id="chart_div" className={FileCSS.chartDiv}></div>
    </div>
  );
};

export default CovidStatsChart;
