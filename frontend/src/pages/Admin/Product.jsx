import React, { useEffect } from "react";
import styled from "styled-components";
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getProduct } from "../../store/ProductReducer";
import Loader from '../../components/Loader'
import Carousel from "../../components/Carousel";
import { ImageContainer, DetailContainer, Row, Title, Text, Header, InStock, Category, About, List, Price } from '../Product'

const Product = () => {
    const {id } = useParams()
    const dispatch = useDispatch()
    const {product, loading} = useSelector((state) => state.Products)
    useEffect(() => {
        dispatch(getProduct(id))
    }, [])

    if (product) {
        return (
            <Container>
            <ImageContainer>
                <Carousel products={product.images} productPage={true}/>
            </ImageContainer>
            <DetailContainer>
                <Title>{product.name}</Title>
                        <Category>{product.category}</Category>
                <Row>
                            <Header>Color</Header>
                            <Text>{product.color}</Text>
                </Row>
                <About>
                        <Header>About this item:</Header>
                        {product.description.split('/').map((line, index) => 
                       <List key={index}>{line}</List> )}
                </About>
                <Row>
                    <Header>Stock:</Header>
                    <InStock $stock={product.stock > 0} />
                </Row>
                <Row>
                    <Price>Rs {product.price.toFixed(2)}</Price>
                </Row>
            </DetailContainer>
                </Container>
        )
    }else  return <Loader/>
 
}

const Container = styled.div`
   width:100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: row;
    gap: 2rem;
`

export default Product