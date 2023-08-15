import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Styled from 'styled-components'
import { logoutUser } from '../store/UserReducer'
import { getUserOrders } from "../store/UserReducer";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'
import CartItem from "../components/CartItem";
import Loader from "../components/Loader";


const Account = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isAuthenticated , user, orders} = useSelector((state) => state.User)

    useEffect(() => {
        if (!isAuthenticated) navigate('/account/login')
        if (isAuthenticated && !orders ){
            dispatch(getUserOrders())
        }
       
    }, [isAuthenticated])

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/')
    }
    
    if (isAuthenticated && user ) {
        return (
            <Container>
                <Title>User Account</Title>
                <Row>
                    <Text>{user.name}</Text>
                    <Btn onClick={handleLogout}>Logout</Btn>
                </Row>
                <Row>
                <Text>{user.email}</Text>
                 {user.role === 'admin' &&
                     <Btn onClick={() => {
                         navigate('/admin')
                     }}>Admin</Btn>
                 } 
                </Row>
                <OrdersContainer>
                    <Title>Orders</Title>
                    {orders?.map((order) => {
                        return (
                            <OrderContainer>
                                {order.orderItems.map((order, index) => {
                                    return <CartItem cart={order} addTo={false} key={index} />
                                })}
                                    <Row>
                                    <Header>Ordered AT</Header>
                                    <Text>{moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                                </Row>
                                <Row>
                                    <Header>total price</Header>
                                    <Text>Rs {order.totalPrice.toFixed(2)}</Text>
                                </Row>
                                <ViewBtn to={`/account/order/${order?._id}`}>View Order</ViewBtn>
                            </OrderContainer>
                        )
                    })}
                 </OrdersContainer>
                  
            </Container>
        )
    }else return <Loader/>
}

export default Account

const Container = Styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`
const Row = Styled.div`
width: 100%;
display: flex;
justify-content: space-between;
border-bottom: 0.1rem solid black;
`
const Title = Styled.h1`
    font-size: 5rem;
    font-weight: 500;   
    text-transform:uppercase;
`

const Btn = Styled.button`
    padding: 1rem 3rem;
    border: .1rem solid red;
    border-radius: 1rem;
    outline: none;
    background-color: white;
    cursor: pointer;
`

const Text = Styled.h3`
    font-size: 2rem;
    font-weight: 400;
`

const Header = Styled.h3`
    font-size: 1.5rem;
    font-weight:500;
    text-transform: uppercase;
`

const OrdersContainer = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
  
`
const OrderContainer = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem;
    border: 0.1rem solid black;
    border-radius: 1rem;
`
const ViewBtn = Styled(Link)`
    padding: 2rem 3rem;
    background-color: white;
    text-transform: uppercase;
    border: 0.1rem solid green;
    color: green;
    text-decoration: none;
    border-radius: 1rem;
`