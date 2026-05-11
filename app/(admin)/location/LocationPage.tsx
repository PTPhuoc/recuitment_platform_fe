"use client";

import ButtonDefault from "@/app/Component/ButtonDefault";
import InputTextDefault from "@/app/Component/InputTextDefault";
import ListSearch from "@/app/Component/ListSearch";
import { usePopup } from "@/app/Component/Popup";
import { useToast } from "@/app/hook/ToastContext";
import { checkField, findWithTrans, searchWithTrans } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import { PackageOpen, Pencil, Plus, Trash2, X } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const listLang = [
  { name: "Tiếng Việt", value: "vie" },
  { name: "Tiếng Anh", value: "eng" },
];

const ListTypeLocation = [
  { name: "Quốc gia", value: "country" },
  { name: "Thành phố", value: "city" },
  { name: "Quận/Huyện", value: "district" },
];

type TranslateItem = {
  id: string;
  location_id: string;
  language_code: string;
  name: string;
};

type LocationItem = {
  id: string;
  type: "country" | "city" | "district";
  slug: string;
  parent_id: string;
  translations: TranslateItem[] | [] | null;
};

type LocationPagenigation = {
  locations: LocationItem[] | [];
  status: string;
};

type PageProps = {
  initLocation: LocationPagenigation;
  initCountry: string;
  initCity: string;
  initDistrict: string;
  initLang: "vie" | "eng" | any;
};

