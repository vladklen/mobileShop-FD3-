import { BrowserRouter } from 'react-router-dom';

import { PagesRouter } from './routes/PagesRouter';
import { MainContext } from './context';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { collection, onSnapshot } from 'firebase/firestore';

import { useEffect, useState } from 'react';

import { db } from './firebase';

const App = () => {
    const [items, setItem] = useState([]);

    useEffect(() => {
        const data = onSnapshot(collection(db, 'phones'), (querySnapshot) => {
            let dataPhones = [];
            querySnapshot.forEach((doc) => {
                dataPhones.push({ ...doc.data(), id: doc.data().id });
            });
            setItem(dataPhones);
        });
        return () => data();
    }, []);

    return (
        <Provider store={store}>
            <MainContext.Provider value={{ items }}>
                <BrowserRouter>
                    <div className="App">
                        <PagesRouter className="App" />
                    </div>
                </BrowserRouter>
            </MainContext.Provider>
        </Provider>
    );
};

export default App;
