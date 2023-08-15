import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createCategory, deleteCategory, removeError } from "../../store/CategoryReducer";
import Loader from "../../components/Loader";
import { createNotification } from "../../store/NotificationReducer";

const Categories = () => {
    const dispatch = useDispatch()
    const {categories, loading, error} = useSelector((state) => state.Categories)
    const [state, setState] = useState({
        title: '',
        image: ''
    })

    useEffect(() => {
        dispatch(createNotification({ type: 'failure', message: error?.message }))
        setTimeout(() => {
            dispatch(removeError())
        }, 5000)
      
    }, [error])

   const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setState((state) => ({...state, image: reader.result}));
            }
          };
          reader.readAsDataURL(file);
        });
    };
    
    const handleSubmit = () => {
        dispatch(createCategory(state))
        setState({
            title: '',
            image: ''
        })
    }

    const handleDelete = (id) => {
        dispatch(deleteCategory(id))
    }


    return (<Container>
        <Title>Categories</Title>
        <InputContainer>
        <Input type="text" value={state.title} onChange={(e) => setState((state) => ({...state, title: e.target.value}))} placeholder="Category name"/>
        <Input type="file" onChange={createProductImagesChange}/>
            {
                !loading ?  <Button onClick={handleSubmit} $type='success'>Create Category</Button> : <Loader/>
            }
        </InputContainer>
        <CategoriesContainer>
            <Row>
                <Name>IMAGE</Name>
                <Name>TITLE</Name>
                <Name>ACTIONS</Name>
            </Row>
            {categories?.map((category) => {
                return (
                    <Row>
                    <Img src={category.image.url} />
                        <Name>{category.title}</Name>
                    {!loading ?   <Button onClick={() => handleDelete(category?._id)}>Delete</Button>: <Loader/>}
                  
                </Row>
                )
            })}
           
        </CategoriesContainer>
    </Container>)
}

export const Container = styled.div`
padding: 2rem;
`

export const Title = styled.h1`
 font-size: 4rem;
 font-weight: 700;
 text-transform: uppercase;
 border-bottom: 0.1rem solid black;
 padding: 1rem;
`

export const InputContainer = styled.div`
margin-top: 3rem;
display: flex;
flex-direction: column;
gap: 1rem;
`

export const Input = styled.input`
    width: 50rem;
    height: 5rem;
    padding: 1rem;
`

export const Button = styled.div`
    cursor: pointer;
    border: 0.1rem dotted ${props => props.$type === 'success' ? 'green' : 'red'};
    border-radius:1rem;
    font-size: 1rem;
    width: 15rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.$type === 'success' ? 'green' : 'red'};
`
const CategoriesContainer = styled.div`
margin-top: 2rem;
display: flex;
flex-direction: column;
gap: 0rem;
`
const Row = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
gap: 2rem;
`

const Img = styled.img`
    width: 25rem;
    height: 20rem;
    object-fit: contain;
    border-radius: 1rem;
`

const Name = styled.h3`
    font-size: 2rem;
`

export default Categories;