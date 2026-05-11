import { fetchDefault } from "@/app/libs/utils";
import CategoryPage from "./JobLevelPage";

type PageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function page({ searchParams }: PageProps) {
  const param = await searchParams;
  const name = param.name ?? "";
  const slug = param.slug ?? "";
  const lang = param.lang ?? "";
  const fetchIndustry = await fetchDefault({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}job_level/many_search/?name=${name}&slug=${slug}&lang=${lang}`,
  });
  return <CategoryPage initJobLevel={fetchIndustry} initName={name} initSlug={slug} initLang={lang} />;
}
