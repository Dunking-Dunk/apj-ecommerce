import React from "react";
import Styled from 'styled-components'

const InfoCard = ({title, value, Icon}) => {
    return (
        <Container>
            <Row>
                <Title>{title}</Title>
                {Icon && <Icon/>}
            </Row>
            <Text>{value}</Text>
        </Container>
    )
}

const Container = Styled.div`
    min-width: 20rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 1rem;
    border: 0.1rem solid #686363;
    background-color: white;
`

const Title = Styled.p`
font-size: 1.5rem;
font-weight: 500;
margin-bottom: 1rem;
`

const Row = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Text = Styled.h1`
    font-size: 2.5rem;
    font-weight: 600;
`

export default InfoCard