import React, {useState} from "react";
import Styled from 'styled-components'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Title, InputContainer, Input, Button } from "./Categories";
import Loader from "../../components/Loader";
import { createBillboard, deleteBillboard } from "../../store/BillboardReducer";

const Billboard = () => {
    const dispatch = useDispatch()
    const {billboards, loading} = useSelector((state) => state.Billboards)
    const [state, setState] = useState({
        title: '',
        image: '',
        link: ''
    })
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
    

    const handleSubmit =     () => {
        dispatch(createBillboard(state))
        setState({
            title: '',
            image: '',
            link: ''
        })
    }

    const handleDelete = (id) => {
        dispatch(deleteBillboard(id))
    }

    return (<Container>
        <Title>Billboards</Title>
        <InputContainer>
            <Input type="text" value={state.title} onChange={(e) => setState((state) => ({ ...state, title: e.target.value }))} placeholder="Billboard Title" />
            <Input type="text" value={state.link} onChange={(e) => setState((state) => ({...state, link: e.target.value}))} placeholder="link"/>
        <Input type="file" onChange={createProductImagesChange} />
            {
                !loading ?  <Button onClick={handleSubmit} $type='success'>Create Billboard</Button> : <Loader/>
            }
        </InputContainer>
        {billboards && (
            <BillboardContainer>
                <Title>Preview</Title>
                {billboards.map((billboard, index) => {
                        return (
                            <BillboardCard key={index}>
                                <Img src={billboard.image.url} />
                                <Sub>
                                    <Name>{billboard.title}</Name>
                                    <Row>
                                    <Btn to={billboard.link}>Buy</Btn>
                                    {
                !loading ?  <Button onClick={() => handleDelete(billboard._id)} $type='failure'>Delete Billboard</Button> : <Loader/>
            }
                                    </Row>
          
                                    </Sub>
                            </BillboardCard>
                        )
                    })}
             
                </BillboardContainer>
        )}
    </Container>)
}

const BillboardContainer = Styled.div`
    margin-top:2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const BillboardCard = Styled.div`
    width: 100%;
    height: 70rem;
    position: relative;
    border-radius: 2rem;
    overflow: hidden;
`

const Img = Styled.img`
    width: 100%;
    height: 100%;
`
const Sub = Styled.div`
position: absolute;
left: 5%;
bottom: 10%;
display: flex;
flex-direction: column;
max-width: 90%;
`

const Btn = Styled(Link)`
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    background-color: white;
    color: black;
    padding:1.5rem 3rem;
    border-radius: 1rem;
    `


const Name = Styled.h1`
color: white;
text-transform: uppercase;
font-size: 5rem;
padding: 0.5rem;
`
const Row = Styled.div`
    display: flex;
    justify-content: space-between;
`

export default Billboard;