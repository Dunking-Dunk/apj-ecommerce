import React, { useEffect, useRef } from "react";
import Styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import GSAP from 'gsap'

const Card = ({ product }) => {
    const navigate = useNavigate()
    const containerRef = useRef()
    useEffect(() => {
        const el = containerRef.current
        GSAP.fromTo(el,
            {
                bottom: -10,
                opacity: 0
            },
            {
                opacity: 1,
                bottom: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: el
                }
                
            }
        )
    },[])

    const navigatePage = () => {
        navigate(`/product/${product._id}`)
    }
    return (
        <Container onClick={navigatePage} ref={containerRef}>
            <ImageContainer>
            <Image src={product.images[0]?.url} />
            {product.images[1] && <Image2 src={product.images[1]?.url} />}
            
            </ImageContainer>
    
            <Detail>
                <Title>{product.name.length < 80 ? product.name : `${product.name.slice(0,80)}...`}</Title>
                <Price>Rs {product.price.toFixed(2)}</Price>
            </Detail>
           
     </Container>
 )
}

export default Card;

const Container = Styled.div`
    width:45rem;
   height:60rem;
    position:relative;
    overflow:hidden;
    cursor:pointer;
    border-radius: 1.5rem;
    padding: 1rem;
    background-color: white;

    @media (max-width: 600px) {
    width:100%; 
}
`
const ImageContainer = Styled.div`
   height: 85%;
    width:100%;
    position:relative;
    border-radius: 1.5rem;
    overflow:hidden;

`
const Image = Styled.img`
    height: 100%;
    width:100%;
    z-index:0;
    position:absolute;
    object-fit: contain;
    transition: 0.4s ease;
    ${Container}:hover & {
        transform: scale(1.5)
}
`
const Image2 = Styled.img`
 height: 100%;
    width:100%;
    position:absolute;
    z-index:1;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    ${Container}:hover & {
        opacity: 1;
}
    `

const Detail = Styled.div`
    padding: 2rem 1rem;
`
const Title = Styled.h3`
font-size:1.5rem;
font-weight: 700;
text-transform: uppercase;
line-height:1.5;
`
const Price = Styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    opacity: 0.5;
`

