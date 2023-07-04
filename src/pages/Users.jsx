import Layout from 'Layout'
import React from 'react'
import UsersData from 'views/users'
import { useNavigate } from 'react-router-dom'

function Users() {
  


  return (
    <Layout>
      <UsersData />
    </Layout>
  )
}

export default Users