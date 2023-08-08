import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UseSelector, useDispatch, useSelector } from "react-redux"
import { Container, Title, Row, Btn, TableRow, Item } from './Products'
import Datatable from "../../components/Datatable"
import { deleteCustomer } from "../../store/CustomerReducer"
import Loader from "../../components/Loader"


const Customer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { customers, loading } = useSelector((state) => state.Customers)
  

    const customersColumns =  [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 200 },
        {
          field: "name",
          headerName: "Name",
          width: 200,
        },
        {
          field: "email",
          headerName: "Email",
          width: 250,
          
        },
        {
            field: "type",
            headerName: "Type",
            width: 250,
            
        },
      {
        field: "action",
        headerName: "Action",
        width: 300,
        renderCell: (params) => {
          return (
            <TableRow>
           
               <Item $type='danger'onClick={() => handleDelete(params.id)}>delete</Item>
            </TableRow>
          );
        },
      },
    ];

    const customersRow = () => {
        return customers.map((customer,index) => {
            return {
                sno: index + 1,
                id: customer._id,
                name: customer.name,
                email: customer.email,
                type: customer.role
            }
        })
    }

    const handleDelete = (id) => {
        dispatch(deleteCustomer(id))
    }
    
  if (loading && !customers) return <Loader />
  else {
    return (
      <Container>
      <Row>
          <Title>
              Customers
          </Title>
          <Btn onClick={() => navigate('/admin/customers/new')}>New Customer</Btn>
  </Row>
  {customers &&   <Datatable column={customersColumns} row={customersRow()}/>}
    
  </Container>
  )
  }

}

export default Customer