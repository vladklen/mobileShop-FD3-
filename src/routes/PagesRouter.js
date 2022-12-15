import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';
import { PageProducts } from '../pages/PageProducts';
import { HomePage } from '../pages/HomePage';

import NotFound from '../components/NotFound';
import { ContactsPage } from '../pages/ContactsPage';

export const PagesRouter = () => {
    return (
        <Routes>
            <Route element={<MainPage />}>
                <Route path="/" index element={<HomePage />} />
                <Route path="products/" element={<PageProducts />} />
                <Route path="products/:descriptionSlug" element={<PageProducts />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};
