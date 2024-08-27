"use client"
import CandidateList from '@/components/elements/CandidateList'
import Pagination from '@/components/elements/Pagination'
import { Container } from '@/components/layouts/Container'

import Button from '@/components/ui/Button'
import { useGetCandidateListMutation, useGetStudentQuery } from '@/redux/api/apiSlice'
import React, { useEffect, useState } from 'react'
const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.qunsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: null,
  },
]

const Page = () => {
  const [getCandidateList, { data }] = useGetCandidateListMutation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleGetCandidates = async (page:number) => {
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
          <span className='text-sm text-gray-500'>{data?.data.length} entries found</span>
        </div>
        <div>
          <Button bg='solid' >Create new entry</Button>
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
