import { fetchDefault } from '@/app/libs/utils';
import JobsPage from './JobsPage'

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;
  const name = params.name ?? "";
  const industry = params.industry ?? "";
  const location = params.location ?? "";
  const jobs = await fetchDefault({url: `${process.env.NEXT_PUBLIC_SERVER_URL}job/many_search/?name=${name}&industry=${industry}&location=${location}`})
  return (
    <JobsPage jobPaginate={jobs}/>
  )
}
