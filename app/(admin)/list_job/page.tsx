import ListJobPage from './ListJobPage'
import { fetchDefault, validateStatus } from '@/app/libs/utils'

type PageProps = {
  searchParams: { [key: string]: string | undefined }
}

// app/(admin)/list_job/page.tsx
export default async function page({ searchParams }: PageProps) {
  const {page , name, status} = await searchParams
  const initJob = await fetchDefault({url: `${process.env.NEXT_PUBLIC_SERVER_URL}job/many_search/?page=${page || 1}&name=${name || ""}&status=${status || ""}`})
  return (
    <ListJobPage initJob={initJob} nameJob={name || ""} statusJob={validateStatus(status)}/>
  )
}
