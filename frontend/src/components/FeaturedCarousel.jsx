import React, {useState,useRef, useEffect} from "react"
import Styled from 'styled-components'
import { useNavigate } from "react-router-dom"
import GSAP from 'gsap'

const Carousel = ({ products }) => {
    const imgRef = useRef()
    const navigate = useNavigate()
    
    const [mouse, setMouse] = useState({
        mouseDown: 0,
        prev: 0,
        current: 0
    })
  
    const handleMouseDown = (e) => {
        setMouse((state) => ({...state, mouseDown: e.clientX}))
    }

    const handleMouseUp = (e) => {
        setMouse((state) => ({ ...state, mouseDown: 0 }))
        setMouse((state) => ({...state, prev: mouse.current}))
    }

    const handleMouseMove = (e) => { 
       
        if (mouse.mouseDown === 0) return
   
        const mouseDelta = mouse.mouseDown - e.clientX
        const maxDelta = window.innerWidth / 2
        const percentage = (mouseDelta / maxDelta) * -100
        let nextPercentage = mouse.prev + percentage
        nextPercentage = Math.min(nextPercentage, 0)
        nextPercentage = Math.max(nextPercentage, -100)
        setMouse((state) => ({ ...state, current: nextPercentage }))
        GSAP.to(imgRef.current, {
            x: `${nextPercentage}%`,
            duration: 4, 
            fill: 'forwards',
            ease: "sine.out"
        })
        for (const image of imgRef.current.children) {
            GSAP.to(image, {
                objectPosition: `${100 + nextPercentage}% center`,
                duration: 4, 
                fill: 'forwards',
                ease: "sine.out"
            })
        }
      
        // imgRef.current.style.transform = `translate(${nextPercentage}%, -50%) ` 
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown',handleMouseDown)

        window.addEventListener('mouseup', handleMouseUp)

       

        return () => {
            window.removeEventListener('mousedown',handleMouseDown)

            window.removeEventListener('mouseup', handleMouseUp)
    
            window.removeEventListener('mousemove', handleMouseMove)
          };
    }, [mouse])

    return (<FeaturedContainer  >
        <Title>Featured <br/> Products </Title>
        <ImageContainer ref={imgRef}>
            {products.map((product, index) => <Image src={product.images[0]?.url} key={index} draggable={false} onClick={() => navigate(`/product/${product._id}`)}/>)}
        </ImageContainer>
    </FeaturedContainer>)
}

export default Carousel

const FeaturedContainer = Styled.div`
    width: 100%;
    height: 100vmin;
    background-color: black;
    position: relative;
    overflow: hidden;
    @media (max-width:800px) {
        overflow-x: scroll;
    }
    
`

const Title = Styled.h1`
    font-size: 10rem;
    font-weight: 900;
    font-style: italic;
    text-transform: uppercase;
    position: relative;
    color: white;
    top: 50%;
    left: 10%;
    user-select: none;
    transform: translate(0, -50%);
`

const ImageContainer = Styled.div`
display: flex;
gap: 4vmin;
position: absolute;
top: 50%;
left: 50%;
transform: translate(0, -50%);
cursor: pointer;
padding: 0 2rem;
`
    

const Image = Styled.img`
width: 40vmin;
height: 56vmin;
object-fit: cover;
object-position: center;
border-radius: 1rem;
`