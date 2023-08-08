import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createNotification } from '../../store/NotificationReducer'
import Loader from '../../components/Loader'
import { createCustomer, removeError } from '../../store/CustomerReducer'
import { Switch } from '@mui/material'

const New = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading,error } = useSelector((state) => state.Customers)
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    role: 'user'
    })


    const helper = (key, val) => {
        setState((state) => ({...state,[key]: val}))
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        dispatch(createCustomer(state))
        if (error) {
            dispatch(createNotification({ type: 'failure', message: error?.message }))
        } else {
            navigate('/admin/customers')
        }
        
    }
        return (
            <Container>
                <Title>Create customer</Title>
                <Input type='text' placeholder='Name' onChange={(e) => helper('name', e.target.value)} value={state.name}/>
                <Input type='email' placeholder='Email' onChange={(e) => helper('email', e.target.value)} value={state.email}/>
                <Input type='text' placeholder='Password' onChange={(e) => helper('password', e.target.value)} value={state.password} />
                <h3>admin</h3>
                <Switch onChange={(e) => {
                    if (e.target.checked) {
                        helper('role', 'admin')
                    }else helper('role', 'user')
                }}   />
                {loading ? <Loader/> : <Button onClick={HandleSubmit}>Create</Button>}
            </Container>  )
      
}

export default New;

const Container = Styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 5rem 5rem;
    gap: 3rem;
`

const Title = Styled.h1`
    font-size: 4rem;
    font-weight: 500;
    text-transform: uppercase;
`

const Input = Styled.input`
    width: 50rem;
    height: 4rem;
    padding: 1rem;
`
const TextBox = Styled.textarea`
width: 50rem;
    height: 20rem;
    max-width: 50rem;
    max-height: 20rem;
    padding: 1rem;
`

const Button = Styled.div`
    padding: 1rem 4rem;
    cursor: pointer;
    border: 0.1rem dotted green;
    border-radius:1rem;
    font-size: 2rem
`