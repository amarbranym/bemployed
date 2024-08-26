import BranymForm from '@/components/forms/BranymForm'
import { Container } from '@/components/layouts/Container'
import React from 'react'

const page = ({ params }: any) => {
  return (
    <Container >
      <div className='py-10'>
        <BranymForm slug={params.id} />
      </div>
    </Container>
  )
}

export default page
