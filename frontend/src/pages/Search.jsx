import React from "react";
import Styled from 'styled-components'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from '../components/ProductCard'
import Loader from "../components/Loader";

const Search = () => {
    const { category, loading} = useSelector((state) => state.Products) 

    if (!loading) {
        return (
            <Container>
                <Title>SEARCH</Title>
                {category.length === 0 &&  <Para>No items found</Para>}
               
                <ProductsContainer>
                    {category.map((product, index) => 
                        <ProductCard product={product} key={index}/>
                    )}
                </ProductsContainer>
            </Container>
        )
    }else return <Loader/>

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