import { ApexOptions } from "apexcharts";

type ChartAreaOption = {
  categories: Array<string> | Array<number>;
};

type ChartAreaValue = {
  name: string;
  data: Array<number>;
};

export const AreaOption = ({ categories }: ChartAreaOption) => {
  const option: ApexOptions = {
    chart: {
      height: "100%",
      type: "area",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [...categories],
      labels: {
        style: {
          fontSize: "18px",
          fontFamily: `'Smooch Sans', sans-serif`,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "18px",
          fontFamily: `'Smooch Sans', sans-serif`,
        },
      },
    },
    colors: ["#428bff"],
  };
  return option;
};

export const AreaValue = ({ name, data }: ChartAreaValue) => {
  const value = [
    {
      name: name,
      data: data,
    },
  ];
  return value;
};

type ChartDonutOption = {
  lable: Array<string>;
};

export const DonutOption = ({ lable }: ChartDonutOption) => {
  const option: ApexOptions = {
    chart: {
      type: "donut",
      height: "100%",
    },
    labels: [...lable],
    colors: ["#428bff"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return option;
};

type ChartCircleOption = {
  lable: Array<string>;
};

export const CircleOption = ({ lable }: ChartCircleOption) => {
  const option: ApexOptions = {
    chart: {
      height: "100%",
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
      },
    },
    labels: [...lable],
    colors: ["#428bff"],
  };
  return option;
};
