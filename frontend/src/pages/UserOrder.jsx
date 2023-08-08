import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder } from "../store/OrderReducer";
import OrderItem from "../components/OrderItem";
import Loader from "../components/Loader";
import {AiOutlineArrowLeft} from 'react-icons/ai'

const UserOrder = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const { order } = useSelector((state) => state.Orders)
    
    useEffect(() => {
        dispatch(getOrder(id))
    }, [])

    if (order && order._id === id) {
        return (<Container>
            <Btn onClick={() => {
                navigate(-1)
            }}/>
            <OrderItem order={order} admin={false}/>
            </Container>
        )
    } else {
        return<Container><Loader/></Container> 
    }
 
}

const Container = styled.div`
    display : flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const Btn = styled(AiOutlineArrowLeft)`
    font-size: 3rem;
    position: absolute;
    left: 10%;
    top: 15%;
    cursor: pointer;
`

export default UserOrder