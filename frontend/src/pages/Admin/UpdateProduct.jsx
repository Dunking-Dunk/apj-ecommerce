import React, { useState, useEffect } from 'react'
import Styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {  getProduct, updateProduct } from '../../store/ProductReducer'
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

const UpdateProduct = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.User)
    const {categories} = useSelector((state) => state.Categories)
    const { loading, error, product } = useSelector((state) => state.Products)
    const [state, setState] = useState({
        id: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        images: [],
        category: [],
        color: '#000000',
        user: user?._id
    })
    const [imagePreview, setImagesPreview] = useState()

    useEffect(() => {
        dispatch(getProduct(id))
    }, [])
  
    useEffect(() => {
        if (error) {
            dispatch(createNotification({ type: 'failure', message: error?.message }))
        }
        if (product?._id === id) {
            setState({
                id: product._id,
                name:product.name,
                description:product.description,
                price:product.price,
                stock:product.stock,
                images: [],
                category:product.category,
                color:product.color,
                user:product.user,
              })
        }
     
    }, [error, product])

    const helper = (key, val) => {
        setState((state) => ({ ...state, [key]: val }))
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProduct(state)).then(() => {
            navigate('/admin/products')
        })
    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImagesPreview([]);
    
        files.forEach((file) => {
            const reader = new FileReader();
    
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setState((state) => ({ ...state, images: [...state.images, reader.result] }));
                }
            };
    
            reader.readAsDataURL(file);
        });
    };

    if (product) {
        return (
            <Container>
                <Title>Update Product</Title>
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
                {loading ? <Loader/> : <Button onClick={HandleSubmit}>Update</Button>}
            </Container>  )
    } else {
        return <Loader/>
    }
     
      
}

export default UpdateProduct

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
    border-bottom: 0.1rem solid #222222;
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