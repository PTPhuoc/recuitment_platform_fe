import ListJobPage from './ListJobPage'
import { fetchDefault } from '@/app/libs/utils'

export default async function page() {
  const jobs = await fetchDefault({url: `${process.env.NEXT_PUBLIC_SERVER_URL}job/many_search/`})
  return (
    <ListJobPage jobs={jobs}/>
  )
}
