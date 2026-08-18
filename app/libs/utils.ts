import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function average(arr: Array<number>) {
  if (!Array.isArray(arr) || arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

type FetchValue = {
  url: string;
  cookie?: string;
  attribute?: string;
};

export const fetchWithCookie = async ({
  url,
  cookie = "",
  attribute = "name",
}: FetchValue) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Cookie: cookie },
      cache: "no-store",
    });
    if (!response.ok) {
      console.warn(
        `Error URL: ${url} -> ${response.statusText} - ${response.status}`,
      );
      return null;
    }
    const data = await response.json();
    if (data.status != "Success") return null;
    return data[attribute];
  } catch (error: any) {
    console.log(
      `Error URL: ${url} -> ${error.response?.statusText || error.response?.message}`,
    );
    return null;
  }
};

export const fetchDefault = async ({ url, cookie = "" }: FetchValue) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Cookie: cookie },
      cache: "no-store",
    });
    if (!response.ok) {
      console.warn(
        `Error URL: ${url} -> ${response.statusText} - ${response.status}`,
      );
      return null;
    }
    const data = await response.json();
    if (data.status != "Success") return null;
    return data;
  } catch (error: any) {
    console.log(
      `Error URL: ${url} -> ${error.response?.statusText || error.response?.message}`,
    );
    return null;
  }
};

export const fetchRefreshCookie = async ({ url, cookie = "" }: FetchValue) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Cookie: cookie },
      cache: "no-store",
    });
    const setCookie = response.headers.get("set-cookie");
    if (!response.ok) {
      console.warn(
        `Error URL: ${url} -> ${response.statusText} - ${response.status}`,
      );
      return { data: null, cookie: setCookie };
    }
    const data = await response.json();
    if (data.status !== "Success") return { data: null, cookie: setCookie };
    return { data, cookie: setCookie };
  } catch (error: any) {
    console.log(`Error URL: ${url} -> ${error.message}`);
    return { data: null, cookie: null };
  }
};

type PercentValue = {
  max: number;
  current: number;
};

export const percent = ({ max, current }: PercentValue) => {
  if (current <= 0) return 0;
  const divine = current / max;
  return divine * 100;
};

export const getStringDate = (value: string | Date) => {
  const currentDate = value ? new Date(value) : new Date();
  const date = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  return `${date}/${month}/${currentDate.getFullYear()}`;
};

export const handleSearch = <T, S extends keyof T>(
    value: string,
    listSearch: T[],
    attrSearch: S,
  ) => {
    if(!listSearch) return [];
    if (!value) return listSearch;
    try {
      const found = listSearch.filter((item) => {
        const fieldValue = String(item[attrSearch]);
        if (!fieldValue) return false;
        return fieldValue.toLowerCase().includes(value.toLowerCase());
      });
      return found;
    } catch (error) {
      return [];
    }
};

export const checkField = (obj: Record<string, any>): boolean => {
  return Object.values(obj).every((value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string" && value.trim() === "") return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  });
};

type SyncScrollProps = {
  containerRef: React.RefObject<HTMLDivElement | null> | null;
  targetRef: React.RefObject<HTMLDivElement | null> | null;
};

export const syncScroll = ({ containerRef, targetRef }: SyncScrollProps) => {
  const title = containerRef?.current;
  const table = targetRef?.current;
  if (!title || !table) return;

  let isSyncing = false;

  const titleScroll = () => {
    if (isSyncing) return;
    isSyncing = true;
    title.scrollLeft = table.scrollLeft;
    isSyncing = false;
  };

  const tableScroll = () => {
    if (isSyncing) return;
    isSyncing = true;
    table.scrollLeft = title.scrollLeft;
    isSyncing = false;
  };

  title.addEventListener("scroll", tableScroll);
  table.addEventListener("scroll", titleScroll);
  return () => {
    title.removeEventListener("scroll", tableScroll);
    table.removeEventListener("scroll", titleScroll);
  };
};

type HasTranslations = {
  id: string;
  slug: string;
  translations: { language_code: string; name: string }[] | [] | null;
};

export const searchWithTrans = <T extends HasTranslations>({
  name,
  lang,
  listSearch,
}: {
  name: string;
  lang: string;
  listSearch: T[];
}): T[] => {
  if (!name.trim() || !lang) return listSearch;
  return listSearch.filter((item) =>
    item.translations?.some(
      (trans) =>
        trans.language_code === lang &&
        trans.name?.toLowerCase().includes(name.toLowerCase()),
    ),
  );
};

export const findWithTrans = <T extends HasTranslations>({
  name,
  lang,
  slug,
  listSearch,
}: {
  name: string;
  lang: string;
  slug: string;
  listSearch: T[];
}) => {
  if (!name.trim() || !lang || !slug) return null;
  const slugObject = listSearch.find((item) =>
    item.slug.toLowerCase().includes(slug.toLowerCase()),
  );
  if (
    slugObject &&
    slugObject.translations &&
    slugObject.translations.length > 0
  ) {
    const transObject = slugObject.translations.find(
      (item) =>
        item.language_code === lang &&
        item.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (transObject) {
      return { ...slugObject, translations: { ...transObject } };
    }
  }
  return null;
};

type ReListItem = {
  id: string;
  slug: string;
  translations:
    | {
        id: string;
        language_code: string;
        name: string;
      }[]
    | []
    | null;
};

export const Relist = <T extends ReListItem>(
  list: T[] | null,
): (Omit<T, "translations"> & { name: string; value: string, slug: string })[] => {
  if (!list) return [];
  return list.map((item) => {
    const { translations, ...rest } = item;
    return {
      ...rest,
      name: translations?.[0]?.name || "",
      slug: item.slug,
      value: item.id,
    };
  });
};

export const trimAllField = (obj: Record<string, any>) => {
  for (const key in obj) {
    if (typeof obj[key] === "string") obj[key] = obj[key].trim();
  }
  return obj;
};

const validStatuses = ["pending", "active", "ban"] as const;
type Status = (typeof validStatuses)[number] | "";

export const validateStatus = (status: string | undefined): Status => {
  if (status && validStatuses.includes(status as any)) {
    return status as Status;
  }
  return "";
};

export const validateNumber = (
  number: string | undefined,
  max: number | undefined,
  min: number | undefined,
): number | undefined => {
  if (max && number && Number(number) > max) {
    return max;
  }
  if (min && number && Number(number) < min) {
    return min;
  }
  return Number(number) || undefined;
};
