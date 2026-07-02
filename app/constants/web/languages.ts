const languages = [
  { name: { vie: "Tiếng Việt", eng: "Vietnamese" }, value: "vie" },
  { name: { vie: "Tiếng Anh", eng: "English" }, value: "eng" },
] as const;

export default function getLanguages(lang: "vie" | "eng") {
  return languages.map((item) => ({
    name: item.name[lang],
    value: item.value,
  }));
}
