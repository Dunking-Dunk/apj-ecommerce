import React from "react";
import Styled from 'styled-components'
import {  useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/CartsReducer";
import Loader from "./Loader";

const CartItem = ({ cart, addTo }) => {
    const dispatch = useDispatch()
 
    if (cart) {
        return (    
            <Container>
                <DetailContainer>
                    <Image src={cart.image} $addTo={addTo} />
                    <Detail>
                        <Title  $addTo={addTo}>{cart.name}</Title>
                        <Price>RS {cart.price.toFixed(2)}</Price>
                    </Detail>
                </DetailContainer>
                <QuantityContainer>
                    <Text>{cart.quantity} - Qty</Text>
                    <Price>RS {(cart.price * cart.quantity).toFixed(2)}  </Price>
                    {addTo && (
                         <CartBtn>
                            <Btn onClick={() => {
                                dispatch(removeFromCart(cart.id))
                            }}>-</Btn>
                         <Qty>{cart.quantity}</Qty>
                            <Btn onClick={() => {
                                dispatch(addToCart(cart))
                            }} disabled={cart.quantity >= cart.stock}>+</Btn>
                     </CartBtn>
                    )}
                   
                </QuantityContainer>
            </Container>
        )
    } else {
    return <Loader/>
    }
  
}
export default CartItem

const Container = Styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5rem;
    @media (max-width: 600px) {
        flex-direction: column;
    }
`
const DetailContainer = Styled.div`
    display: flex;
    gap: 2rem;
`

const Image = Styled.img`
        width: ${props => props.$addTo ? '25rem': '10rem'};
    height: ${props => props.$addTo ? '30rem': '15rem'};
    border-radius: 2rem;
    object-fit: contain;
`

const Detail = Styled.div`
 display: flex;
 flex-direction: column;
 gap: 2rem;
`

const Title = Styled.h1`
    font-size: ${props => props.$addTo ? '3rem': '2rem'};
    text-transform: uppercase;
`
const Text = Styled.h3`
      font-size: 1.5rem;
    font-weight: 400;
`

const Price = Styled.p`
font-size: 2rem;
    color: rgba(0,0,0,0.3);
    border-bottom: 0.1rem solid black;
`

const QuantityContainer = Styled.div`
 display: flex;
 flex-direction: column;
 gap: 2rem;
 margin-right: 10rem;
 `

const CartBtn = Styled.div`
    width: 20rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 5rem;
    border: 0.1rem solid black;
`

const Btn = Styled.button`
width: 100%;
height: 100%;
cursor: pointer;
outline: none;
background-color: transparent;
border: none;
font-size: 2rem;
transition: 0.35s ease;
&:hover {
    background-color:rgba(0,0,0,0.5)
    
}
`
const Qty = Styled.p`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
font-weight: 900;
`
