import React from "react"
import Styled from 'styled-components'
import Datatable from "../../components/Datatable"
import { useNavigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteProduct } from "../../store/ProductReducer"
import Loader from '../../components/Loader'

const Product = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const {products, loading} = useSelector((state) => state.Products)

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  } 
  
    const productsColumns =  [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 200 },
        {
          field: "name",
          headerName: "Name",
          width: 250,
        },
        {
          field: "category",
          headerName: "Number Categories",
          width: 150,
          
      },
      {
        field: "color",
        headerName: "Color",
        width: 150,
    },
      {
        field: "price",
        headerName: "Price",
        width: 150,
      },
      {
        field: "stock",
        headerName: "Stock",
        width: 100,
      },
  
      {
        field: "action",
        headerName: "Action",
        width: 300,
        renderCell: (params) => {
          return (
            <TableRow>
                        <Item $type='success' to={`/admin/products/${params.id}`}>View</Item>
              <Item $type='success' to={`/admin/products/update/${params.id}`}>update</Item>
               <Item $type='danger'onClick={() => handleDelete(params.id)}>delete</Item>
            </TableRow>
          );
        },
      },
    ];
    const productsRow = () => {
      return products.map((product, i) => {
          console.log(product)
          return {
            sno: i + 1,
            id: product._id,
            name: product.name,
            category: product.category.length,
            price: product.price.toFixed(2),
            stock: product.stock,
            color: product.color
          }
        })
      }

  if (loading) return <Loader />
  else {
    return (
      <Container>
          <Row>
              <Title>
                  Products
              </Title>
              <Btn onClick={() => navigate('/admin/products/new')}>New Product</Btn>
      </Row>
      {products &&   <Datatable column={productsColumns} row={productsRow()}/>}
        
      </Container>
  )
  }

}

export default Product

export const Container = Styled.div`
padding: 2rem;
`

export const Row = Styled.div`
    display: flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom: 3rem;
    border-bottom: 0.1rem solid rgba(0,0,0,0.5);
`

export const Title = Styled.h1`
    font-size: 4rem;
    font-weight: 700;
    text-transform: uppercase;
`

export const Btn = Styled.button`
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    border: 0.1rem dotted green;
    color: black;
    background-color:white;
    cursor: pointer;
`

export const TableRow = Styled.div`
    display: flex;
    align-items:center;
    justify-content:space-between;
        gap: 1rem;
`

export const Item = Styled(Link)`
  padding: 1rem 2rem;
 font-size: 1rem;
 text-transform: uppercase;
 text-decoration: none;
 color: black;
  border: 0.1rem dotted ${props => props.$type === 'success' ? 'green': 'red'};
  border-radius: 1rem;
  z-index: 2;
`