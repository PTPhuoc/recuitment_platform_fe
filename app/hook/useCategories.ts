// hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type CategoryTranslateItem = {
  id: string;
  name: string;
  language_code: "vie" | "eng";
};

const fetchCategories = async (
  lang?: string,
): Promise<{
  industry: {
    id: string;
    slug: string;
    translations: CategoryTranslateItem[];
  }[];
  location: {
    id: string;
    slug: string;
    parent_id: string;
    translations: CategoryTranslateItem[];
  }[];
  formOfWork: {
    id: string;
    slug: string;
    translations: CategoryTranslateItem[];
  }[];
  jobLevel: {
    id: string;
    slug: string;
    translations: CategoryTranslateItem[];
  }[];
  education: {
    id: string;
    slug: string;
    translations: CategoryTranslateItem[];
  }[];
  company: {
    id: string;
    name: string;
  }[];
}> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}web/categories/?lang=${lang}`,
  );
  if (response.data.status === "Success") {
    const categories = response.data.categories;
    return {
      industry: categories.industry,
      location: categories.location,
      formOfWork: categories.form_of_work,
      jobLevel: categories.job_level,
      education: categories.education,
      company: categories.company,
    };
  }
  throw new Error(response.data.message ?? response.statusText);
};

// app/hook/useCategories.ts
export const useCategories = (lang?: string) => {
  return useQuery({
    queryKey: ["categories", lang],
    queryFn: () => fetchCategories(lang),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });
};
