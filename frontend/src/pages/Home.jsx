import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Styled from 'styled-components'

import Carousel from "../components/Carousel";
import TitleCarousel from "../components/Marque";
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import FeaturedCarousel from '../components/FeaturedCarousel';

const Home = () => {
    const { products } = useSelector((state) => state.Products)
    const {categories} = useSelector((state) => state.Categories)
    const {billboards} = useSelector((state) => state.Billboards)

    return (
        <HomeContainer>
            <Carousel products={billboards}/> 
            <TitleCarousel title='Best Seller' emoji="🔥" para='It is what it is'/>
            <BestContainer>
                {products.map(product => {
                    return (
                        <ProductCard product={product}/>
                    )
                })}
            </BestContainer>
        
            <Discount>
            <Title>Top Discounts</Title>
            <DiscountContainer>   
            {products.slice(0,4).map(product => {
                    return (
                        <ProductCard product={product}/>
                    )
                })}
            </DiscountContainer>
            </Discount>
    
            <TitleCarousel title='Collections' emoji="😍" />
            <CollectionContainer>
                
                {categories.map((category,index) => {
                    return (
                        <CategoryCard category={category} key={index}/>
                    )
                })}
            </CollectionContainer>
            <FeaturedCarousel products={products} />
            <TitleCarousel title='Dreams transform into thoughts and thoughts result in action' emoji="💪" />
        </HomeContainer>
    )
}

export default Home

const HomeContainer = Styled.div`
width: 100%;
height: 100%;
overflow: hidden;
position: relative;
`
const BestContainer = Styled.div`
padding: 2rem;
width: 100%;
height: 100%;
display: flex;
flex-wrap: wrap;
gap: 2rem;
background: #2193b0; 
background: -webkit-linear-gradient(to bottom, #6dd5ed, #2193b0); 
background: linear-gradient(to bottom, #6dd5ed, #2193b0); 
align-items: center;
@media (max-width: 600px) {
    justify-content: center; 
}
`
const Title = Styled.h1`
    font-size: 6rem;
    margin-bottom:2rem;
    font-weight: 700;
    color: white;
    text-transform: uppercase;
`
const Discount = Styled.div`
padding: 2rem;
width: 100%;
height: 100%;
background-color: #2193b0;

`

const DiscountContainer = Styled.div`
display: flex;
flex-wrap: wrap;
gap: 2rem;
align-items: center;

@media (max-width: 600px) {
    justify-content: center; 
    
}
`

const CollectionContainer = Styled.div`
padding: 2rem;
display: flex;
flex-wrap: wrap;
width: 100%;
gap: 1rem;
    background: #000000; 
background: -webkit-linear-gradient(to bottom, #2193b0, #000000); 
background: linear-gradient(to bottom, #2193b0, #000000); 

@media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    
}
`
