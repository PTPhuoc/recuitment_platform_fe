export type JobDescItemShow = {
  id: string;
  title: string;
  description: string;
  index: number;
  job: string;
};

export type JobDescItemEdit = {
  id: string;
  job: string;
  title: string;
  description: Record<string, any>;
  index: number;
};

export type JobRequireItemShow = {
  id: string;
  form_of_work: string[];
  educations: string[];
  industries: string[];
  quantity: number;
  job_level: string[];
  max_salary: number;
  min_salary: number;
  max_experience: number;
  min_experience: number;
  job: string;
  location: string;
};

export type JobRequireItemEdit = {
  id: string;
  job: string;
  location: string;
  quantity: number | undefined;
  form_of_work: string[];
  educations: string[];
  industries: string[];
  job_level: string[];
  min_salary: number | undefined;
  max_salary: number | undefined;
  min_experience: number | undefined;
  max_experience: number | undefined;
};

export type JobItemShow = {
  id: string;
  company: string;
  company_detail: {
    name: string;
    image: string;
  };
  name: string;
  source_link: string;
  description: string;
  status: "pending" | "active" | "ban" | string;
  date_limited: Date | string | "";
  date_created: Date | string | "";
  descriptions: JobDescItemShow[];
  require: JobRequireItemShow;
};

export type JobItemEdit = {
  id: string;
  company: string;
  company_detail: {
    name: string;
    image: string;
  };
  name: string;
  source_link: string;
  description: Record<string, any>;
  status: "pending" | "active" | "ban" | string;
  date_limited: Date | string | "";
  date_created: Date | string | "";
  descriptions: JobDescItemEdit[];
  require: JobRequireItemEdit;
};

export type JobPaginate = {
  page: number;
  total_page: number;
  count: number | 0;
  next: string | null;
  previous: string | null;
  results: JobItemShow[];
  status: "Success";
};

export type CompanyItemShow = {
  id: string;
  name: string;
  slug: string;
  trading_name: string;
  website_url: string;
  logo_public_id: string;
  logo_url: string;
  cover_public_id: string;
  cover_url: string;
  company_size: string;
  description: string;
  email_domain: string;
  is_claimed: boolean;
  is_verified: boolean;
  date_created: string;
  industries: string[];
  locations: string[];
};

export type CompanyPaginate = {
  page: number;
  total_page: number;
  count: number | 0;
  next: string | null;
  previous: string | null;
  results: CompanyItemShow[];
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
