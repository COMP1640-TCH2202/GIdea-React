import React from 'react'
import { Card } from 'react-bootstrap'

const NoEventCard = () => {
  return (
    <Card body className='my-3'>
        <Card.Text className='text-muted text-center fs-5'>
          The system is currently not accepting submissions.
        </Card.Text>
        <Card.Text className='text-muted text-center fst-italic'>
          Contact your admistrator for more information.
        </Card.Text>
    </Card>
  )
}

export default NoEventCard