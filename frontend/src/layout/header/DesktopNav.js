import React, { useEffect, useRef, useState } from "react"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, layout } from 'styled-system';
import Login from './../../assets/icons/Login';
import Logout from './../../assets/icons/Logout';
import NewUser from './../../assets/icons/NewUser';
import Profile from './../../assets/icons/Profile';
import Cart from './../../assets/icons/Cart';
import MobileNavMenu from './MobileNav';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from './../../store/actions/userActions';

const DesktopNavMenu = ({ menuItems }) => {
  const userRegisterFromState = useSelector((state) => state.userLogin);
  const cartItem = useSelector((state) => state.cart.cartItems);
  const { loading, error, username } = userRegisterFromState;
  const [background, setBackground] = useState(false)
  const navRef = useRef()
  const dispatch = useDispatch();

  navRef.current = background;

  const logoutHandler = () => {

    try {
      dispatch(logout());
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 20
      if (navRef.current !== show) {
        setBackground(show)
      }
    }
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const mouseEnterHandler = () => {
    setBackground(false);
  };

  const mouseLeaveHandler = () => {
    const show = window.scrollY > 20
    if (show) setBackground(true);
  };

  return (
    <StyledHeader
      display={['flex']}
      bg={['primary']}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      background={background}
    >
      <LeftSection>
        <DivLogo>
          <Link to="/">
            LOGO |
          </Link>
          <span>{' '}{username && username}</span>
        </DivLogo>
      </LeftSection>
      <RightSection>
        <UlStyled
          display={['none', null, null, 'flex']}
          background={background}
        >
          {menuItems.map(item => (
            <li key={item.name}>
              <Link to={`/${item.path}`}>{item.name}</Link>
            </li>
          ))}
        </UlStyled>
        <Icondiv>
          {username
            ? <span><Link to="/profile"><Profile /></Link></span>
            : <span><Link to="/register"> <NewUser /></Link> </span>
          }
          {username
            ? <span id="logouticon" onClick={logoutHandler}><Logout /> </span>
            : <span><Link to="/login"><Login /></Link></span>
          }
          <Cartspan cart={cartItem?.length}><Link to="/cart"><Cart /></Link></Cartspan>
        </Icondiv>
        <MobileNavMenu menuItems={menuItems} />
      </RightSection>

    </StyledHeader>
  )
}

export default DesktopNavMenu;

const StyledHeader = styled.nav`
  ${color}
  ${layout}
  justify-content: space-between;
  position: fixed;
  width: 100%;
  height: 8vh;
  top: 0;
  left: 0;
  z-index: 10;
  opacity: ${({ background }) => (background ? ".2" : "1")};
  transition: all 300ms;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;    
  padding-left: 20px;
`;

const DivLogo = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  margin: auto, auto;
  color: white;
  padding: 0;
  width: 100%;
  height: 100%;

  span {
    margin-left: 10px;
  }
`;

const MiddleSection = styled.div`
  display: flex;
  flex: 2;
  height: 100%;
  justify-content: center;
`;

const RightSection = styled.div`
  display: flex;
  padding-right: 20px;
  align-items: center;
  `;

const Icondiv = styled.div`
  display: flex;

  #logouticon{
    cursor: pointer;
  }
        
  span svg{
    margin: auto auto;
    width: 2rem;
    height: 2rem;
    :first-child {
      margin-inline-end: 1.2rem;
    }
    :hover {
      fill: rgba(255,255,255,.5);
    }  
  }
`;

const UlStyled = styled.ul`
${layout};
align-items: center;
width: 100%;
justify-content: space-between;
margin: 0;
margin-inline-end: 2vw;

li {
  height: 100%;
  list-style: none;
  margin-inline-end: 1vw;

    :last-child {
    margin-inline-end: 0;
  }

    :hover {
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-decoration: none;
    color: ${({ background }) => (background ? "black" : "white")};
    transition: all 400ms;

      :hover {
      background-color: 'darkgray';
      color: white;
    }
  }
}
`;

const Cartspan = styled.span`
  position: relative;
::after {
  content: "${(props) => props.cart > 0 ? props.cart.toString() : null}";
  text-align: center;
  min-width: 20px;
  color: white;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  right: 10px;
}
`;
