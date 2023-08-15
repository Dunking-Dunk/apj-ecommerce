import React, { useEffect, useState, useRef } from "react";
import Styled from 'styled-components'
import GSAP from "gsap";

import { Link } from "react-router-dom";

const Carousel = ({products, productPage}) => {
    const [active, setActive] = useState(0)
    const containerRef = useRef()
    const containerIndexRef = useRef()
  
    useEffect(() => {
        const interval = setInterval(() => {
            if (active < products.length - 1)
                setActive(active + 1)
            else 
                setActive(0)
            
        }, 3000)
        return () => clearInterval(interval)
    }, [active, products])


    useEffect(() => {
        GSAP.to(containerRef.current, {
            x: `${-100*active}%`
        })

        if (active === 0 )  
            containerIndexRef.current.children[products.length - 1]?.classList.remove('active')
        else 
            containerIndexRef.current.children[active-1]?.classList.remove('active')
    
        containerIndexRef.current.children[active]?.classList.add('active')  
    }, [active])


    return (
        <Container>
            <Wrapper ref={containerRef}>
                {products.map((product, index) => {
                return (
                     <ImageContainer key={index}>
                        <Image src={productPage ? product?.url : product.image.url} $contain={productPage} />
                        {
                            !productPage && (
                                <Sub>
                                    <Title>{product.title}</Title>
                                    <Btn to={product.link}>Buy</Btn>
                                </Sub>
                                
                            )
                        }
                      
                     </ImageContainer>
                ) }  )}
            </Wrapper>
            <ContainerIndex ref={containerIndexRef}>
                {products.map((product, index) => 
                    <Circle key={index} onClick={() => {

                        containerIndexRef.current.children[active].classList.remove('active')
                        setActive(index)
                    }} />
                )}
        </ContainerIndex>
        </Container>
    )
}

export default Carousel

const Container = Styled.div`
    height: 75rem;
    border-radius: 2rem;
    overflow: hidden;
    margin: 1.5rem;
    `
const Wrapper = Styled.div`
display: flex;
       flex-direction: row;
    width: 100%;
    height: 100%;
`
const ImageContainer = Styled.div`
       min-width: 100%;
       max-width: 100%;
       height: 100%;
       position: relative;
       
`
const Image = Styled.img`
width: 100%;
height: 100%;
object-fit: ${props => props.$contain ? 'contain': 'cover'};
`

const ContainerIndex = Styled.div`
display: flex;
flex-direction: row;
position: relative;
bottom: 5%;
left: 50%;
gap: 1rem;
`

const Circle = Styled.div`
    width:1rem;
    height: 1rem;
    border-radius:50%;

    background-color: white;
    border: 0.2rem solid black;
    cursor: pointer;
    transition: 0.2s ease-in;

    &:hover {
        transform: scale(1.4)
    }
    &.active {
        background-color: black;
    }
`

const Sub = Styled.div`
position: absolute;
left: 5%;
bottom: 10%;
display: flex;
flex-direction: column;
max-width: 90%;
`

const Title = Styled.h1`

color: white;
text-transform: uppercase;
font-size: 5rem;
padding: 0.5rem;
`

const Btn = Styled(Link)`
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    background-color: white;
    color: black;
    padding:1.5rem 3rem;
    border-radius: 1rem;
    `
