import { fetchDefault } from "@/app/libs/utils";
import CategoryPage from "./EducationPage";

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
  const fetchEducation = await fetchDefault({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}education/many_search/?name=${name}&slug=${slug}&lang=${lang}`,
  });
  return <CategoryPage initEducation={fetchEducation} initName={name} initSlug={slug} initLang={lang} />;
}
