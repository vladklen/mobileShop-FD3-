import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogOut from './LogOut';
import Login from './Login';
import Register from './Register';
import './Header.css';

const Header = (props) => {
    const classLinkColor = ({ isActive }) => (isActive ? 'activeLink' : 'link');
    const client = useSelector((state) => state.person.name);
    const clienCart = useSelector((state) => state.cart);
    const [modalActive, setModalActive] = useState(false);
    const [regModalActive, setRegModalActive] = useState(false);
    const [hambMeny, setHambMeny] = useState(false);

    return (
        <header className="Header">
            <h2 className="header__logo">MobiStore</h2>
            <nav className={hambMeny ? 'header__nav active' : 'header__nav closed'}>
                <NavLink className={classLinkColor} to="." end>
                    {'Home'}
                </NavLink>
                <NavLink className={classLinkColor} to="products/?page=1">
                    {'Products'}
                </NavLink>
                <NavLink className={classLinkColor} to="contacts">
                    {'Contacts'}
                </NavLink>
            </nav>
            <div className="header__login">
                {!hambMeny && (
                    <MenuIcon
                        className={!hambMeny ? 'hamburger_close active' : 'hamburger_close inactive'}
                        onClick={() => setHambMeny(true)}
                    />
                )}
                {hambMeny && (
                    <MenuOpenIcon
                        className={hambMeny ? 'hamburger_open active' : 'hamburger_open inactive'}
                        onClick={() => setHambMeny(false)}
                    />
                )}
                {!client && <p onClick={() => setModalActive(true)}>Login</p>}
                {client && (
                    <div className="header__cart">
                        <p>{client}</p>
                        <NavLink className={classLinkColor} to="Cart">
                            <Badge color="secondary" overlap="rectangular" badgeContent={clienCart.cartQuantity}>
                                <ShoppingCartIcon />{' '}
                            </Badge>
                        </NavLink>
                        <LogOut />
                    </div>
                )}
                {(modalActive || regModalActive) && (
                    <div className="login__form">
                        <Login
                            active={modalActive}
                            setActive={setModalActive}
                            regModal={regModalActive}
                            setRegModal={setRegModalActive}
                        />
                        <Register active={regModalActive} setActive={setRegModalActive} setLogModal={setModalActive} />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
