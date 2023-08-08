import React, { useEffect, useRef } from "react";
import Styled from 'styled-components'
import GSAP from 'gsap'
import { useDispatch, useSelector } from "react-redux";
import { BiErrorCircle } from 'react-icons/bi'
import { MdDone } from 'react-icons/md'
import { clearNotification } from "../store/NotificationReducer";

const Notification = () => {
    const containerRef = useRef()
    const dispatch = useDispatch()
    const {message, type}= useSelector((state) => state.Notifications)

    useEffect(() => {
        if (message && message !== null) {
            const tl = GSAP.timeline()

            tl.to(containerRef.current, {
                bottom: '10%',
            })
            setTimeout(() => {
                dispatch(clearNotification())
            }, 3000)
        }


    }, [message])

    if (message) {
        return (
            <Container $type={type} ref={containerRef}>
                {type === 'success' ? <MdDone size={18} color="green"/>:  <BiErrorCircle size={18} color="#FF7D7D"/>}
    
              
                <Message $type={type} >{message}</Message>
            </Container>
        )
    }
  
}



const Container = Styled.div`
    position: fixed;
    bottom: -10%;
    padding: 2rem 5rem;
    z-index:100;
    left: 5%;
    border: 0.2rem solid ${props => props.$type === 'success' ?'#B6FFCE'  : '#FF7D7D'};
    border-radius: 1rem;
    background-color: ${props => props.$type ===  'success'  ?'#5D9C59'  : '#C51605'};;
    display: flex;
    align-items: center;
    gap: 2rem;
`

const Message = Styled.p`
    font-size: 2rem;
    font-weight: 400;
    text-transform: uppercase;
    color: ${props => props.$type === 'success' ? '#B6FFCE' : '#FF7D7D'};
`
export default Notification