import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type JobItem = {
  id: string;
  name: string;
  company: string
  company_detail: {
    name: string;
    image: string;
  };
  source_link: string;
  description: string;
  descriptions: string[];
  require: {
    id: string;
    job: string;
    location: string;
    form_of_work: string[];
    educations: string[];
    industries: string[];
    min_salary: number;
    max_salary: number;
    min_experience: number;
    max_experience: number;
  };
};

const fetchLatestJobs = async (limit: number = 3): Promise<JobItem[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}job/latest/?limit=${limit}`,
  );
  if (response.data.status === "Success") {
    return response.data.jobs;
  }
  throw new Error("Failed to fetch latest jobs");
};

// app/hook/useLatestJobs.ts
export default function useLatestJobs(limit: number = 3) {
  return useQuery({
    queryKey: ["latestJobs", limit],
    queryFn: () => fetchLatestJobs(limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });
}
