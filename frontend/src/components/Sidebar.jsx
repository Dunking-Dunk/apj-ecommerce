import React from "react";
import Styled from 'styled-components'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
//   const user = useSelector((state) => state.users.user)

  const navigate = useNavigate()
  return (
    <Container>
      <Center>
        <Ul>
          <Title>MAIN</Title>
          <Item to="/admin" style={{ textDecoration: "none" }}>
        
          <Li>
            <ItemSpan>Dashboard</ItemSpan>
          </Li>
          </Item>

          <Title>LISTS</Title>
          <Item to="/admin/products" style={{ textDecoration: "none" }}>
            <Li>
              <ItemSpan>Products</ItemSpan>
            </Li>
          </Item>
          <Hr />
          <Item to="/admin/category" style={{ textDecoration: "none" }}>
            <Li>
              <ItemSpan>Categories</ItemSpan>
            </Li>
          </Item>
          <Hr/>
          <Item to="/admin/billboards" style={{ textDecoration: "none" }}>
            <Li>
              <ItemSpan>BillBoard</ItemSpan>
            </Li>
          </Item>
          <Hr/>
          <Item to="/admin/customers" style={{ textDecoration: "none" }}>
            <Li>
              <ItemSpan>Customers</ItemSpan>
            </Li>
          </Item>
          <Hr/>
          <Item to="/admin/orders" style={{ textDecoration: "none" }}>
            <Li>
              <ItemSpan>Orders</ItemSpan>
            </Li>
          </Item>
          <Hr/>
        </Ul>
      </Center>
    </Container>
  );
};

export default Sidebar;


const Container = Styled.div`
    flex: 1;
  border-right: 0.5px solid rgb(230, 227, 227);
  min-height: 100vh;
  background-color: white;
`

const Item = Styled(Link)`
    text-decoration: none;

`
const Hr = Styled.hr`
    height: 0;
    border: 0.5px solid rgb(230, 227, 227);
`
const Center = Styled.div`
        padding-left: 10px;
`

const Ul = Styled.ul`
          list-style: none;
      margin: 0;
      padding: 0;
`

const Title = Styled.p`
            font-size: 10px;
        font-weight: bold;
        color: black;
        margin-top: 15px;
        margin-bottom: 5px;
`

const Li = Styled.li`
      display: flex;
        align-items: center;
        padding: 5px;
        cursor: pointer;

        &:hover {
          background-color: #ece8ff;
        }
`
const ItemSpan = Styled.span`
           font-size: 13px;
            font-weight: 600;
            color: black;
            margin-left: 10px;
`