export default function LocationPage({
  initLocation,
  initCountry,
  initCity,
  initDistrict,
  initLang,
}: PageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { lang } = useSelector((state: RootState) => state.web);
  const { addToast } = useToast();
  const popup = usePopup();
  const [location, setLocation] = useState<{
    id: string;
    country_id: string;
    city_id: string;
    slug: string;
    name: string;
    lang: "vie" | "eng";
  }>({
    id: "",
    city_id: "",
    country_id: "",
    slug: "",
    name: "",
    lang: initLang || lang,
  });
  const [typeLocation, setTypeLocation] = useState<
    "country" | "city" | "district"
  >("country");
  const [listLocation, setListLocation] = useState<LocationItem[]>(
    initLocation.locations,
  );
  const [previewLocation, setPreviewLocation] = useState<LocationItem[]>(
    initLocation.locations,
  );
  const [previewLang, setPreviewLang] = useState<
    {
      id: string;
      location_id: string;
      language_code: "vie" | "eng" | any;
      name: string;
      slug: string;
    }[]
  >([]);
  const [search, setSearch] = useState({
    country: "",
    city: "",
    district: "",
    type: "",
    lang: initLang || lang,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState({
    trans: false,
    infor: false,
  });
  const [isHover, setIsHover] = useState({
    countryId: "",
    cityId: "",
  });

  const listCountry = useMemo(
    () => listLocation.filter((item) => item.type === "country"),
    [listLocation],
  );
  const listCity = useMemo(
    () => previewLocation.filter((item) => item.type === "city"),
    [previewLocation],
  );
  const listDistrict = useMemo(
    () => previewLocation.filter((item) => item.type === "district"),
    [previewLocation],
  );

  const existsTrans = useMemo(
    () =>
      findWithTrans({
        name: location.name,
        lang: location.lang,
        slug: location.slug,
        listSearch: listLocation,
      }),
    [location.name, location.lang, location.slug, listLocation],
  );

  const SearchCity = useCallback(
    (countryId: string) => {
      if (!countryId.trim()) return [];
      return listCity.filter((item) => item.parent_id === countryId);
    },
    [listCity],
  );

  const SearchDistrict = useCallback(
    (cityId: string) => {
      if (!cityId.trim()) return [];
      return listDistrict.filter((item) => item.parent_id === cityId);
    },
    [listDistrict],
  );

  const listOfCountry = useMemo(
    () => SearchCity(isHover.countryId),
    [isHover.countryId],
  );

  const listOfCity = useMemo(
    () => SearchDistrict(isHover.cityId),
    [isHover.cityId],
  );

  const handleWithToast = async (
    funcFetch: () => Promise<AxiosResponse<any, any, {}>>,
    funcSuccess: (response: AxiosResponse<any, any, {}>) => void,
  ) => {
    try {
      const response = await funcFetch();
      if (response.data.status === "Success") {
        funcSuccess(response);
        addToast({
          type: "success",
          description: "Fetch status: " + response.data.status,
          title: "Success",
        });
        return "Success";
      } else {
        addToast({
          type: "error",
          description: "Fetch status: " + response.data.status,
          title: "Error",
        });
        return response.data.status;
      }
    } catch (error: any) {
      addToast({
        title: "Lỗi",
        description: `${error.response.statusText ?? "No response received"}`,
        type: "error",
      });
      return error.response.statusText ?? "No response received";
    }
  };

  const handleSave = async () => {
    return await handleWithToast(
      async () =>
        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}location/save/`,
          {
            ...location,
            type: typeLocation,
            parent_id: location.city_id
              ? location.city_id
              : location.country_id,
          },
          { withCredentials: true },
        ),
      (response) => {
        setListLocation([...listLocation, response.data.location]);
        setPreviewLocation([...previewLocation, response.data.location]);
      },
    );
  };

  const handleDelete = async (id: string) => {
    return await handleWithToast(
      async () =>
        await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}location/item/?id=${id}`,
          { withCredentials: true },
        ),
      (response) => {
        setListLocation(listLocation.filter((item) => item.id !== id));
        setPreviewLocation(previewLocation.filter((item) => item.id !== id));
      },
    );
  };

  const handleDeleteTrans = async (id: string) => {
    return await handleWithToast(
      async () =>
        await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}location/translation/?id=${id}`,
          { withCredentials: true },
        ),
      (response) => {
        listLocation &&
          listLocation.length > 0 &&
          setListLocation((prev) => {
            return prev.map((item) => {
              if (item.translations && item.translations.length > 0) {
                return {
                  ...item,
                  translations: item.translations.filter(
                    (trans) => trans.id !== id,
                  ),
                };
              }
              return item;
            });
          });
        previewLocation &&
          previewLocation.length > 0 &&
          setPreviewLocation((prev) => {
            return prev.map((item) => {
              if (item.translations && item.translations.length > 0) {
                return {
                  ...item,
                  translations: item.translations.filter(
                    (trans) => trans.id !== id,
                  ),
                };
              }
              return item;
            });
          });
      },
    );
  };

  //toggle delete location and translation with popup
  const toggleDelete = async (
    slug: string | null,
    name: string | null,
    id: string,
    typeDelete: "item" | "trans",
  ) => {
    if (typeDelete === "item") {
      await popup({
        isOpen: true,
        title: "Xóa địa điểm",
        message: `Bạn có chắc muốn xóa địa điểm ${slug} không?`,
        typeSubmit: "YrN",
        handleFuns: async () => await handleDelete(id),
      });
      return "Success";
    } else {
      await popup({
        isOpen: true,
        title: "Xóa bản dịch địa điểm",
        message: `Bạn có chắc muốn xóa bản dịch ${name} không?`,
        typeSubmit: "YrN",
        handleFuns: async () => await handleDeleteTrans(id),
      });
      return "Success";
    }
  };

  // Implementation for handling list search
  const handleListSearch = (id: string | null) => {
    if (!id) return [];
    const target = listLocation.find((item) => item.id === id);
    if (!target) return [];
    const listTarget = listLocation.filter(
      (item) => item.parent_id === target.id,
    );
    return listTarget;
  };

  const listSearchCity = useMemo(() => {
    return handleListSearch(search.country);
  }, [search.country, listLocation]);

  const listSearchDistrict = useMemo(() => {
    return handleListSearch(search.city);
  }, [search.city, listLocation]);

  const handleSearch = useCallback(() => {
    let filtered = [...listLocation];
    if (search.country) {
      const prevDistrict = listLocation.filter(
        (district) => district.type === "district",
      );
      const prevCity = listLocation.filter((city) => city.type === "city");
      const countryFilter = listLocation.filter(
        (country) =>
          country.id === search.country && country.type === "country",
      );
      filtered = [...countryFilter];
      if (search.city) {
        const cityFilter = listLocation.filter(
          (city) => city.id === search.city && city.type === "city",
        );
        filtered = [...filtered, ...cityFilter];
        if (search.district) {
          const districtFilter = listLocation.filter(
            (district) =>
              district.id === search.district && district.type === "district",
          );
          filtered = [...filtered, ...districtFilter];
        } else {
          filtered = [...filtered, ...prevDistrict];
        }
      } else {
        filtered = [...filtered, ...prevCity, ...prevDistrict];
      }
    }
    setIsHover({ countryId: "", cityId: "" });
    setPreviewLocation(filtered);
    return "Success";
  }, [search.country, search.city, search.district, listLocation]);

  useEffect(() => {
    dispatch(setLoad(false));
  }, []);

  useEffect(() => {
    if (location.city_id) {
      setTypeLocation("district");
    } else if (location.country_id) {
      setTypeLocation("city");
    } else {
      setTypeLocation("country");
    }
  }, [location.city_id, location.country_id]);

  //console.log(location, typeLocation);
  //console.log(search);

  return (
    <>
      <div className="flex flex-col w-3/4 max-lg:w-[95%] max-sm:w-full gap-3 max-lg:gap-2 py-3 max-lg:py-2 items-stretch overflow-auto no-scroll min-h-0">
        <div className="flex justify-between items-center p-3 bg-blue-default sm:rounded-2xl shadow-default">
          <p className="font-bold text-light-blue">Danh sách Địa chỉ</p>
          <button
            className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-2 p-3 bg-white rounded-2xl shadow-default min-h-0">
          <div className="flex gap-2 max-lg:flex-col">
            <ListSearch
              listValue={listCountry}
              outValue={(value) =>
                setSearch((prev) => {
                  return {
                    ...prev,
                    country: value,
                    city: value === "" ? "" : search.city,
                    district: value === "" ? "" : search.district,
                  };
                })
              }
              value={search.country}
              attrGet="id"
              attrSearch="slug"
              lable="Quốc gia"
              className="flex-3 z-3"
            />
            <ListSearch
              listValue={listSearchCity}
              outValue={(value) =>
                setSearch((prev) => {
                  return {
                    ...prev,
                    city: value,
                    district: value === "" ? "" : search.district,
                  };
                })
              }
              value={search.city}
              attrGet="id"
              attrSearch="slug"
              lable="Thành phố"
              className="flex-3 z-2"
            />
            <ListSearch
              listValue={listSearchDistrict}
              outValue={(value) =>
                setSearch((prev) => {
                  return { ...prev, district: value };
                })
              }
              value={search.district}
              attrGet="id"
              attrSearch="slug"
              lable="Quận/Huyện"
              className="flex-3 z-1"
            />
            <ButtonDefault
              className="flex-1 rounded-xl"
              lable="Tìm kiếm"
              funsHandle={() => handleSearch()}
            />
          </div>
          <div className="flex-1 flex gap-2 max-lg:flex-col min-h-0">
            <div className="flex-1 flex flex-col gap-2 p-2 rounded-xl border-2 border-blue-default shadow-default overflow-auto no-scroll max-md:max-h-100 min-h-100">
              {listCountry && listCountry.length > 0 ? (
                listCountry.map((country) => (
                  <div
                    key={country.id}
                    className={`flex flex-col min-h-0 shrink-0 duration-200 ease-in-out ${isHover.countryId === country.id && "gap-2"}`}
                  >
                    <div
                      className={`flex gap-1 p-1 rounded-lg border-2 border-blue-default duration-200 ease-in cursor-pointer ${isHover.countryId === country.id ? "font-bold text-dark-blue" : "text-blue-default"}`}
                      onClick={() => {
                        setIsHover({
                          ...isHover,
                          countryId:
                            isHover.countryId === country.id ? "" : country.id,
                        });
                        setPreviewLang(
                          country.translations &&
                            country.translations.length > 0
                            ? country.translations.map((i) => {
                                return { ...i, slug: country.slug };
                              })
                            : [],
                        );
                      }}
                    >
                      <p className="flex-5 text-center">{country.slug}</p>
                      <button
                        className="p-1 rounded-md bg-white text-blue-default border-2 border-blue-default duration-200 ease-in hover:bg-blue-default hover:text-white cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(true);
                          setIsEdit({ infor: true, trans: false });
                          setLocation({
                            country_id: country.id,
                            city_id: "",
                            id: "",
                            lang: lang,
                            name: "",
                            slug: "",
                          });
                          setTypeLocation("city");
                        }}
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <button
                        className="p-1 rounded-md bg-blue-default text-white border-2 border-blue-default duration-200 ease-in hover:bg-white hover:text-blue-default cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(true);
                          setIsEdit({ infor: true, trans: false });
                          setLocation({
                            country_id: country.id,
                            city_id: "",
                            id: country.id,
                            lang: lang,
                            name: "",
                            slug: "",
                          });
                          setTypeLocation("city");
                        }}
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <ButtonDefault
                        icon={<Trash2 className="w-5 h-5" />}
                        className="p-1 border-red-400 bg-red-400 hover:text-red-400 rounded-md"
                        classDisabled="p-1 rounded-md"
                        classLoad="p-1 rounded-md"
                        funsHandle={async () =>
                          await toggleDelete(
                            country.slug,
                            null,
                            country.id,
                            "item",
                          )
                        }
                      />
                    </div>
                    <div
                      className={`flex flex-col gap-2 duration-200 ease-in-out ${isHover.countryId === country.id ? "max-h-full" : "max-h-0"}`}
                    >
                      {listOfCountry.length > 0 &&
                        listOfCountry.map((city) => (
                          <div
                            key={city.id}
                            className={`flex flex-col min-h-0 duration-200 ease-in-out ${isHover.cityId === city.id && "gap-2"}`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`flex-2 h-1 bg-milk-blue-blur min-h-0`}
                              />
                              <div
                                className={`flex-9 flex gap-1 p-1 rounded-lg border-2 border-blue-default duration-200 ease-in cursor-pointer ${isHover.cityId === city.id ? "font-bold text-dark-blue" : "text-blue-default"}`}
                                onClick={() => {
                                  setIsHover({
                                    ...isHover,
                                    cityId:
                                      city.id === isHover.cityId ? "" : city.id,
                                  });
                                  setPreviewLang(
                                    city.translations &&
                                      city.translations.length > 0
                                      ? city.translations.map((i) => {
                                          return { ...i, slug: city.slug };
                                        })
                                      : [],
                                  );
                                }}
                              >
                                <p className="flex-5 text-center">
                                  {city.slug}
                                </p>
                                <button
                                  className="p-1 rounded-md bg-white text-blue-default border-2 border-blue-default duration-200 ease-in hover:bg-blue-default hover:text-white cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(true);
                                    setIsEdit({ infor: true, trans: false });
                                    setLocation({
                                      country_id: country.id,
                                      city_id: city.id,
                                      id: "",
                                      lang: lang,
                                      name: "",
                                      slug: "",
                                    });
                                    setTypeLocation("district");
                                  }}
                                >
                                  <Plus className="w-5 h-5" />
                                </button>
                                <button
                                  className="p-1 rounded-md bg-blue-default text-white border-2 border-blue-default duration-200 ease-in hover:bg-white hover:text-blue-default cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(true);
                                    setIsEdit({ infor: true, trans: false });
                                    setLocation({
                                      country_id: country.id,
                                      city_id: "",
                                      id: country.id,
                                      lang: lang,
                                      name: "",
                                      slug: "",
                                    });
                                    setTypeLocation("district");
                                  }}
                                >
                                  <Pencil className="w-5 h-5" />
                                </button>
                                <ButtonDefault
                                  icon={<Trash2 className="w-5 h-5" />}
                                  className="p-1 border-red-400 bg-red-400 hover:text-red-400 rounded-md"
                                  classDisabled="p-1 rounded-md"
                                  classLoad="p-1 rounded-md"
                                  funsHandle={async () =>
                                    await toggleDelete(
                                      city.slug,
                                      null,
                                      city.id,
                                      "item",
                                    )
                                  }
                                />
                              </div>
                            </div>
                            <div
                              className={`flex flex-col gap-2 ${isHover.cityId === city.id ? "max-h-full" : "max-h-0 overflow-hidden"}`}
                            >
                              {listOfCity.length > 0 &&
                                listOfCity.map((district) => (
                                  <div
                                    key={district.id}
                                    className="flex items-center"
                                  >
                                    <div
                                      className={`flex-4 h-1 bg-milk-blue-blur`}
                                    />
                                    <div
                                      className={`flex-9 flex gap-1 p-1 rounded-lg border-2 border-blue-default duration-200 ease-in cursor-pointer ${isHover.cityId === district.id ? "font-bold text-dark-blue" : "text-blue-default"}`}
                                      onClick={() =>
                                        setPreviewLang(
                                          district.translations &&
                                            district.translations.length > 0
                                            ? district.translations.map((i) => {
                                                return {
                                                  ...i,
                                                  slug: district.slug,
                                                };
                                              })
                                            : [],
                                        )
                                      }
                                    >
                                      <p className="flex-5 text-center">
                                        {district.slug}
                                      </p>
                                      <button
                                        className="p-1 rounded-md bg-blue-default text-white border-2 border-blue-default duration-200 ease-in hover:bg-white hover:text-blue-default cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setIsOpen(true);
                                          setIsEdit({
                                            infor: true,
                                            trans: false,
                                          });
                                          setLocation({
                                            country_id: country.id,
                                            city_id: city.id,
                                            id: district.id,
                                            lang: lang,
                                            name: "",
                                            slug: "",
                                          });
                                          setTypeLocation("district");
                                        }}
                                      >
                                        <Pencil className="w-5 h-5" />
                                      </button>
                                      <ButtonDefault
                                        icon={<Trash2 className="w-5 h-5" />}
                                        className="p-1 border-red-400 bg-red-400 hover:text-red-400 rounded-md"
                                        classDisabled="p-1 rounded-md"
                                        classLoad="p-1 rounded-md"
                                        funsHandle={async () =>
                                          await toggleDelete(
                                            district.slug,
                                            null,
                                            district.id,
                                            "item",
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2 p-2 rounded-xl border-2 border-blue-default shadow-default overflow-auto no-scroll max-md:max-h-100 min-h-100">
              {previewLang.length > 0 ? (
                <>
                  <div className="grid grid-cols-3 gap-2">
                    <p className="text-center text-dark-blue bg-light-blue py-1 rounded-lg">
                      Ngôn ngữ
                    </p>
                    <p className="text-center text-dark-blue bg-light-blue py-1 rounded-lg">
                      Tên
                    </p>
                    <p className="text-center text-dark-blue bg-light-blue py-1 rounded-lg">
                      Tùy chọn
                    </p>
                  </div>
                  {previewLang.map((item) => (
                    <React.Fragment key={item.id}>
                      <div className="h-px w-full bg-light-blue shrink-0"></div>
                      <div className="group w-full grid gap-2 grid-cols-3 rounded-lg border-2 border-white duration-200 ease-in hover:border-light-blue">
                        <p className="flex items-center truncate p-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in group-hover:border-white">
                          {item.language_code}
                        </p>
                        <p className="flex items-center text-nowrap p-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in overflow-auto no-scroll group-hover:border-white">
                          {item.name}
                        </p>
                        <div className="flex gap-2 items-center justify-center duration-200 ease-in group-hover:border-white">
                          <ButtonDefault
                            lable="Sửa"
                            funsHandle={() => {
                              setLocation({
                                ...location,
                                id: item.id,
                                name: item.name,
                                slug: item.slug,
                                lang: item.language_code,
                              });
                              setIsOpen(true);
                              setIsEdit({ infor: false, trans: true });
                              return "Success";
                            }}
                          />
                          <ButtonDefault
                            lable="Xóa"
                            className="border-red-400 bg-red-400 hover:text-red-400"
                            funsHandle={async () =>
                              await toggleDelete(
                                null,
                                item.name,
                                item.id,
                                "trans",
                              )
                            }
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center">
                  <PackageOpen className="h-20 w-20 text-zinc-400" />
                  <p className="font-bold text-zinc-400">
                    Chưa có bản dịch nào
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 z-2 flex w-full h-full justify-end duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      >
        <div
          className="flex flex-col gap-3 max-lg:gap-2 py-3 max-lg:py-2 w-1/4 max-lg:w-1/2 max-sm:w-full border-l-2 border-dark-blue h-full bg-white shadow-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-3 bg-blue-default shadow-default">
            <p className="font-bold text-light-blue">
              {location.id ? "Cập nhật địa điểm" : "Tạo Địa điểm"}
            </p>
            <button
              className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-3 px-3">
            <InputTextDefault
              className="rounded-xl"
              lable="Tên chung"
              placeholder="Tên chung"
              value={location.slug}
              outValue={(value) => setLocation({ ...location, slug: value })}
            />
            <ListSearch
              className="z-1"
              listValue={listLang}
              attrSearch="name"
              attrGet="value"
              value={location.lang}
              placeholder="Chọn ngôn ngữ"
              lable="Ngôn ngữ"
              outValue={(value: any) =>
                setLocation({ ...location, lang: value })
              }
            />
            <InputTextDefault
              className="rounded-xl"
              lable="Tên"
              placeholder="Tên Địa chỉ"
              value={location.name}
              outValue={(value) => setLocation({ ...location, name: value })}
            />
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-blue-default"></div>
              <p>Cho địa chỉ</p>
              <div className="flex-1 h-1 bg-blue-default"></div>
            </div>
            <ListSearch
              listValue={listCountry}
              value={location.country_id}
              lable="Quốc gia"
              attrGet="id"
              attrSearch="slug"
              outValue={(value) =>
                setLocation({
                  ...location,
                  country_id: value,
                })
              }
              className="z-2"
              disable={isEdit.trans}
            />
            <ListSearch
              listValue={SearchCity(location.country_id)}
              value={location.city_id}
              lable="Thành phố"
              attrGet="id"
              attrSearch="slug"
              outValue={(value) =>
                setLocation({
                  ...location,
                  city_id: value,
                })
              }
              className="z-1"
              disable={isEdit.trans}
            />
            <div className="flex gap-2 items-center">
              <ButtonDefault
                lable="Xác nhận"
                disabled={
                  !checkField({
                    lang: location.lang,
                    name: location.name,
                    slug: location.slug,
                  })
                }
                classAll="flex-1"
                funsHandle={async () => handleSave()}
              />
              {location.id && (
                <button
                  className="flex-1 p-1 rounded-lg text-white bg-red-400 border-2 border-red-400 duration-200 ease-in hover:text-red-400 hover:bg-white cursor-pointer"
                  onClick={() => {
                    setLocation({
                      id: "",
                      city_id: "",
                      country_id: "",
                      lang: lang,
                      name: "",
                      slug: "",
                    });
                    setIsEdit({ infor: false, trans: false });
                  }}
                >
                  Hủy
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-blue-default"></div>
              <p>Bản dịch</p>
              <div className="flex-1 h-1 bg-blue-default"></div>
            </div>
            {location.name && existsTrans ? (
              <>
                <div className="flex items-center gap-2">
                  <p className="w-30 text-center text-blue-default font-bold rounded-xl bg-light-blue">
                    ID
                  </p>
                  <p className="flex-1 border-b-2 border-dark-blue">
                    {existsTrans.id}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-30 text-center text-blue-default font-bold rounded-xl bg-light-blue">
                    Parent
                  </p>
                  <p className="flex-1 border-b-2 border-dark-blue">
                    {existsTrans.parent_id ?? "No Parent"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-30 text-center text-blue-default font-bold rounded-xl bg-light-blue">
                    Slug
                  </p>
                  <p className="flex-1 border-b-2 border-dark-blue">
                    {existsTrans.slug}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-30 text-center text-blue-default font-bold rounded-xl bg-light-blue">
                    Type
                  </p>
                  <p className="flex-1 border-b-2 border-dark-blue">
                    {existsTrans.type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-30 text-center text-blue-default font-bold rounded-xl bg-light-blue">
                    Language
                  </p>
                  <p className="flex-1 border-b-2 border-dark-blue">
                    {existsTrans.translations.language_code}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="w-30 text-center text-blue-default font-bold rounded-xl bg-light-blue">
                    Name
                  </p>
                  <p className="flex-1 border-b-2 border-dark-blue">
                    {existsTrans.translations.name}
                  </p>
                </div>
              </>
            ) : (
              <p className="w-full text-center">Chưa có bản dịch nào</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
