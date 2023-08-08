import React, { useEffect, useState} from "react";
import Styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {createNotification} from '../../store/NotificationReducer'
import { getOrder, updateOrder } from "../../store/OrderReducer";
import Loader from "../../components/Loader";

import OrderItem from "../../components/OrderItem";

const Order = () => {
    const {id } = useParams()
    const dispatch = useDispatch()
    const { order, loading, error } = useSelector((state) => state.Orders)
    const { shippingInfo, userId, orderItems, paymentInfo } = order ? order : {}
    const [state, setState] = useState('')

    const orderStatus = ["Processing", "Shipped", "Delivered"]

    useEffect(() => {
        dispatch(getOrder(id))
    }, [])

    useEffect(() => {
        setState(order?.orderStatus)
        dispatch(createNotification({ type: 'failure', message: error }))
    }, [order, error])

    const updateStatus = () => {
        dispatch(updateOrder({id: order._id, status: state}))
    }
    

    if (loading && !order ) return <Loader/>
    else {
        return <OrderItem order={order} setState={setState} updateStatus={updateStatus} state={state} admin={true}/>
    
    }
}


export default Order 