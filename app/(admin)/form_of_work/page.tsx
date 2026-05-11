import { fetchDefault } from "@/app/libs/utils";
import CategoryPage from "./FormOfWorkPage";

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
  const fetchFormOfWork = await fetchDefault({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}form_of_work/many_search/?name=${name}&slug=${slug}&lang=${lang}`,
  });
  return <CategoryPage initFormOfWork={fetchFormOfWork} initName={name} initSlug={slug} initLang={lang} />;
}
