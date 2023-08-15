import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProduct, removeError } from '../../store/ProductReducer'
import { createNotification } from '../../store/NotificationReducer'
import Loader from '../../components/Loader'
import {FormControl, InputLabel, Select, MenuItem, Box, Chip} from '@mui/material'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

const NewProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.User)
    const {categories} = useSelector((state) => state.Categories)
    const { loading,error } = useSelector((state) => state.Products)
    const [state, setState] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        images: [],
        category: [],
        color: '#000000',
        user: user._id
    })
    const [imagePreview, setImagesPreview] = useState()

    useEffect(() => {
        dispatch(createNotification({ type: 'failure', message: error?.message }))
        setTimeout(() => {
            dispatch(removeError())
        }, 5000)
      
    }, [error])

    const helper = (key, val) => {
        setState((state) => ({...state,[key]: val}))
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
    
        dispatch(createProduct(state))
        if (!error && !loading) {
            navigate('/admin/products')
        }
    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setState((state) => ({...state, images: [...state.images, reader.result]}));
            }
          };
    
          reader.readAsDataURL(file);
        });
      };

        return (
            <Container>
                <Title>Create Product</Title>
                <Input type='file' placeholder='product images' onChange={createProductImagesChange} multiple accept="image/*"/>
                <Input type='text' placeholder='Name' onChange={(e) => helper('name', e.target.value)} value={state.name}/>
                <TextBox placeholder='description' onChange={(e) => helper('description', e.target.value)} value={state.description}/>
                <Input type='number' placeholder='price' onChange={(e) => helper('price', e.target.value)} value={state.price}/>
                <Input type='color' placeholder='color' onChange={(e) => helper('color', e.target.value)} value={state.color}/>
                <FormControl style={{width: '50rem'}}>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={state.category}
                        label="Category"
                        multiple
                        onChange={(e) => helper('category', e.target.value)}
                        renderValue={(selected) => 
                            (
                        
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )
                        }
                          MenuProps={MenuProps}
                    >{
                            categories.map((category, index) => <MenuItem value={category._id} key={index}>{category.title}</MenuItem>)
  }
  </Select>
</FormControl>
                <Input type='number' placeholder='stock quantity' onChange={(e) => helper('stock', e.target.value)} value={state.stock}/>
                {loading ? <Loader/> : <Button onClick={HandleSubmit}>Create</Button>}
            </Container>  )
      
}

export default NewProduct

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