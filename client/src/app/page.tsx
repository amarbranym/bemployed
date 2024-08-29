"use client"
import CandidateList from '@/components/elements/CandidateList'
import Chip from '@/components/elements/Chip'
import DataNotFound from '@/components/elements/DataNotFound'
import FilterCom from '@/components/elements/FilterCom'
import Pagination from '@/components/elements/Pagination'
import { Container } from '@/components/layouts/Container'
import Button from '@/components/ui/Button'
import { useGetCandidateListMutation } from '@/redux/api/apiSlice'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Page = () => {
  const [getCandidateList, { data, isLoading }] = useGetCandidateListMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false)
  const [filterQuery, setFilterQuery] = useState<any>([])
  const handleGetCandidates = async (page: number, filterQuery: any) => {
    try {
      const { data } = await getCandidateList({ page, filterQuery });
    } catch (err) {
      console.error('Error fetching candidate list:', err);
    }
  };


  useEffect(() => {
    handleGetCandidates(currentPage, filterQuery)
  }, [currentPage, filterQuery])

  const handleRemove = (id: string) => {
    setFilterQuery((prevFilterQuery: any) =>
      prevFilterQuery.filter((item: any) => item.id !== id)
    );
  };

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

      <div className=' my-8 flex  '>
        <Popover className=" relative">
          <PopoverButton className=" px-4 py-2 bg-white border rounded-md">Filter</PopoverButton>
          <PopoverPanel anchor="bottom" className=" w-[250px] mt-2 ml-[5.5rem] border p-2 bg-white rounded-md  " >
            <FilterCom open={open} setOpen={setOpen} filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
          </PopoverPanel>
        </Popover>
        <div className='ml-10 flex gap-1'>
          {filterQuery.map((item: any, index: any) => (
            <Chip key={index} text={`${item.operatorFields} ${item.operator}`} handleRemove={() => handleRemove(item.id)} />
          ))}
        </div>
      </div>
      {
        isLoading ? <div className='loader'></div> : <div>
          {data?.data?.length > 0 ? <CandidateList candidate={data?.data} /> : <DataNotFound />}
        </div>
      }


      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={data?.meta?.pagination
        ?.pageCount} />

    </Container>
  )
}

export default Page
