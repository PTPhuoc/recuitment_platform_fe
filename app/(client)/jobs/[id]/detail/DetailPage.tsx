"use client";

import { useCategories } from "@/app/hook/useCategories";
import { Categories, JobItem } from "@/app/libs/types";
import { getStringDate, Relist } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Overview from "./Overview";
import ButtonDefault from "@/app/Component/ButtonDefault";
import Descriptions from "./Descriptions";

type PageProps = {
  job: JobItem;
};

type Locations = {
  name: string;
  value: string;
  slug: string;
  parent_id: string;
};

// app/(client)/jobs/[id]/detail/page.tsx
export default function DetailPage({ job }: PageProps) {
  const { lang } = useSelector((state: RootState) => state.web);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const categories = useCategories(lang);
  const [category, setCategory] = useState<Categories>({
    industry: [],
    location: [],
    formOfWork: [],
    jobLevel: [],
    education: [],
    salary: [],
    exprience: [],
  });

  const categoriesMap = useMemo(() => {
    const map = new Map<string, string>();
    category.industry.forEach((item) => map.set(item.value, item.name));
    category.location.forEach((item) => map.set(item.value, item.name));
    category.formOfWork.forEach((item) => map.set(item.value, item.name));
    category.jobLevel.forEach((item) => map.set(item.value, item.name));
    category.education.forEach((item) => map.set(item.value, item.name));
    category.salary.forEach((item) => map.set(item.value, item.name));
    category.exprience.forEach((item) => map.set(item.value, item.name));
    return map;
  }, [category]);

  useEffect(() => {
    if (categories.data) {
      setCategory({
        industry: Relist(categories.data.industry),
        location: Relist(categories.data.location),
        formOfWork: Relist(categories.data.formOfWork),
        jobLevel: Relist(categories.data.jobLevel),
        education: Relist(categories.data.education),
        salary: Relist(categories.data.salary),
        exprience: Relist(categories.data.exprience),
      });
    }
  }, [categories.data]);

  const locationMap = useMemo(() => {
    const locationMap = new Map<string, Record<"name" | "parent_id", string>>();
    category.location.forEach((item) =>
      locationMap.set(item.value, {
        name: item.name,
        parent_id: item.parent_id,
      }),
    );
    return locationMap;
  }, [categories]);

  useEffect(() => {
    if (!job) router.push("/");
    dispatch(setLoad(false));
  }, [job]);

  return (
    <div className="w-full sm:px-5 py-5 flex flex-col gap-5">
      <div className="w-full flex items-stretch">
        <div className="flex-1 max-sm:hidden"></div>
        <div className="flex-8 flex gap-5 max-lg:flex-col">
          <div className="flex-6 flex flex-col gap-5">
            <Overview job={job} lang={lang} categoriesMap={categoriesMap} />
            <div className="flex flex-col gap-3 p-5 bg-white sm:rounded-2xl">
              <div className="flex flex-wrap items-center sm:gap-5 gap-3">
                <p className="font-bold">Lĩnh vực</p>
                {job.require.industries.length > 0 &&
                  job.require.industries.map((item) => (
                    <p
                      key={item}
                      className="text-blue-default px-2 border-2 border-blue-default rounded-lg shrink-0 duration-200 ease-in hover:bg-blue-default hover:text-white"
                    >
                      {categoriesMap.get(item)}
                    </p>
                  ))}
              </div>
              <div className="flex items-center sm:gap-5 gap-3">
                <p className="font-bold">Thời hạn</p>
                <p>{getStringDate(job.date_limited)}</p>
              </div>
            </div>
          </div>
          <div className="flex-2 flex lg:flex-col gap-10 max-lg:p-5 lg:items-center lg:justify-center justify-between bg-blue-default sm:rounded-2xl shadow-default">
            <p className="text-2xl text-center font-bold text-white">
              Bạn có quan tâm tuyển dụng này?
            </p>
            <ButtonDefault
              label="Ứng tuyển"
              className="px-10 rounded-full border-white hover:shadow-default"
            />
          </div>
        </div>
        <div className="flex-1 max-sm:hidden"></div>
      </div>
      <div className="flex h-screen min-h-150 items-stretch">
        <div className="flex-1 max-sm:hidden"></div>
        <div className="flex-8 flex items-stretch gap-5 max-lg:flex-col">
          <div className="flex-6 flex bg-white sm:rounded-2xl overflow-hidden">
            <div className="flex-1 flex-col gap-5 p-5 overflow-auto scroll-box">
              <Descriptions job={job} />
            </div>
          </div>
          <div className="flex-2 flex flex-col gap-5 bg-white sm:rounded-2xl"></div>
        </div>
        <div className="flex-1 max-sm:hidden"></div>
      </div>
    </div>
  );
}
