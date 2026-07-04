"use client";

import ReactApexChart from "react-apexcharts";
import { AreaOption, AreaValue, DonutOption } from "./ChartValue";
import { average, getStringDate, percent } from "@/app/libs/utils";
import {
  Database,
  Folder,
  Gauge,
  HardDrive,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { setLoad } from "@/app/store/slices/webSlice";
import axios from "axios";

type CloudValue = {
  cloudinary: {
    storage: number;
    bandwidth: number;
    credit: { max: number; used: number };
    total_file: number;
  };
  mega: { storage: number; usedSpace: number; totalFile: number };
} | null;

export default function DashBoardPage() {
  const [cloud, setCloud] = useState<CloudValue>(null);
  const dispatch = useDispatch<AppDispatch>();
  const series = AreaValue({ name: "Tuyển dụng", data: [13, 45, 67, 88, 53] });
  const area = AreaOption({
    categories: ["3/2026", "4/2026", "5/2026", "6/2026", "7/2026"],
  });
  const areaAverage = average([13, 45, 67, 88, 123]);

  const getCloudQuota = () => {
    axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}admin/cloud_quota/`,
      { withCredentials: true },
    ).then(rs => {
      if(rs.data.status === "Success") setCloud(rs.data.cloudQuota)
      else console.log(rs.data.message)
    }).catch(err => console.log(err)) 
  };

  useEffect(() => {
    getCloudQuota()
  }, []);

  useEffect(() => {
    if(cloud) dispatch(setLoad(false));
  }, [cloud])

  return (
    <>
      <div className="flex flex-col w-3/4 max-lg:w-[95%] max-sm:w-full gap-3 max-lg:gap-2 py-3 max-lg:py-2 items-stretch overflow-auto no-scroll">
        <div className="p-3 bg-blue-default sm:rounded-2xl shadow-default">
          <p className="font-bold text-light-blue">
            Thống kê - {getStringDate("")}
          </p>
        </div>
        <div className="flex-1 flex lg:gap-3 gap-2 max-xl:flex-col">
          <div className="flex-7 flex flex-col lg:gap-3 gap-2">
            <div className="flex-1 flex flex-col pt-2 sm:rounded-2xl bg-white shadow-default min-h-90">
              <div className="flex items-center gap-2 px-2">
                <p className="font-bold px-1 border-2 border-blue-default rounded-lg">
                  Số tuyển dụng
                </p>
                <div
                  className={`flex items-center gap-1 px-2 bg-light-blue rounded-lg ${areaAverage > 0 ? "text-green-400" : "text-red-400"}`}
                >
                  <p className="font-bold">{areaAverage}</p>
                  {areaAverage > 0 ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                </div>
              </div>
              <ReactApexChart
                options={area}
                series={series}
                type="area"
                height="90%"
              />
            </div>
            <div className="flex-1 flex gap-2 p-2 bg-white sm:rounded-2xl shadow-default max-lg:flex-col">
              <div className="flex-1 flex lg:flex-col justify-between">
                <div className="flex lg:items-center max-lg:flex-col gap-2 shrink-0">
                  <p className="font-bold px-1 border-2 border-blue-default rounded-lg">
                    Cloudinary
                  </p>
                  <div
                    className="flex items-center gap-1 px-2 bg-light-blue rounded-lg text-blue-default shrink-0"
                    title="Mức sử dụng dung lượng"
                  >
                    <HardDrive className="h-5 w-5" />{" "}
                    <p className="font-bold">
                      {cloud?.cloudinary?.storage?.toFixed(2) ?? 0}{" "}
                      MB
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2 bg-light-blue rounded-lg text-blue-default shrink-0"
                    title="Băng thông"
                  >
                    <Gauge className="h-5 w-5" />
                    <p className="font-bold">
                      {cloud?.cloudinary?.bandwidth?.toFixed(2) ?? 0} MB
                    </p>
                  </div>
                </div>
                <div className="flex-1 max-lg:min-h-75 max-lg:min-w-50">
                  <ReactApexChart
                    options={DonutOption({ lable: ["Credit"] })}
                    series={[
                      percent({
                        max: cloud?.cloudinary?.credit?.max ?? 0,
                        current: Math.abs(
                          cloud?.cloudinary?.credit?.used ?? 0,
                        ),
                      }),
                    ]}
                    type="radialBar"
                    height="100%"
                  />
                </div>
              </div>
              <div className="lg:h-full h-1 lg:w-1 w-full bg-light-blue rounded-full"></div>
              <div className="flex-1 flex lg:flex-col justify-between">
                <div className="flex lg:items-center max-lg:flex-col gap-2 shrink-0">
                  <p className="font-bold px-1 border-2 border-blue-default rounded-lg">
                    MEGA
                  </p>
                  <div
                    className="flex items-center gap-1 px-2 bg-light-blue rounded-lg text-blue-default"
                    title="Dung lượng tối đa"
                  >
                    <HardDrive className="h-5 w-5" />{" "}
                    <p className="font-bold">
                      {cloud?.mega?.storage?.toFixed(2) ?? 0} GB
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2 bg-light-blue rounded-lg text-blue-default"
                    title="Số lượng tệp lưu trữ"
                  >
                    <Folder className="h-5 w-5" />{" "}
                    <p className="font-bold">
                      {cloud?.mega?.totalFile ?? 0} file
                    </p>
                  </div>
                </div>
                <div className="flex-1 max-lg:min-h-75 max-lg:min-w-50">
                  <ReactApexChart
                    options={DonutOption({ lable: ["Storage"] })}
                    series={[
                      percent({
                        max: cloud?.mega?.storage ?? 0,
                        current: Math.abs(cloud?.mega?.usedSpace ?? 0),
                      }),
                    ]}
                    type="radialBar"
                    height="100%"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-3 flex flex-col lg:gap-3 gap-2">
            <div className="flex-3 flex flex-col py-2 gap-2 bg-white sm:rounded-2xl shadow-default">
              <div className="flex items-center gap-2 px-2">
                <p className="font-bold px-1 border-2 border-blue-default rounded-lg">
                  Số tuyển dụng công ty
                </p>
                <div className="flex items-center gap-1 px-2 bg-light-blue rounded-lg text-blue-default">
                  <Database className="h-5 w-5" />{" "}
                  <p className="font-bold">411</p>
                </div>
              </div>
              <div className="pt-2 px-2 flex flex-col gap-1">
                <div className="flex items-center">
                  <p className="flex-3">Công ty</p>
                  <p className="flex-2">Tuyển dụng</p>
                </div>
                <div className="flex items-center border-b border-dark-blue">
                  <p className="flex-3">Techcombank</p>
                  <p className="flex-2">144</p>
                </div>
                <div className="flex items-center border-b border-dark-blue">
                  <p className="flex-3">FPT Telecom</p>
                  <p className="flex-2">99</p>
                </div>
                <div className="flex items-center border-b border-dark-blue">
                  <p className="flex-3">C.P. Việt Nam</p>
                  <p className="flex-2">70</p>
                </div>
                <div className="flex items-center border-b border-dark-blue">
                  <p className="flex-3">FPT Software</p>
                  <p className="flex-2">61</p>
                </div>
                <div className="flex items-center border-b border-dark-blue">
                  <p className="flex-3">MSB</p>
                  <p className="flex-2">37</p>
                </div>
              </div>
            </div>
            <div className="flex-2 flex flex-col bg-white sm:rounded-2xl shadow-default min-h-50"></div>
          </div>
        </div>
      </div>
    </>
  );
}
