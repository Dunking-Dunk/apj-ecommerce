import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UseSelector, useDispatch, useSelector } from "react-redux"
import { Container, Title, Row, Btn, TableRow, Item } from './Products'
import Datatable from "../../components/Datatable"
import Loader from "../../components/Loader"
import { deleteOrder } from "../../store/OrderReducer"


const Orders = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const { orders, loading, error } = useSelector((state) => state.Orders)
    
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }

    const ordersColumns =  [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 250 },
        {
          field: "name",
          headerName: "Name",
          width: 200,
        },
        {
          field: "email",
          headerName: "Email",
          width: 200,
          
        },
        {
            field: "price",
            headerName: "Total Price",
            width: 150,
            
      },
      {
        field: "status",
        headerName: "Order Status",
        width: 150,
        
    },
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <TableRow>
              <Item $type='success' to={`/admin/orders/${params.id}`}>View</Item>
               <Item $type='danger' onClick={() => {deleteOrderHandler(params.id)}}>delete</Item>
            </TableRow>
          );
        },
      },
    ];

    const ordersRow = () => {
        return orders.map((order,index) => {
            return {
                sno: index + 1,
                id: order._id,
                name: order.userId.name,
                email: order.shippingInfo.email,
              price: order.totalPrice,
              status: order.orderStatus
            }
        })
    }

  if (loading && !orders) return <Loader />
  else {
    return (
      <Container>
      <Row>
          <Title>
              Orders
          </Title>
  </Row>
  {orders &&   <Datatable column={ordersColumns} row={ordersRow()}/>}
    
  </Container>
  )
  }
 
}

export default Orders