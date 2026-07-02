const jobStatus = [
  {
    name: {
      vie: "Chờ",
      eng: "Pending",
    },
    value: "pending",
  },
  {
    name: {
      vie: "Đã xác thực",
      eng: "Active",
    },
    value: "active",
  },
  {
    name: {
      vie: "Cấm",
      eng: "Ban",
    },
    value: "ban",
  },
] as const;

export const getStatus = (lang: "vie" | "eng") => {
  return jobStatus.map((item) => ({
    name: item.name[lang],
    value: item.value,
  }));
};

export const getNameStatus = (value: string, lang: "vie" | "eng") => {
  return jobStatus.find((item) => item.value === value)?.name[lang] ?? "";
};
