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
import { getAllOrders } from "../store/OrderReducer";
import { getAllCustomers } from "../store/CustomerReducer";

const Admin = () => {
    const { user } = useSelector((state) => state.User)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user?.role === "admin") {
          
            dispatch(getAllCustomers())
            dispatch(getAllOrders())
        } 
    }, [user])

    if (user?.role === "admin") { 
        return (
            <Container>
                <Sidebar/>
                <Main>
                <Routes>
                <Route  index element={<Home/>} />
                        <Route path='customers' element={<Customer />} />
                        <Route path='customers/new' element={<NewCustomer />} />
                        <Route path="products" element={<Products />} />
                        <Route path='products/new' element={<NewProduct />} />
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
    flex: 7;
`