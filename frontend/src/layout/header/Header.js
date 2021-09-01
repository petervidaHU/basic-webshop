import React from 'react';
import DesktopNavMenu from './DesktopNav';

const defaultMenuItems = [
    {
        name: 'Kategóriák',
        path: 'kategoriak'
    },
    {
        name: 'Rólunk',
        path: 'rolunk'
    },
    {
        name: 'Akciók',
        path: 'sale'
    },
];

const loggedInMenuItems = [
];

const mereMortalMenuItems = [
];

const user = null;

const Header = () => {

    const menuItems = defaultMenuItems.concat(user ? loggedInMenuItems : mereMortalMenuItems)

    return (
        <header>
            <DesktopNavMenu menuItems={menuItems} />
        </header>
    )
}

export default Header
