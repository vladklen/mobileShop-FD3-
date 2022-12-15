import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './ContactsPage.css';

export const ContactsPage = () => {
    const defaultState = {
        center: [53.901515, 27.558426],
        zoom: 16
    };

    return (
        <div className="Contacts">
            <h2>Contacts</h2>
            <div className="contacts__block">
                <div className="contacts__info">
                    <p className="contacts__title">MobiStore</p>
                    <p>Lenina str. 5, Minsk, Belarus</p>
                    <p>Mn – Su: 10:00 – 22:00</p>
                    <p>+375 29 600 00 00</p>
                </div>
                <YMaps>
                    <Map width={'100%'} height={'600px'} className="contacts__map" defaultState={defaultState}>
                        <Placemark geometry={[53.901515, 27.558426]} />
                    </Map>
                </YMaps>
            </div>
        </div>
    );
};
