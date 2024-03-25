import React from 'react'
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'
import { ROUTES } from '../constants/constants'
import Login from '../pages/login/Login'
import LoginGuard from '../guards/LoginGuard'
import AuthGuard from '../guards/AuthGuard';
import Layaut from '../components/layaut/Layaut'
import Users from '../pages/dashboard/users/index/Users'
import Categories from '../pages/dashboard/categories/index/Categories'
import Products from '../pages/dashboard/products/index/Products'
import CreateNewCategory from '../pages/dashboard/categories/createCategory/CreateCategory'
import EditCategory from '../pages/dashboard/categories/editCategory/EditCategory';
import CreateProduct from '../pages/dashboard/products/createProduct/CreateProduct'
import Slider from '../pages/dashboard/slider/index/Slider'
import Collections from '../pages/dashboard/collections/index/Collections'
import CreateCollection from '../pages/dashboard/collections/createCollection/CreateCollection'
import EditCollection from '../pages/dashboard/collections/editCollection/EditCollection'
import AddItemSlider from '../pages/dashboard/slider/addItemSlider/AddItemSlider'
import ProdNoCat from '../pages/dashboard/products/prodNoCat/ProdNoCat'
import Orders from '../pages/dashboard/orders/index/Orders'
import OrderDetails from '../pages/dashboard/orders/orderDetails/OrderDetails'
import Clients from '../pages/dashboard/clients/index/Clients'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.NOT_FOUND} element={<Navigate to={`/${ROUTES.DASHBOARD}/${ROUTES.CATEGORIES}`}/>}>
        </Route>

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

            <Route path={`${ROUTES.PRODUCTS}/${ROUTES.NO_CATEGORIES_PRODUCTS}`} element={<ProdNoCat />}></Route>

            <Route path={ROUTES.COLLECTIONS} element={<Collections />}></Route>

            <Route path={`${ROUTES.COLLECTIONS}/${ROUTES.CREATE_COLLECTION}`} element={<CreateCollection />}></Route>

            <Route path={`${ROUTES.COLLECTIONS}/${ROUTES.EDIT_COLLECTION}/:id`} element={<EditCollection/>}></Route>

            <Route path={ROUTES.SLIDER} element={<Slider />}></Route>

            <Route path={`${ROUTES.SLIDER}/${ROUTES.ADD_ELEMENT_SLIDER}`} element={<AddItemSlider />}></Route>

            <Route path={`${ROUTES.ORDER}`} element={<Orders />}></Route>
            
            <Route path={`${ROUTES.ORDER}/${ROUTES.ORDER_DETAILS}/:id`} element={<OrderDetails />}></Route>

            <Route path={ROUTES.CLIENTS} element={<Clients />}></Route>

            <Route path={ROUTES.USERS} element={<Users />}></Route>

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default Routers