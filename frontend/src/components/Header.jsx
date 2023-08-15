import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiSolidUser } from 'react-icons/bi'
import {AiOutlineClose, AiOutlineSearch, AiOutlineShoppingCart} from 'react-icons/ai'
import {RxHamburgerMenu} from 'react-icons/rx'
import { useSelector, useDispatch } from "react-redux";
import { getSearchedProducts } from "../store/ProductReducer";

const Header = () => {
    const dispatch = useDispatch()
    const containerRef = useRef()
    const modalRef = useRef()
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const { totalItem } = useSelector((state) => state.Carts)
    const {categories} = useSelector((state) => state.Categories)
    const helperFunction = () => {
        if (containerRef.current.style.left === '-100%') {
            containerRef.current.style.left = 0;
        } else {
            containerRef.current.style.left = '-100%';
        }
    }
    useEffect(() => {
        modalRef.current.style.top = '-100%';
    }, [location.pathname])

    const SearchModal = () => {
        if (modalRef.current.style.top === '-100%') {
            modalRef.current.style.top = '15%';
        } else {
            modalRef.current.style.top = '-100%';
        }
    }

    const searchProduct = () => {
        dispatch(getSearchedProducts(search))
        navigate(`/search`)
        setSearch('')
    }


    return (
        <HeaderContainer>
            <Wrapper>
            <Menu onClick={helperFunction}>     
                      <RxHamburgerMenu size={22}/>
            </Menu>
                <LeftContainer>
                    <Logo to='/'> APJ<LogoSpan> Store</LogoSpan></Logo>
                </LeftContainer>
                <CategoryContainer ref={containerRef}>
                    <MobileContainer>
                    <Menu onClick={helperFunction}>     
                        <AiOutlineClose size={22}/>
                    </Menu>
                        <Logo to='/'>APJ <LogoSpan>Store</LogoSpan></Logo>
                    </MobileContainer>
                        {categories.map((category, index) => <Category to={`/products/${category._id}`} key={index}>{category.title}</Category> )}
                    <Category to='/products/all'>All</Category>
                    </CategoryContainer>
                <RightContainer>
                    <UserBtn onClick={SearchModal} ><AiOutlineSearch size={16} color="black"  /></UserBtn>
                <UserBtn to='/account'><BiSolidUser size={16} color="black"/></UserBtn>
                    <CartBtn to='/cart' >
                        < AiOutlineShoppingCart size={18} color="black" />
                        {totalItem > 0 &&  <CartQty>{totalItem}</CartQty>}
                        
                    </CartBtn>
                </RightContainer>
            </Wrapper>
            <SearchContainer ref={modalRef}>
                <Search placeholder="Search" onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => {
             
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        searchProduct()
                        modalRef.current.style.top = '-100%';
                    }
                }}/>
                <SearchBtn onClick={() => {
                    modalRef.current.style.top = '-100%';
                    searchProduct()
                }}><AiOutlineSearch  size={16} color="black"/></SearchBtn>
            </SearchContainer>
        </HeaderContainer>
 
    )
    
}

const HeaderContainer = styled.div`
        height: 8rem;
    width: 100%;
    /* position: fixed;
    z-index: 10; */
    background-color: white;

`
const Wrapper = styled.div`
padding: 0rem 4rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.1rem solid black;
   
`

const LeftContainer = styled.div`
height: 100%;
display: flex;
align-items: center;
justify-content: center;

`
const Logo = styled(Link)`
height: 100%;
display: flex;
align-items: center;
justify-content: center;
    font-size: 4rem;
    font-weight: 900;
    padding-right: 4rem;
    border-right: 0.1rem solid black;
    text-decoration: none;
    color: black;

    @media (max-width: 1200px) {
        padding-left: 5rem;
    border-right: 0rem black solid;
  }

  @media (max-width: 600px) {
        font-size: 2.5rem;
        padding-left:2rem;
  }
`

const LogoSpan = styled.span`
     margin-left: 1rem;
     font-size: 4rem;
     font-weight: 300;
     font-style: italic;
     @media (max-width: 600px) {
        font-size: 2.5rem;
  }
`

const CategoryContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 4rem;
    transition: 0.2s ease-in;

    @media (max-width: 1200px) {
    position: fixed;
    width: 50%;
    left: -100%;
    top: 0;
    flex-direction: column;
    background-color: white;
    z-index: 5;
    padding: 0rem;
  }
`

export const Category = styled(Link)`
    font-size: 1.2rem;
    font-weight: 400;
    text-transform: uppercase;
    margin: 2rem;
   cursor: pointer;
   position: relative;
   text-decoration: none;
    color: black;
    line-height: 1.05;
    width: 100%;
    
   &::before{
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: black;
    transform-origin: left center;
    transform: scaleX(0);
    transition: 0.2s linear;
   }

   &:hover{
    &::before {
          transform: scaleX(1);
    }
   }

   @media (max-width: 1200px) {
    padding: 0 1rem;
    border-bottom: 0.1rem black solid;
  }
`

const RightContainer = styled.div`
    height: 100%;
    display: flex;
  gap: 2rem;
    align-items: center;`

const CartBtn = styled(Link)`
display: flex;
align-items: center;
justify-content: center;
    font-size: 1.5rem;
    font-weight: 300;
    border-radius:50%;
    text-decoration: none;
    color: black;
   border: 0.1rem solid black;
    padding: 1rem;
    position: relative;
`

const CartQty = styled.div`
    position: absolute;
    background: red;
    border-radius: 50%;
    padding: 0.5rem;
    color: white;
    font-size: 1rem;
    right: -0.5rem;
    top:-1rem;
`

const UserBtn = styled(Link)`
    border-radius: 50%;
    border: 0.1rem solid #000;
    padding: 1rem;
`

const MobileContainer = styled.div`
    width: 100%;
    height: 8rem;
  display: none;

    @media (max-width: 1200px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Menu = styled.div`
width: 3rem;
height: 3rem;
cursor: pointer;
display: none;

@media (max-width: 1200px) {
display: block;
  }
`
const SearchContainer = styled.div`
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translate(-50%,0);
    width: 50rem;
    height: 5rem;
    z-index: 10;
    border-radius: 2rem;
    overflow: hidden;
    border: 0.1rem solid black;
    transition: 0.2s ease;
`



const Search = styled.input`
    width: 90%;
    height: 100%;
    outline: none;
    border: none;
    padding: 1rem;
`

const SearchBtn = styled.button`
    height: 100%;
    width: 10%;
    background: white;
    outline: none;
    border: none;
    cursor: pointer;
    border-left: 0.1rem solid black;
`


export default Header