import { fetchDefault } from "@/app/libs/utils";
import CategoryPage from "./IndustryPage";

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
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}industry/many_search/?name=${name}&slug=${slug}&lang=${lang}`,
  });
  return <CategoryPage initIndustry={fetchIndustry} initName={name} initSlug={slug} initLang={lang} />;
}
