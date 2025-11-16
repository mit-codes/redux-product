import { useState } from 'react'
import Form from './component/Form'
import ProductList from './component/ProductList'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <> 
    
    <Routes>
      <Route element={<Form/>} path='/'></Route>
      <Route element={<ProductList/>} path='/list'></Route>
    </Routes>
    </>
  )
}

export default App
