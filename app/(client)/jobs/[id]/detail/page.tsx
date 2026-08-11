import { fetchDefault } from "@/app/libs/utils";
import DetailPage from "./DetailPage";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const getJobDetail = await fetchDefault({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}job/item_detail/?id=${id}`,
  });
  return <DetailPage job={getJobDetail.job} />;
}
