import React, { useEffect } from "react"
import {useSelector } from 'react-redux'
import {map} from 'lodash'
import Styled from 'styled-components'
import Loader from '../../components/Loader'
import InfoCard from "../../components/InfoCard"
import Chart from "../../components/Chart"


const Home = () => {
    const {quickStats} = useSelector((state) => state.Admins)

    if (quickStats) {
        return (<Container>
            <Sub>
            <Title>DashBoard</Title>
            <Para>Overview of Store</Para>
            </Sub>
         
            <Sub>
            <Header>orders</Header>
            <InfoContainer>
                {map(quickStats['orders'],((data) => {
                    return <InfoCard title={data.title} value={data.value} />
                }))}
            </InfoContainer>
            </Sub>
            <Sub>
            <Header>Products</Header>
            <InfoContainer>
                {map(quickStats['products'],((data) => {
                    return <InfoCard title={data.title} value={data.value} />
                }))}
            </InfoContainer>
            </Sub>
            <Sub>
            <Header>Users</Header>
            <InfoContainer>
                {map(quickStats['users'],((data) => {
                    return <InfoCard title={data.title} value={data.value} />
                }))}
            </InfoContainer>
            </Sub>
            
            <Chart aspect={4} title='monthly revenue'/>
            </Container>)
    }else return <Loader/>
 
}

const Container = Styled.div`
padding: 2rem;
display: flex;
flex-direction: column;
gap: 2rem;
`

const Sub = Styled.div`
    
`

const Title = Styled.h1`
    font-size: 4rem;
    text-transform: uppercase;
    font-weight: 900;
`

const Para = Styled.p`
    font-size: 1.2rem;
    font-weight: 300;
    text-transform: uppercase;
`

const Header = Styled.h3`
font-size: 2rem;
text-transform: uppercase;
font-weight: 500;
`

const InfoContainer = Styled.div`
display: flex;
flex-wrap: wrap;
gap: 2rem;
`

export default Home