import React, { useRef } from "react";
import Styled from 'styled-components'
import CartItem from "../components/CartItem"
import { useSelector } from "react-redux";
import { setCartEmpty } from "../store/CartsReducer";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import api from '../store/api'
import { loadStripe } from "@stripe/stripe-js";


const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { carts, subTotal } = useSelector((state) => state.Carts)
    const { user } = useSelector((state) => state.User)
    
    const stripePromise = loadStripe(
        "pk_test_51MHrouSJwd69bSzn07Sm8oY8OOyMIxi1MFv102by3ouCwcrGTaUGpUzfzfOE9HWRispJVVCA8CXaxyX0tb8j4OTp00jc7hUQ6J"
    );
    
    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            const res = await api.post('/payment/create-checkout-session', { carts, subTotal })
            await stripe.redirectToCheckout({
                    sessionId: res.data.sessionId,
            })
        } catch (err) {
            console.log(err)
        }    
    }

    const clearCart = () => {
        dispatch(setCartEmpty())
    }

    return (<Container>
        <Row>
            <Title>Shopping Cart</Title>
            <ClearBtn onClick={clearCart}>Clear cart</ClearBtn>
        </Row>
        
        {carts.length > 0 ? (
            <>
<CartContainer>
     {carts.map((cart, index) => <CartItem cart={cart} key={index} addTo={true}/>)}
 </CartContainer>
 <TotalContainer>
                <Price><Span>SubTOTAL</Span>RS {subTotal.toFixed(2)}</Price>
                    <Disclaimer>Taxes and shipping calculated at checkout</Disclaimer>
                    
                    {user ?   <CheckOut onClick={handleCheckout}>CheckOut</CheckOut>: <CheckOut onClick={() => navigate('/account/login')}>Login to Checkout</CheckOut>}
 </TotalContainer>
            </>

        ): (<Para>No Item in cart</Para>)}
       
    </Container>)
}

export default Cart;

const Container = Styled.div`
    padding: 2rem;
`

const Row = Styled.div`
    display: flex;
    align-items: center;
    border-bottom: 0.1rem solid black;
    margin-bottom:5rem;
    justify-content: space-between;
`

const Title = Styled.h1`
    text-transform: uppercase;
    font-size: 6rem;
    font-weight: 900;
`
const ClearBtn = Styled.button`
    padding: 1rem 3rem;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 1rem;
    outline: none;
    background-color:white;
    border: 0.1rem dotted red;
`

const Para = Styled.p`
    font-size: 3rem;
    font-weight: 600;
    text-transform: uppercase;
`

const CartContainer = Styled.div`
display: flex;
flex-direction: column;
gap: 5rem;
border-bottom: 0.1rem solid rgba(0,0,0,0.2);
padding-bottom: 2rem;
`

const TotalContainer = Styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
justify-content: flex-end;
margin-top: 3rem;

`

const Price = Styled.h3`
font-size: 3rem;
font-weight: 200;
margin-bottom: 2rem;
`
const Span = Styled.span`
font-size: 3rem;
font-weight: 500;
margin-right: 2rem;
    text-transform: uppercase;
`

const Disclaimer = Styled.p`
font-size: 1.5rem;
font-weight: 400;
color: rgba(0,0,0,0.5);
margin-bottom: 3rem;
`

const CheckOut = Styled.button`
width: 30rem;
height: 5rem;
cursor: pointer;
font-size: 1.5rem;
text-transform: uppercase;
border-radius: 2rem;
transition: 0.35s ease;

&:hover {
    transform: translateY(-10px);

}
`
