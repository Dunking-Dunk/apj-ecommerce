import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/UserReducer";
import { Container, Input, Btn, LinkReg, Title } from './Login'
import { createNotification } from "../store/NotificationReducer";

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, isAuthenticated } = useSelector((state) => state.User)
    const [state, setState] = useState({
        email: '',
        password: '',
        name: ''
    })
    

    const inputHandler = (val, text) => {
        setState((state) => ({...state, [text]: val}))
    }

    const handleSubmit = async () => {
         dispatch(registerUser(state))
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
            <Title>Register</Title>
            <Input placeholder="Name" onChange={(e) => inputHandler(e.target.value, 'name')}/>
        <Input placeholder="Email" onChange={(e) => inputHandler(e.target.value, 'email')}/>
        <Input placeholder="Password" onChange={(e) => inputHandler(e.target.value, 'password')}/>
        <Btn onClick={handleSubmit}>Sign Up</Btn>
        <LinkReg to='/account/login'>already have a account</LinkReg>
</Container>
    )
}

export default Register