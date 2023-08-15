import React, {useEffect} from "react";
import Styled from 'styled-components'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import { getCategory } from "../store/CategoryReducer";


const Products = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const {products} = useSelector((state) => state.Products )
    const { category } = useSelector((state) => state.Categories)

    useEffect(() => {
            dispatch(getCategory(id))
    }, [dispatch, id])

    if (category) {
        return (
            <Container>    
                    <Title>{id === 'all' ? 'all' :category.title}</Title>
                {category.products.length === 0 &&  <Para>No items found</Para>}
               
                <ProductsContainer>
                    {(id === 'all' ? products : category.products).map((product, index) => 
                        <ProductCard product={product} key={index}/>
                    )}
                </ProductsContainer>
            </Container>
        )
    }else return <Loader/>
   
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