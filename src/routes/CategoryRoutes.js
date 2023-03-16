import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CategoryManagement from '../pages/ManagementPages/CategoryManagement'
import UpdateForm from '../pages/ManagementPages/CategoryManagement/UpdateForm'

const CategoriesRoutes = () => {
  return (
    <Routes>
        {/* <Route index element={<CategoryManagement />}/>
        <Route path=":id" element={<UpdateForm />}/>
        <Route path="new" element={<UpdateForm />}/> */}
    </Routes>
  )
}

export default CategoriesRoutes