"use client"
import CandidateList from '@/components/elements/CandidateList'
import Chip from '@/components/elements/Chip'
import DataNotFound from '@/components/elements/DataNotFound'
import FilterCom from '@/components/elements/FilterCom'
import Pagination from '@/components/elements/Pagination'
import { Container } from '@/components/layouts/Container'
import { useGetCandidateListMutation } from '@/redux/api/apiSlice'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const Page = () => {
  const [getCandidateList, { data, isLoading }] = useGetCandidateListMutation();
  const [currentPage, setCurrentPage] = useState<number>(data?.meta?.pagination?.page ? data?.meta?.pagination?.page : 1);
  const [filterQuery, setFilterQuery] = useState<any>([])
  const [empty, isEmpty] = useState(false);

  const handleGetCandidates = async (page: number, filterQuery: any) => {
    try {
      const {data:list} = await getCandidateList({ page, filterQuery, populateQuery: "populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference" });
      isEmpty(list?.data?.length ? false : true)
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
  console.log(data?.meta)
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
            <FilterCom filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
          </PopoverPanel>
        </Popover>
        <div className='ml-10 flex gap-1'>
          {filterQuery.map((item: any, index: any) => (
            <Chip key={index} text={`${item.operatorFields} ${item.operatorName}`} handleRemove={() => handleRemove(item.id)} />
          ))}
        </div>
      </div>
      <div>
        {!empty ? <CandidateList candidate={data?.data} /> : <DataNotFound/>}
      </div>


      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={data?.meta?.pagination
        ?.pageCount} />

    </Container>
  )
}

export default Page
