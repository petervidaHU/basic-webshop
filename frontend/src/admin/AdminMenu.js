import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { H1 } from '../theme/globalElements';
import { color, layout, flexbox, space } from 'styled-system';

const MenuItems = [{
  text: 'Felhasználók',
  targetroute: 'userslist'
},
{
  text: 'Rendelések',
  targetroute: 'orderslist'
},
{
  text: 'Termékek',
  targetroute: 'productslist'
},
{
  text: 'Kategóriák',
  targetroute: 'categorieslist'
},
{
  text: 'Beállítások',
  targetroute: 'settings'
},
]

const AdminMenu = ({ activeMenuItem, menuClick }) => (
  <>
    <div
      className="text-center fw-bold fs-2 py-4"
      // data-component="def"
      onClick={menuClick}
      onKeyDown={menuClick}
      role="button"
      tabIndex={0}
      data-targetroute="/admin"
    >
     <h1> ADMIN </h1>
    </div>
    <ul>
      {MenuItems.map(item=> (
        <MenuItem key={item.targetroute}
        text={item.text}
        isActive={activeMenuItem}
        clickHandler={menuClick}
        targetroute={`/admin/${item.targetroute}`}
      />
      ))}
      
    </ul>
    
  </>
);

export default AdminMenu;

AdminMenu.propTypes = {
  activeMenuItem: PropTypes.string.isRequired,
  menuClick: PropTypes.func.isRequired,
};
