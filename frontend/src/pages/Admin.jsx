import React, {useEffect} from "react";
import Styled from 'styled-components'
import { Routes, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "../components/Sidebar";
import Home from "./Admin/Home";
import Products from "./Admin/Products";
import Customer from "./Admin/Customer";
import NewCustomer from './Admin/NewCustomer'
import NewProduct from "./Admin/NewProduct";
import UpdateProduct from "./Admin/UpdateProduct";
import Orders from './Admin/Orders'
import Order from "./Admin/Order";
import Product from "./Admin/Product";
import Billboard from "./Admin/Billboard";
import { getAllOrders } from "../store/OrderReducer";
import { getAllCustomers } from "../store/CustomerReducer";
import { getQuickStats } from "../store/AdminReducer";
import Categories from "./Admin/Categories";

const Admin = () => {
    const { user } = useSelector((state) => state.User)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.role === "admin") {
            dispatch(getAllCustomers())
            dispatch(getAllOrders())
            dispatch(getQuickStats())
        } 
    }, [user, dispatch])

    if (user?.role === "admin") { 
        return (
            <Container>
                <Sidebar/>
                <Main>
                <Routes>
                <Route  index element={<Home/>} />
                        <Route path='customers' element={<Customer />} />
                        <Route path="products" element={<Products />} />
                        <Route path='customers/new' element={<NewCustomer />} />
                        <Route path="products/:id" element={<Product />} />
                        <Route path='products/new' element={<NewProduct />} />
                        <Route path="category" element={<Categories />} />
                        <Route path='/billboards' element={<Billboard/>} />
                        <Route path='products/update/:id' element={<UpdateProduct />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="orders/:id" element={<Order/>} />
              </Routes>
                </Main>
         
            </Container>
        )
    } else {
        return <h1>You don't have the right authorization</h1>
    }
 
}

export default Admin;

const Container = Styled.div`
    display: flex;
`

const Main = Styled.div`
    flex: 8;
    overflow: hidden;
`