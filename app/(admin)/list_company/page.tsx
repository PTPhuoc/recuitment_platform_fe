import { fetchDefault } from '@/app/libs/utils'
import ListCompanyPage from './ListCompanyPage'

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

// app/(admin)/list_company/page.tsx
export default async function page({ searchParams }: PageProps) {
  const {page , name} = await searchParams
  const initCompany = await fetchDefault({url: `${process.env.NEXT_PUBLIC_SERVER_URL}company/many_search/?page=${page || 1}&name=${name || ""}`})
  return (
    <ListCompanyPage initCompany={initCompany}/>
  )
}
