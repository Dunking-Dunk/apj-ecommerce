import React from "react";
import Styled from 'styled-components'
import { useParams } from "react-router-dom";
import {  testProducts } from '../dataSet/products'
import ProductCard from '../components/ProductCard'

const Search = () => {
    const { id } = useParams()
    const products = []
    
    return (
        <Container>
            <Title>SEARCH</Title>
            {products.length === 0 &&  <Para>No items found</Para>}
           
            <ProductsContainer>
                {products.map((product, index) => 
                    <ProductCard product={product} key={index}/>
                )}
            </ProductsContainer>
        </Container>
    )
}

export default Search

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
`