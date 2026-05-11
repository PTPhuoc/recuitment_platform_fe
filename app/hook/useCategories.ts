// hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCategories = async (lang?: string) => {
  const industry = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}industry/many/?lang=${lang}`,
  );
  if(industry.data.status !== "Success") throw new Error(industry.data.message);
  return { industry: industry.data?.industry ?? [], career: [] };
};

export const useCategories = (lang?: string) => {
  return useQuery({
    queryKey: ["categories", lang],
    queryFn: () => fetchCategories(lang),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });
};
