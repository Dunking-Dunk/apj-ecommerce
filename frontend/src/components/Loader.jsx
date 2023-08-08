import React from "react";
import Styled, {keyframes} from 'styled-components'

const Loader = () => {

        return (
            <Container/>
        )
}

const loadAnimation = keyframes`
 0% { transform: rotate(0deg)  }
 100% { transform: rotate(360deg) }
`

const Container = Styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        border-left: 0.2rem solid black;
        animation: ${loadAnimation} infinite 2s linear;
    }
`


export default Loader