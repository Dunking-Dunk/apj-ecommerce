import React from "react";
import Styled from 'styled-components'
import moment from 'moment'
import CartItem from './CartItem'
import {Stepper,Step, StepLabel } from '@mui/material'

const OrderItem = ({ order,admin, setState, updateStatus, state }) => {
    const { shippingInfo, userId, orderItems, paymentInfo } = order ? order : {}
    const orderStatus = ["Processing", "Shipped", "Delivered"]

    return (
        <Container>
        <Wrapper>
            <DetailContainer>
                <Title>User Detail</Title>
                <Row>
                    <Header>Name</Header>
                    <Text>{userId?.name}</Text>
                </Row>
                <Row>
                    <Header>Email</Header>
                    <Text>{userId?.email}</Text>
                </Row>
                <Row>
                    <Header>Phone number</Header>
                    <Text>{shippingInfo?.phoneNo}</Text>
                </Row>
                <Title>Shipping Detail</Title>
                <Row>
                    <Header>Address</Header>
                    <Text>{shippingInfo?.address}</Text>
                </Row>
                <Row>
                    <Header>city</Header>
                    <Text>{shippingInfo?.city}</Text>
                </Row>
                <Row>
                    <Header>state</Header>
                    <Text>{shippingInfo?.state}</Text>
                </Row>
                <Row>
                    <Header>country</Header>
                    <Text>{shippingInfo?.country}</Text>
                </Row>
                <Row>
                    <Header>pincode</Header>
                    <Text>{shippingInfo?.pinCode}</Text>
                    </Row>
                    {admin && (
                        <>
                                   <Title>other detail</Title>
                <Row>
                    <Header>Order Status</Header>
                    <Text>{order?.orderStatus}</Text>
                </Row>
                <Row>
                    <Header>Customer Id</Header>
                    <Text>{order?.customerId}</Text>
                </Row>
                <Row>
                    <Header>STRIPE Id</Header>
                    <Text>{paymentInfo?.id}</Text>
                </Row>
                <Row>
                    <Header>paid at</Header>
                    <Text>{moment(order?.paidAt).format('MMMM Do YYYY , h:mm:ss a')}</Text>
                </Row>
                        </>
             
                    )}
                
</DetailContainer>
<CartContainer>
                {orderItems?.map((order) => {
                    return <CartItem cart={order} addTo={false} key={order._id} />
                })}
                <SubCartContainer>
                <Title>Price Details</Title>
                <Row>
                    <Header>items price</Header>
                    <Text>Rs {order?.itemsPrice}</Text>
                </Row>
                <Row>
                    <Header>tax price</Header>
                    <Text>Rs {order?.taxPrice}</Text>
                </Row>
                <Row>
                    <Header>shipping price</Header>
                    <Text>Rs {order?.shippingPrice}</Text>
                </Row>
                <Row>
                    <Header>total price</Header>
                    <Text>Rs {order?.totalPrice}</Text>
                </Row>
                </SubCartContainer>
                 
</CartContainer>
        </Wrapper>
        <StatusContainer>
        <Title>Order Status</Title>
        <Stepper activeStep={ orderStatus.findIndex((status) => status === state ? state: order?.orderStatus )}>
        {orderStatus.map((label) => (
            <Step key={label} >
                < StepLabel style={{ cursor: 'pointer' }} onClick={() => {
                    if (setState && admin) {
                        setState && setState(label)
                    }
            }}>{label}</ StepLabel>
          </Step>
        ))}
                </Stepper>
                {admin &&updateStatus && <Btn onClick={updateStatus}>Update Status</Btn>}
           
    </StatusContainer>
    
    </Container>
    )
}
export default OrderItem;

export const Container = Styled.div`
padding: 2rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
export const Wrapper = Styled.div`
width: 100%;
height: 100%;
    display: flex;
    flex-direction: row;
    gap: 5rem;
`

export const DetailContainer = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
`

export const Title = Styled.h1`
    font-size: 3rem;
    text-transform: uppercase;
    font-weight: 600;
    margin: 2rem 0rem;
`
export const Row = Styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    border-bottom: 0.1rem solid black;
    padding: 0.5rem;
    gap: 2rem;
`

export const Header = Styled.h3`
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 600;
    
`

export const Text = Styled.p`
font-size: 1.5rem;
    font-weight: 400;
    text-align: left;
`


export const CartContainer = Styled.div`
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-top: 10rem;
`

export const SubCartContainer = Styled.div`
 justify-content: flex-end;
    flex: 2;
      display: flex;
      flex-direction: column;
   gap: 2rem;`

export const StatusContainer = Styled.div`
display: flex;
flex-direction: column;
gap: 2rem;
padding: 5rem;
width: 100%;
`

export const Btn = Styled.button`
    text-transform: uppercase;
    padding: 1rem 2rem;
    width: 20rem;
    border-radius:1rem;
    outline: none;
    border: 0.1rem dotted green;
    cursor: pointer;
    align-self: center;
`
