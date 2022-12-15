import React from 'react';
import background from '../img/mainbg.jpg';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import './HomePage.css';

export const HomePage = () => {
    return (
        <div className="HomePage">
            <img src={background} />
            <div className="content">
                <div className="content__title">
                    <h1>MobiStore</h1>
                    <h2>The World’s Best and cheapest Phones</h2>
                    <Button variant="outlined" sx={{ color: 'white', backgroundColor: 'none', borderColor: 'white' }}>
                        <NavLink className="content__button" to="products/?page=1">
                            {'Start shopping'}
                        </NavLink>
                    </Button>
                </div>
            </div>
        </div>
    );
};
