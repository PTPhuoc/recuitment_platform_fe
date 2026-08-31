"use client";

import ButtonDefault from "@/app/Component/ButtonDefault";
import { Categories, CompanyItemShow, CompanyPaginate } from "@/app/libs/types";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BG3 from "@/app/svgs/BG3.svg";
import { useRouter } from "next/navigation";
import { useCategories } from "@/app/hook/useCategories";
import { Relist } from "@/app/libs/utils";
import CompanySearch from "@/app/Component/Input/CompanySearch";
import CCDefault from "@/app/Component/CompanyCard/CCDefault";
import { PackageOpen } from "lucide-react";
import axios from "axios";

type PageProps = {
  name: string;
  location: string;
  industry: string;
  companyPaginate: CompanyPaginate;
};

// app/(client)/companies/page.tsx
export default function CompaniesPage({
  name,
  location,
  industry,
  companyPaginate,
}: PageProps) {
  const { lang } = useSelector((state: RootState) => state.web);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const categories = useCategories(lang);
  const [paginate, setPaginate] = useState<CompanyPaginate>(companyPaginate);
  const [companies, setCompanies] = useState<CompanyItemShow[]>(
    companyPaginate.results,
  );
  const [search, setSearch] = useState({
    name: name,
    location: location,
    industry: industry,
  });

  const [category, setCategory] = useState<Categories>({
    industry: [],
    location: [],
    formOfWork: [],
    jobLevel: [],
    education: [],
    salary: [],
    exprience: [],
  });

  const { categoriesMap, locaMap } = useMemo(() => {
    const locaMap = new Map<string, Record<string, string>>();
    category.location.forEach((item) =>
      locaMap.set(item.value, { name: item.name, parent_id: item.parent_id }),
    );
    const categoriesMap = new Map<string, string>();
    category.industry.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    category.location.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    category.formOfWork.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    category.jobLevel.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    category.education.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    category.salary.forEach((item) => categoriesMap.set(item.value, item.name));
    category.exprience.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    return { categoriesMap, locaMap };
  }, [category]);

  const handleSearch = async (filters: {
    name?: string;
    location?: string;
    industry?: string;
  }) => {
    const { name, location, industry } = filters;
    try {
      setSearch({
        name: name ?? search.name,
        location: location ?? search.location,
        industry: industry ?? search.industry,
      });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}company/many_search/?name=${name}&location=${location}&industry=${industry}`,
      );
      if (response.data.status === "Success") {
        setPaginate(response.data);
        setCompanies(response.data.results);
        router.push(
          `/companies?name=${name}&location=${location}&industry=${industry}`,
          {
            scroll: false,
          },
        );
      }
      return response.data.status;
    } catch (error: any) {
      return error.response.statusText ?? "No response received";
    }
  };

  const handleChangePage = async (url: string) => {
    try {
      const response = await axios.get(url);
      if (response.data.status === "Success") {
        setPaginate(response.data);
        setCompanies(response.data.results);
      }
      return response.data.status;
    } catch (error: any) {
      return error.response.statusText ?? "No response received";
    }
  };

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
      dispatch(setLoad(false));
    }
  }, [categories.data]);

  return (
    <div className="flex flex-col w-full sm:gap-5">
      <div className="relative flex flex-col sm:gap-5 gap-2 items-center justify-center w-full h-100">
        <Image
          src={BG3}
          alt="ButtonBG3"
          className="absolute object-cover shadow-default"
          fill
          loading="eager"
        />
        <div className="z-2 flex flex-col py-1 rounded-full items-center">
          <p className="text-7xl max-sm:text-6xl font-bold text-white text-center">
            Companies
          </p>
          <p className="text-2xl font-bold text-zinc-200 text-center max-sm:hidden">
            Explore companies and discover where your next opportunity begins.
          </p>
          <p className="text-2xl font-bold text-zinc-200 text-center sm:hidden">
            Discover companies. Find your opportunity.
          </p>
        </div>
        <CompanySearch
          className="z-2 sm:w-3/4 w-[90%]"
          value={search}
          categories={{
            industry: category.industry,
            location: category.location,
          }}
          outValue={(value) => setSearch({ ...search, ...value })}
        />
        <ButtonDefault
          label="Tìm kiếm"
          className="w-30 h-15 shadow-default"
          classLoad="w-30 h-15 shadow-default"
          classDisabled="w-30 h-15"
          funsHandle={async () => await handleSearch({ ...search })}
        />
      </div>
      <div className="flex w-full items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        {companies.length > 0 ? (
          <div className=" flex-8 grid lg:grid-cols-2 grid-cols-1 grid-rows-5 gap-5 sm:p-5 p-2 h-screen min-h-200 items-start bg-white border-2 border-dashed sm:rounded-2xl shadow-default">
            {companies.map((item) => (
              <CCDefault
                company={item}
                categoriesMap={categoriesMap}
                locaMap={locaMap}
                onNavigate={(id) => {
                  dispatch(setLoad(true));
                  router.push(`/companies/${id}/detail`);
                }}
                onCategories={(category) => handleSearch({ ...category })}
                key={item.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-8 flex-col items-center justify-center h-screen min-h-200 bg-white border-2 border-dashed sm:rounded-2xl shadow-default">
            <PackageOpen className="w-50 h-50 text-zinc-400" />
            <p className="text-zinc-400 font-bold">Không tìm thấy Công ty</p>
          </div>
        )}
        <div className="flex-1 max-lg:hidden"></div>
      </div>
    </div>
  );
}
