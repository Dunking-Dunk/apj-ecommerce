import React, {useEffect, useState} from "react";
import Styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../store/UserReducer'
import { createNotification } from "../store/NotificationReducer";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, isAuthenticated } = useSelector((state) => state.User)
    const [state, setState] = useState({
        email: '',
        password:''
    })

    const inputHandler = (val, text) => {
        setState((state) => ({...state, [text]: val}))
    }

    const handleSubmit = async () => {
         dispatch(loginUser(state))
    }

    useEffect(() => {
        if (error) {
            dispatch(createNotification({type: 'failure', message: error.message}))
        }
        if (isAuthenticated) {
            navigate('/account')
        }
    }, [error, isAuthenticated])


    return (
        <Container>
            <Title>Login</Title>
            <Input placeholder="Email" onChange={(e) => inputHandler(e.target.value, 'email')} type="email"/>
            <Input placeholder="Password" onChange={(e) => inputHandler(e.target.value, 'password')}/>
            <Btn onClick={handleSubmit}>Sign In</Btn>
            {error &&  <Error>{error.message}</Error> }
      
            <LinkReg to='/account/register'>create a new Account</LinkReg>
</Container>
    )
}

export const Container = Styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 2rem;
margin: 5rem 0rem;
position: relative;
`

export const Title = Styled.h1`
    font-size: 5rem;
    font-weight: 500;   
    text-transform:uppercase;
`


export const Input = Styled.input`
    width: 30rem;
    height: 4rem;
    font-size: 1.2rem;
    padding: 1rem;
`

export const Btn = Styled.button`
    width: 15rem;
    height:4rem;
    border-radius: 2rem;
    outline: none;
    background-color:transparent;
    cursor: pointer;
`

export const LinkReg = Styled(Link)`
text-decoration: none;
color: black;
text-transform: capitalize;
`
const Error = Styled.p`
    color: red;
    font-size: 1.5rem;
`

export default Login