import React, { useEffect, useRef } from "react";
import Styled from 'styled-components'
import GSAP from 'gsap'

const TitleCarousel = ({ title, emoji }) => {
    const ref = useRef()
    useEffect(() => {
        GSAP.fromTo(ref.current, {
            x: 0
        }, {
            x: '-100%',
            duration:20,
            repeat: -1,
            ease: 'linear',
            yoyo: true
        })
    }, [])

    const helper = () => {
        let str = ''; 
        for (let i = 0; i < 10; i++) {
            str += title + emoji             
        }
        return str
    }

    return (
        <Container >
            <Title ref={ref}>{helper()}</Title>
        </Container>
    )
}

const Container = Styled.div`
 border-top: 0.4rem solid black;
 border-bottom: 0.4rem solid black;
 overflow: hidden;
`

const Title = Styled.h1`
font-family: 'Handjet', cursive;

    font-size: 8rem;
    font-weight: 600;
    text-transform: uppercase;
    padding: 0;
    margin: 0;
    white-space: nowrap;
`
const Span = Styled.span`
    font-size: 4rem;
`


export default TitleCarousel;