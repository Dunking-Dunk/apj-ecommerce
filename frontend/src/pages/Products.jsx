import React from "react";
import Styled from 'styled-components'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from '../components/ProductCard'


const Products = () => {
    const { id } = useParams()
    const { products } = useSelector((state) => state.Products)
    const findProducts = id == 'all' || id === 'new' ? products : products.filter((product) => product.category === id)

    
    return (
        <Container>
            <Title>{id}</Title>
            {findProducts.length === 0 &&  <Para>No items found</Para>}
           
            <ProductsContainer>
                {findProducts.map((product, index) => 
                    <ProductCard product={product} key={index}/>
                )}
            </ProductsContainer>
        </Container>
    )
}

export default Products

const Container = Styled.div`
    padding: 2rem;
`
const Title = Styled.h1`
font-size: 5rem;
text-transform: uppercase;
border-bottom: 0.1rem solid black;
margin-bottom: 2rem;
font-weight: 900;
`
const Para = Styled.p`
font-size: 3rem;
font-weight: 400;
text-transform: uppercase;
`
const ProductsContainer = Styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;

`