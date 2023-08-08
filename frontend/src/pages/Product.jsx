import React, { useEffect } from "react";
import Styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/CartsReducer";
import { createNotification} from '../store/NotificationReducer';
import Carousel from "../components/Carousel";
import Marque from '../components/Marque'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import { getProduct } from "../store/ProductReducer";

const Product = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { product, products } = useSelector((state) => state.Products)
    const { carts } = useSelector((state) => state.Carts)
    const cart = carts.find(c => c.id === product?._id )
    const similar = products.filter(item => item.category === product?.category)

    useEffect(() => {
        dispatch(getProduct(id))
    }, [])

    const handleCart = () => {
        dispatch(addToCart({ id: product._id, quantity: 1, price: product.price, name: product.name, image: product.images[0]?.url, stock: product.stock}))
        dispatch(createNotification({ type: 'success', message: 'product added to the cart' }))
    }
    if (product) {
        return (
            <Wrapper>
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
                        {product.description.split('<br>').map((line, index) => 
                       <List key={index}>{line}</List> )}
                </About>
                <Row>
                    <Header>Stock:</Header>
                    <InStock $stock={product.stock > 0} />
                </Row>
                <Row>
                    <Price>Rs {product.price.toFixed(2)}</Price>
                </Row>
              
                        <Btn disabled={cart?.quantity >= product.stock} onClick={handleCart}>{cart?.quantity >= product.stock? 'out of stock': 'add to cart'}</Btn>
            </DetailContainer>
                </Container>
                <Marque title='You may also like' emoji='😍🔥' />
                <SimilarContainer>
                    {similar.map((product, index) => <ProductCard product={product} key={index}/>)}
            </SimilarContainer>
        </Wrapper>
        )
    }return <Loader/>


}

export default Product;

const Wrapper =   Styled.div`
    width:100%;
    height: 100%;
`

const Container = Styled.div`
    width:100%;
    height: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: row;
    gap: 8rem;
    @media (max-width: 1200px) { 
        flex-direction: column;
        align-items: center;
        gap: 2rem
    }
`
const ImageContainer = Styled.div`
    width: 50%;
    @media (max-width: 1200px) { 
        width: 100%
    }
`
const DetailContainer = Styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: flex-start;
margin-top: 5rem;
`
const Text = Styled.p`
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 400;
`
const Row = Styled.div`
    display: flex;
    width: 100%;
    gap: 2rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.1rem solid black;
    margin-bottom: 3rem;
`

const Header = Styled.h3`
    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 1rem;
`

const Title = Styled.h1`
    font-size: 3rem;
    font-weight: 900;
    text-transform: uppercase;
`
const Category = Styled.h3`
 font-size: 1.5rem;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 3rem;
    color: rgba(0,0,0,0.5);
`

const About = Styled.div`
    margin-bottom: 2rem;
`

const List = Styled.li`
 font-size: 1.5rem;
 font-weight: 400;
 text-transform: capitalize;
 margin-bottom: 1rem;
 `


const Price = Styled.p`
 font-size: 2rem;
 font-weight: 300;
 text-transform: capitalize;
 opacity: 0.6;
`
const InStock = Styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: ${props => props.$stock ? 'green': 'red'};
`
const Btn = Styled.button`
    height: 5rem;
    width: 100%;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 1.5rem;
    border-radius: 1rem;
    background-color: white;
    outline: none;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    z-index: 1;

    &::before {
        content: '';
        width:0%;
        height: 100%;
        position: absolute;
        z-index: 0;
        background-color: black;
        transition: 0.35s ease;
        left: 0;
        top: 0;
        z-index: -1;
    }

    &:hover {
        color: white;
        &::before {
        content: '';
        width:100%;
    }
    }
`

const SimilarContainer = Styled.div`
    padding: 2rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`