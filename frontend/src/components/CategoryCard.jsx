import React, {useRef, useEffect} from "react";
import Styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import GSAP from 'gsap'

const Card = ({ category }) => {
    const navigate = useNavigate()

    const containerRef = useRef()

    useEffect(() => {
        const el = containerRef.current
        GSAP.fromTo(el,
            {
                bottom: -100,
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

    return (
        <Container $area={category.title} ref={containerRef}>
            <Image src={category.image.url} />
            <Title>{category.title}</Title>
            <Btn onClick={() => navigate(`/products/${category._id}`)}>Explore</Btn>
        </Container>
    )
}

export default Card;

const Container = Styled.div`
    position: relative;
    border-radius: 2rem;
    overflow: hidden;
    width: 45rem;
    height: 70rem;
    @media (max-width: 600px) {
        width: 100%;
        height: 50rem;
}
`

const Image = Styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const Title = Styled.h1`
    position: absolute;
    bottom: 10rem;
    left: 2rem;
    font-size: 4rem;
    font-weight: 900;
    text-transform: uppercase;
    color: white;
`
const Btn = Styled.button`
        position: absolute;
        font-size: 1.1rem;
    bottom: 5rem;
    left: 2rem;
    padding: 1rem 3rem;
    border-radius: 2rem;
    outline: none;
    border: 0.1rem solid white;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.35s ease;

    &:hover {
        transform: translateY(-1rem);
    }
`
