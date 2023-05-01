import React from 'react'
import { Card } from 'react-bootstrap'

const ShadowedCard = ({children}) => {
  return (
    <Card className='shadow p-3 mb-5 bg-body-tertiary rounded'>
        {children}
    </Card>
  )
}

export default ShadowedCard