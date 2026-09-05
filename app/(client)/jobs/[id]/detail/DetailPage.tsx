"use client";

import { useCategories } from "@/app/hook/useCategories";
import { Categories, JobItemShow } from "@/app/libs/types";
import { getStringDate, Relist } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Overview from "./Overview";
import ButtonDefault from "@/app/Component/ButtonDefault";
import Descriptions from "./Descriptions";
import Image from "next/image";
import SVGBackgound1 from "@/app/svgs/BG1.svg";
import Requires from "./Requires";
import Trapezium from "@/app/svgs/Trapezium.svg";
import { CldImage } from "next-cloudinary";
import CCSummary from "@/app/Component/CompanyCard/CCSummary";
import useIntersectionObserver from "@/app/hook/useIntersectionObserver";

type PageProps = {
  job: JobItemShow;
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
    const move = useIntersectionObserver({
      target: ["move-top", "move-bottom", "drop"],
      insert: "perform",
      threshold: 0,
    });
    return () => move.disconnect();
  }, []);

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
      if (!job) router.push("/");
      dispatch(setLoad(false));
    }
  }, [categories.data]);

  return (
    <div className="w-full sm:px-5 flex flex-col sm:gap-5 gap-2 sm:pt-5">
      <div className="w-full flex items-stretch">
        <div className="flex-1 max-sm:hidden"></div>
        <div className="flex-8 flex sm:gap-5 gap-2 max-lg:flex-col">
          <div className="flex-6 flex flex-col sm:gap-5 gap-2">
            <Overview job={job} lang={lang} categoriesMap={categoriesMap} className="move-top"/>
            <div className="flex flex-col gap-3 p-5 bg-white sm:rounded-2xl move-top">
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
          <div className="relative flex-2 flex lg:flex-col gap-10 max-lg:p-5 lg:items-center lg:justify-center justify-between bg-blue-default sm:rounded-2xl shadow-default overflow-hidden move-top">
            <Image
              src={SVGBackgound1}
              alt="ButtonBG1"
              fill
              className="absolute w-full h-full object-cover"
              loading="eager"
            />
            <p className="z-1 text-2xl text-center font-bold text-white">
              Bạn có quan tâm tuyển dụng này?
            </p>
            <ButtonDefault
              label="Ứng tuyển"
              className="z-1 px-10 rounded-full border-white bg-white text-blue-default hover:bg-blue-default hover:text-white hover:shadow-default active:bg-blue-default active:text-white active:shadow-default"
              classDisabled="px-10 rounded-full"
            />
          </div>
        </div>
        <div className="flex-1 max-sm:hidden"></div>
      </div>
      <div className="flex min-h-150 items-stretch">
        <div className="flex-1 max-sm:hidden"></div>
        <div className="flex-8 flex items-stretch sm:gap-5 gap-2 max-lg:flex-col-reverse">
          <div className="flex-6 flex bg-white sm:rounded-2xl move-top">
            <div className="flex-1 flex-col p-5">
              <Descriptions job={job}/>
            </div>
          </div>
          <div className="flex-2 flex flex-col gap-5">
            <div className="sticky top-5 flex flex-col gap-5">
              <Requires job={job} categoriesMap={categoriesMap} className="move-top"/>
              <CCSummary
                className="max-lg:hidden move-top"
                company={job.company}
                company_detail={job.company_detail}
                onNavigate={(id) => {
                  dispatch(setLoad(true));
                  router.push(`/companies/${id}/detail`);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 max-sm:hidden"></div>
      </div>
      <div className="flex items-stretch lg:hidden">
        <div className="flex-1 max-sm:hidden"></div>
        <div className="flex-8 flex gap-5 max-lg:flex-col">
          <CCSummary
            company={job.company}
            company_detail={job.company_detail}
            onNavigate={(id) => {
              dispatch(setLoad(true));
              router.push(`/companies/${id}/detail`);
            }}
          />
        </div>
        <div className="flex-1 max-sm:hidden"></div>
      </div>
      <div className="flex items-stretch">
        <div className="flex-1 max-sm:hidden"></div>
        <div className="relative flex-8 flex lg:items-center gap-5 max-lg:flex-col p-5 sm:rounded-2xl overflow-hidden move-top">
          <div className="absolute top-0 right-0 w-full h-full">
            <Image
              src={Trapezium}
              alt="Trapezium"
              fill
              className="z-2 w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute w-1/2 h-full right-0 top-0">
              <CldImage
                src="https://res.cloudinary.com/dlorwajri/image/upload/v1787369917/successfull_image_lwbpk8.webp"
                alt="Successfull_image"
                loading="eager"
                className="absolute object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                fill
              />
            </div>
          </div>
          <p className="z-2 text-2xl font-bold text-white">
            Cơ hội vẫn còn cho bạn
          </p>
          <ButtonDefault
            label="Ứng tuyển"
            className="z-2 px-10 max-lg:self-start rounded-lg border-white bg-white text-blue-default hover:bg-blue-default hover:text-white hover:shadow-default active:bg-blue-default active:text-white active:shadow-default"
            classDisabled="px-10 rounded-lg"
          />
        </div>
        <div className="flex-1 max-sm:hidden"></div>
      </div>
    </div>
  );
}
