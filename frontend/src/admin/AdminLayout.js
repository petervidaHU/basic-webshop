import React, { useState } from 'react';
import { color, layout, flexbox, space } from 'styled-system';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const AdminLayout = ({ children = null, }) => {
  
  const history = useHistory();
  const [activeMenuItem, setActiveMenuItem] = useState(' ');

  const menuClick = (e) => {
    history.push(e.target.dataset.targetroute);
    setActiveMenuItem(e.target.dataset.component);
  };

  return (
    <MainContainer
      display={['flex']}
      width={[1]}
      >
      <AsideStyled
        display={['none', null, 'flex']}
        width={[2 / 12]}
        
        >
        <AdminMenu
          activeMenuItem={activeMenuItem}
          menuClick={menuClick}
          />
      </AsideStyled>

      <MainStyled
        display={['block']}
        width={[1]}
      >
        {children}
      </MainStyled>

    </MainContainer>
  );
};

export default AdminLayout;

const MainContainer = styled.main`
${layout}
margin: 0;
`;

const MainStyled = styled.div`
${layout}
flex-grow: 2;
`;

const AsideStyled = styled.aside`
${layout}
padding: 1rem;
background-color: darkgray;
flex-direction: column;
//align-items: stretch;
//justify-content: stretch;
min-height: 100vh;
`;

AdminLayout.defaultProps = {
  children: null,
};

AdminLayout.propTypes = {
  children: PropTypes.node,
};
