"use client"
import CandidateList from '@/components/elements/CandidateList'
import FilterCom from '@/components/elements/FilterCom'
import Pagination from '@/components/elements/Pagination'
import { operators } from '@/components/forms/SchemaData'
import { Container } from '@/components/layouts/Container'
import Button from '@/components/ui/Button'
import { useGetCandidateListMutation } from '@/redux/api/apiSlice'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Page = () => {
  const [getCandidateList, { data }] = useGetCandidateListMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false)

  const handleGetCandidates = async (page: number) => {
    try {
      const { data } = await getCandidateList(page);
    } catch (err) {
      console.error('Error fetching candidate list:', err);
    }
  };


  useEffect(() => {
    handleGetCandidates(currentPage)
  }, [currentPage])

  return (
    <Container className='mt-6' >
      <div className='flex justify-between items-center'>

        <div>

          <h2 className='text-2xl font-bold '>Student</h2>

          <span className='text-sm text-gray-500'>{data?.data?.length} entries found</span>

        </div>

        <div>
          <Link href="/form" className='bg-blue-600 px-4 py-2  rounded-md text-white hover:bg-blue-700' >Create new entry</Link>
        </div>

      </div>

      <div className=' my-8'>
        <div className=' relative '>
          <Button bg='solid' size='md' onClick={()=>setOpen(!open)} >Filter</Button>
          {open && <FilterCom />}
        </div>
      </div>

      <div>
        <CandidateList candidate={data?.data} />
      </div>

      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={data?.meta?.pagination
        ?.pageCount} />

    </Container>
  )
}

export default Page
