// hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const allSelect = {
  id: "",
  slug: "",
  translations: [
    {
      id: "category_trans_0",
      language_code: "vie",
      name: "Tất cả",
    },
    {
      id: "category_trans_1",
      language_code: "eng",
      name: "All",
    },
  ],
} as const;

const salaryCategories = [
  {
    id: "",
    slug: "",
    translations: [
      {
        id: "salary_trans_0",
        language_code: "vie",
        name: "Tất cả",
      },
      {
        id: "salary_trans_1",
        language_code: "eng",
        name: "All",
      },
    ],
  },
  {
    id: "0",
    slug: "0",
    translations: [
      {
        id: "salary_trans_2",
        language_code: "vie",
        name: "Thỏa thuận",
      },
      {
        id: "salary_trans_3",
        language_code: "eng",
        name: "Negotiate",
      },
    ],
  },
  {
    id: "+5000000",
    slug: "+5000000",
    translations: [
      {
        id: "salary_trans_4",
        language_code: "vie",
        name: "Dưới 5 triệu",
      },
      {
        id: "salary_trans_5",
        language_code: "eng",
        name: "Under 5 million",
      },
    ],
  },
  {
    id: "5000000-10000000",
    slug: "5000000-10000000",
    translations: [
      {
        id: "salary_trans_6",
        language_code: "vie",
        name: "5 - 10 triệu",
      },
      {
        id: "salary_trans_7",
        language_code: "eng",
        name: "5 - 10 million",
      },
    ],
  },
  {
    id: "10000000-15000000",
    slug: "10000000-15000000",
    translations: [
      {
        id: "salary_trans_8",
        language_code: "vie",
        name: "10 - 15 triệu",
      },
      {
        id: "salary_trans_9",
        language_code: "eng",
        name: "10 - 15 million",
      },
    ],
  },
  {
    id: "15000000-20000000",
    slug: "15000000-20000000",
    translations: [
      {
        id: "salary_trans_10",
        language_code: "vie",
        name: "15 - 20 triệu",
      },
      {
        id: "salary_trans_11",
        language_code: "eng",
        name: "15 - 20 million",
      },
    ],
  },
  {
    id: "20000000-25000000",
    slug: "20000000-25000000",
    translations: [
      {
        id: "salary_trans_12",
        language_code: "vie",
        name: "20 - 25 triệu",
      },
      {
        id: "salary_trans_13",
        language_code: "eng",
        name: "20 - 25 million",
      },
    ],
  },
  {
    id: "25000000-30000000",
    slug: "25000000-30000000",
    translations: [
      {
        id: "salary_trans_14",
        language_code: "vie",
        name: "25 - 30 triệu",
      },
      {
        id: "salary_trans_15",
        language_code: "eng",
        name: "25 - 30 million",
      },
    ],
  },
  {
    id: "30000000-35000000",
    slug: "30000000-35000000",
    translations: [
      {
        id: "salary_trans_16",
        language_code: "vie",
        name: "30 - 35 triệu",
      },
      {
        id: "salary_trans_17",
        language_code: "eng",
        name: "30 - 35 million",
      },
    ],
  },
  {
    id: "35000000-40000000",
    slug: "35000000-40000000",
    translations: [
      {
        id: "salary_trans_18",
        language_code: "vie",
        name: "35 - 40 triệu",
      },
      {
        id: "salary_trans_19",
        language_code: "eng",
        name: "35 - 40 million",
      },
    ],
  },
  {
    id: "40000000-45000000",
    slug: "40000000-45000000",
    translations: [
      {
        id: "salary_trans_20",
        language_code: "vie",
        name: "40 - 45 triệu",
      },
      {
        id: "salary_trans_21",
        language_code: "eng",
        name: "40 - 45 million",
      },
    ],
  },
  {
    id: "45000000-50000000",
    slug: "45000000-50000000",
    translations: [
      {
        id: "salary_trans_22",
        language_code: "vie",
        name: "45 - 50 triệu",
      },
      {
        id: "salary_trans_23",
        language_code: "eng",
        name: "45 - 50 million",
      },
    ],
  },
  {
    id: "50000000+",
    slug: "50000000+",
    translations: [
      {
        id: "salary_trans_24",
        language_code: "vie",
        name: "Trên 50 triệu",
      },
      {
        id: "salary_trans_25",
        language_code: "eng",
        name: "Over 50 million",
      },
    ],
  },
] as const;

