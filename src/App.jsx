import { useState } from 'react'
import Form from './component/form'
import ProductList from './component/ProductList'
import ProductDetail from './component/ProductDetail'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <> 
    
    <Routes>
      <Route element={<Form/>} path='/'></Route>
      <Route element={<ProductList/>} path='/list'></Route>
      <Route element={<ProductDetail/>} path='/detail/:id'></Route>
    </Routes>
    </>
  )
}

export default App
