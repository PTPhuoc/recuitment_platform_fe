"use client";

import { useCategories } from "@/app/hook/useCategories";
import { Categories, JobItem } from "@/app/libs/types";
import { Relist } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type PageProps = {
  job: JobItem;
};

type Locations = {
  name: string;
  value: string;
  slug: string;
  parent_id: string;
};

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
    <div className="w-full sm:p-5 flex flex-col gap-5">
      <div className="w-full h-screen min-h-200 flex items-stretch">
        <div className="flex-1 max-sm:hidden"></div>
        <div className="flex-8 flex flex-col">
          <div className="flex gap-5 bg-white p-5 rounded-2xl">
            <div className="relative w-50 h-50 shadow-default rounded-lg overflow-hidden">
              <CldImage
                src={job.company_detail.image}
                alt={job.company_detail.name}
                loading="eager"
                className="absolute object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                fill
              />
            </div>
            <div className="flex flex-col">
              <p className="text-gray-400 font-bold">
                {job.company_detail.name}
              </p>
              <h3 className="text-3xl font-semibold">{job.name}</h3>
            </div>
          </div>
        </div>
        <div className="flex-1 max-sm:hidden"></div>
      </div>
    </div>
  );
}
