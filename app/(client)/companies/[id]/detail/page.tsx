import React from "react";
import DetailPage from "./DetailPage";
import { fetchDefault } from "@/app/libs/utils";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

// app/(client)/companies/[id]/detail/page.tsx
export default async function page({ params }: PageProps) {
  const companyId = await params;
  const initCompany = await fetchDefault({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}company/item_detail/?id=${companyId.id}`,
  });
  if (!initCompany?.company) return redirect("/companies");
  const initJobsCompany = await fetchDefault({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}job/items_company/?id=${companyId.id}`,
  })
  return <DetailPage initCompany={initCompany.company} initJobsCompany={initJobsCompany.jobs} />;
}
