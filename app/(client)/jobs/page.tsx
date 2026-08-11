import { fetchDefault } from '@/app/libs/utils';
import JobsPage from './JobsPage'

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;
  const name = params.name ?? "";
  const industries = params.industries ?? "";
  const locations = params.locations ?? "";
  const jobs = await fetchDefault({url: `${process.env.NEXT_PUBLIC_SERVER_URL}job/many_search/?name=${name}&industries=${industries}&locations=${locations}`})
  return (
    <JobsPage jobPaginate={jobs}/>
  )
}
