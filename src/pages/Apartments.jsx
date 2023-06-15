import Layout from 'Layout'
import React from 'react'
import ApartmentsDashbaord from 'views/apartments'

function Apartments() {
  return (
    <Layout children={<ApartmentsDashbaord/>}/>
  )
}

export default Apartments