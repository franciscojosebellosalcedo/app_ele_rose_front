import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../constants/constants'
import Login from '../pages/login/Login'
import LoginGuard from '../guards/LoginGuard'
import AuthGuard from '../guards/AuthGuard';
import Layaut from '../components/layaut/Layaut'
import Users from '../pages/dashboard/users/Users'
import Categories from '../pages/dashboard/categories/index/Categories'
import Products from '../pages/dashboard/products/index/Products'
import ProductsNews from '../pages/dashboard/newProducts/ProductsNews'
import CreateNewCategory from '../pages/dashboard/categories/createCategory/CreateCategory'
import EditCategory from '../pages/dashboard/categories/editCategory/EditCategory';
import CreateProduct from '../pages/dashboard/products/createProduct/CreateProduct'
import Slider from '../pages/dashboard/slider/Slider'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.NOT_FOUND} element={<div>Parece que estás perdido</div>}></Route>

        <Route element={<LoginGuard />}>
          <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        </Route>

        <Route element={<AuthGuard />}>
          <Route path={ROUTES.DASHBOARD} element={<Layaut />}>

            <Route path={ROUTES.CATEGORIES} element={<Categories />}></Route>

            <Route path={`${ROUTES.CATEGORIES}/${ROUTES.CREATE_CATEGORY}`} element={<CreateNewCategory />}></Route>

            <Route path={`${ROUTES.CATEGORIES}/${ROUTES.EDIT_CATEGORY}/:id`} element={<EditCategory/>}></Route>

            <Route path={ROUTES.PRODUCTS} element={<Products />}></Route>

            <Route path={`${ROUTES.PRODUCTS}/${ROUTES.CREATE_PRODUCT}`} element={<CreateProduct />}></Route>

            <Route path={ROUTES.SLIDER} element={<Slider />}></Route>

            <Route path={ROUTES.USERS} element={<Users />}></Route>

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default Routers