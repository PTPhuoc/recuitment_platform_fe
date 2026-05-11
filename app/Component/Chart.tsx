"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartProps {
  options: ApexOptions;
  series: ApexOptions["series"];
  type?:
    | "line"
    | "bar"
    | "pie"
    | "area"
    | "radialBar"
  height?: number | string;
  width?: number | string;
}

export default function Chart({
  options,
  series,
  type = "line",
  height = 350,
  width = "100%",
}: ChartProps) {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type={type}
      height={height}
      width={width}
    />
  );
}
