import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import Styled from 'styled-components'
import { getUserOrder } from '../store/UserReducer'
import Loader from "../components/Loader";
import CartItem from "../components/CartItem";
import { createNotification } from "../store/NotificationReducer";
import { setCartEmpty } from "../store/CartsReducer";
import OrderItem from "../components/OrderItem";

const PaymentRedirect = () => {
    const dispatch = useDispatch()
    const { search } = useLocation();
    const query = new URLSearchParams(search)
    const {order, loading} = useSelector((state) => state.User)
    useEffect(() => {
        dispatch(setCartEmpty())
        dispatch(getUserOrder(query.get('id')))
        dispatch(createNotification({type: 'success', message: 'order has been placed successfully'}))
    }, [])

    if (loading && !order) return <Loader/>
    else {
        return (
            <Container>
                {order &&    <OrderItem admin={false} order={order}/>}
           
                <Btn to='/'>Continue Shopping</Btn>
                <Header>Successfully Placed the Order 🔥🖤</Header>    
            </Container>
        )
    }
}


export const Container = Styled.div`
padding: 2rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const Header = Styled.h3`
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 600;
    
`

const Btn = Styled(Link)`
    padding: 2rem 3rem;
    margin: 5rem;
    background-color: white;
    border: 0.1rem solid green;
    outline: none;
    border-radius:1rem;
    cursor: pointer;
    text-decoration: none;
    color: green;
    font-size: 2rem;
`


export default PaymentRedirect