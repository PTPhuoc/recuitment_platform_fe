import { fetchDefault } from "@/app/libs/utils";
import DetailPage from "./DetailPage";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const getJobDetail = await fetchDefault({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}job/item_detail/?id=${id}`,
  });
  if (!getJobDetail?.job) return redirect("/jobs");
  return <DetailPage job={getJobDetail.job} />;
}
