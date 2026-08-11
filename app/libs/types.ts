export type JobDescItem = {
  id: string;
  title: string;
  description: string;
  index: number;
  job: string;
};

export type JobRequireItem = {
  id: string;
  form_of_work: string[];
  educations: string[];
  industries: string[];
  quantity: number;
  max_salary: number;
  min_salary: number;
  max_experience: number;
  min_experience: number;
  job: string;
  location: string;
};

export type JobItem = {
  id: string;
  company: string;
  company_detail: {
    name: string;
    image: string;
  };
  name: string;
  source_link: string;
  description: string;
  status: string;
  date_created: string;
  date_limited: string;
  descriptions: JobDescItem[];
  require: JobRequireItem;
};

export type JobPaginate = {
  page: number;
  total_page: number;
  count: number | 0;
  next: string | null;
  previous: string | null;
  results: JobItem[];
  status: "Success";
};

export type Categories = {
  industry: { name: string; value: string; slug: string }[];
  location: { name: string; value: string; slug: string; parent_id: string }[];
  formOfWork: { name: string; value: string; slug: string }[];
  jobLevel: { name: string; value: string; slug: string }[];
  education: { name: string; value: string; slug: string }[];
  salary: { name: string; value: string; slug: string }[];
  exprience: { name: string; value: string; slug: string }[];
};