const exprienceCategories = [
  {
    id: "",
    slug: "",
    translations: [
      {
        id: "exp_trans_0",
        language_code: "vie",
        name: "Tất cả",
      },
      {
        id: "exp_trans_0",
        language_code: "eng",
        name: "All",
      },
    ],
  },
  {
    id: "0",
    slug: "0",
    translations: [
      {
        id: "exp_trans_1",
        language_code: "vie",
        name: "Không yêu cầu",
      },
      {
        id: "exp_trans_2",
        language_code: "eng",
        name: "No exprience",
      },
    ],
  },
  {
    id: "1",
    slug: "1",
    translations: [
      {
        id: "exp_trans_3",
        language_code: "vie",
        name: "1 năm",
      },
      {
        id: "exp_trans_4",
        language_code: "eng",
        name: "1 years",
      },
    ],
  },
  {
    id: "2",
    slug: "2",
    translations: [
      {
        id: "exp_trans_5",
        language_code: "vie",
        name: "2 năm",
      },
      {
        id: "exp_trans_6",
        language_code: "eng",
        name: "2 years",
      },
    ],
  },
  {
    id: "3",
    slug: "3",
    translations: [
      {
        id: "exp_trans_7",
        language_code: "vie",
        name: "3 năm",
      },
      {
        id: "exp_trans_8",
        language_code: "eng",
        name: "3 years",
      },
    ],
  },
  {
    id: "4",
    slug: "4",
    translations: [
      {
        id: "exp_trans_9",
        language_code: "vie",
        name: "4 năm",
      },
      {
        id: "exp_trans_10",
        language_code: "eng",
        name: "4 years",
      },
    ],
  },
  {
    id: "5",
    slug: "5+",
    translations: [
      {
        id: "exp_trans_11",
        language_code: "vie",
        name: "Hơn 5 năm",
      },
      {
        id: "exp_trans_12",
        language_code: "eng",
        name: "Over 5 years",
      },
    ],
  },
] as const;

type CategoryTranslateItem = {
  id: string;
  name: string;
  language_code: "vie" | "eng";
};

type CategoriesItem = {
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
  salary: {
    id: string;
    slug: string;
    translations: CategoryTranslateItem[];
  }[];
  exprience: {
    id: string;
    slug: string;
    translations: CategoryTranslateItem[];
  }[];
};

const fetchCategories = async (
  lang: "vie" | "eng" = "vie",
): Promise<CategoriesItem> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}web/categories/?lang=${lang}`,
  );
  if (response.data.status === "Success") {
    const categories = response.data.categories;
    return {
      industry: categories.industry,
      location: categories.location,
      formOfWork: categories.form_of_work,
      jobLevel: [allSelect, ...categories.job_level],
      education: categories.education,
      company: categories.company,
      salary: salaryCategories.map((item) => ({
        ...item,
        translations: item.translations.filter(
          (trans) => trans.language_code === lang,
        ),
      })),
      exprience: exprienceCategories.map((item) => ({
        ...item,
        translations: item.translations.filter(
          (trans) => trans.language_code === lang,
        ),
      })),
    };
  }
  throw new Error(response.data.message ?? response.statusText);
};

// app/hook/useCategories.ts
export const useCategories = (lang: "vie" | "eng" = "vie") => {
  return useQuery({
    queryKey: ["categories", lang],
    queryFn: () => fetchCategories(lang),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });
};
