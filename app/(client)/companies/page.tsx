import React from 'react'
import CompaniesPage from './CompaniesPage'
import { fetchDefault } from '@/app/libs/utils'

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// app/(client)/companies/page.tsx
export default async function page({ searchParams }: PageProps) {
  const params = await searchParams
  const name = params.name?.toString() ?? ""
  const location = params.location?.toString() ?? ""
  const industry = params.industry?.toString() ?? ""
  const initCompanies = await fetchDefault({url: `${process.env.NEXT_PUBLIC_SERVER_URL}company/many_search/?name=${name}`})
  return (
    <CompaniesPage name={name} location={location} industry={industry} companyPaginate={initCompanies}/>
  )
}
