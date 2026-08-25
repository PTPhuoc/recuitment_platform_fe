import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { JobItem } from "../libs/types";

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
