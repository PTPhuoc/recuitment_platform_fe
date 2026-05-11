import { fetchDefault } from "@/app/libs/utils";
import LocationPage from "./LocationPage";

type PageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

export default async function page({ searchParams }: PageProps) {
  const param = await searchParams;
  const country = param.country || ""
  const city = param.city || ""
  const district = param.district || ""
  const lang = param.lang || ""
  const fetchLocations = await fetchDefault({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}location/many/`,
  });
  return <LocationPage initLocation={fetchLocations} initCountry={country} initCity={city} initDistrict={district} initLang={lang}/>;
}
