import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { color, layout, typography } from 'styled-system';

const MobileNavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <MenuBar
      display={['flex', null, null, 'none']}
      bg={['primary']}
    >
      <MenuIconContainer>
        <MenuIcon menuOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <div />
          <div />
          <div />
        </MenuIcon>
      </MenuIconContainer>
      <MenuLinks menuOpen={menuOpen}
        bg="primary"
        fontSize="4"
        lineHeight="10vh"
      >
        <ul>
          <li>
            <Link to="/">FŐOLDAL</Link>
          </li>
          <li>
            <Link to="/kategoriak">KATEGÓRIÁK</Link>
          </li>
          <li>
            <Link to="/rolunk">RÓLUNK</Link>
          </li>
          <li>
            <Link to="/sale">AKCIÓK</Link>
          </li>

        </ul>
      </MenuLinks>
    </MenuBar>
  )
}

export default MobileNavMenu

const MenuBar = styled.header`
  ${color}
  ${layout}
  z-index: 10;
 `;

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MenuIcon = styled.div`
  cursor: pointer;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 2rem;
  outline: thin-dotted;
  z-index: 110;

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ menuOpen }) => (menuOpen ? "gray" : "white")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: opacity 300ms, transform 300ms;

    :first-child {
      transform: ${({ menuOpen }) =>
    menuOpen ? "rotate(45deg)" : "rotate(0)"};
    }

    :nth-child(2) {
      transform: ${({ menuOpen }) =>
    menuOpen ? "translateX(200px)" : "translateX(0)"};
    }

    :nth-child(3) {
      transform: ${({ menuOpen }) =>
    menuOpen ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`;

const MenuLinks = styled.nav`
${color}
${typography}
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  transition: transform 300ms;
  transform: ${({ menuOpen }) =>
    menuOpen ? "translateX(-0)" : "translateX(100%)"};

  ul {
    width: 100%;
    margin: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: flex;

    li {
      list-style: none;

      a {
        text-decoration: none;
        color: white;
        font-size: inherit;

        &:hover {
          color: yellow;
        }
      }
    }
  }
`;
