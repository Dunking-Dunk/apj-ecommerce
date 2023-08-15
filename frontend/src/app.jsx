import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Header from "./components/Header";
import Footer from './components/Footer'
import Product from "./pages/Product";
import Cart from './pages/Cart'
import Account from "./pages/Account";
import Register from './pages/Register'
import Login from "./pages/Login"
import Admin from "./pages/Admin";
import Search from "./pages/Search";
import Notification from "./components/Notification";
import ScrollToTop from "./components/ScrollToTop";
import { getUser, getUserOrders } from "./store/UserReducer";
import { getAllProducts } from "./store/ProductReducer";
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PaymentRedirect from "./pages/PaymentRedirect";
import UserOrder from "./pages/UserOrder";
import { getAllCategory } from "./store/CategoryReducer";
import { getAllBillboard } from "./store/BillboardReducer";


gsap.registerPlugin(ScrollTrigger)

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
        dispatch(getAllProducts())
        dispatch(getAllCategory())
        dispatch(getAllBillboard())
    },[dispatch])

    return (
        <BrowserRouter>
            <Header />
            <Notification />
            <ScrollToTop >
            <Routes>       
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/account/order/:id" element={<UserOrder />} />
                <Route path="/account/register" element={<Register />} />
                <Route path="/account/login" element={<Login />} />
                <Route path="/admin/*" element={<Admin />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/success" element={<PaymentRedirect/>} />
            </Routes>
            </ScrollToTop>
  
            <Footer/>
        </BrowserRouter>
)
}

export default App