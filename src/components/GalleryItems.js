import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

import Item from './Item';
import { MainContext } from '../context';
import Sort from './UI/Sort';
import Search from './UI/Search';
import Pagination from './Pagination';

import './GalleryItems.css';
import ColorFilter from './UI/Filter/ColorFilter';
import BrandFilter from './UI/Filter/BrandFilter';
import { useGalleryItems } from '../hooks/useGalleryItems';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const GalleryItems = () => {
    const { items } = useContext(MainContext);

    const { sortAndSearchAndFilterBrandItems, pageQuery, sortQuery, searchQuery, searchParams, setSearchParams } =
        useGalleryItems({
            items
        });

    const [itemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterHide, setFilterHide] = useState(true);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const location = useLocation();
    const navigation = useNavigate();

    useEffect(() => {
        if (searchParams.has('brands') || searchParams.has('colors')) {
            setCurrentPage(1);
            searchParams.set('page', 1);
            setSearchParams(searchParams, {
                replace: true
            });
        } else {
            pageQuery === null ? setCurrentPage(1) : setCurrentPage(parseInt(pageQuery));
        }
    }, [searchParams]);

    useEffect(() => {
        if (location.search === '') {
            navigation('/products/?page=1');
        }
    }, [location, navigation]);

    const currentItems = useMemo(() => {
        return sortAndSearchAndFilterBrandItems.slice(indexOfFirstItem, indexOfLastItem);
    }, [sortAndSearchAndFilterBrandItems, indexOfFirstItem, indexOfLastItem]);

    return (
        <div className="GalleryItems">
            <h2>Mobile Phones</h2>
            {items.length > 0 ? (
                <div className="gallery__root">
                    <div
                        className={!filterHide ? 'filterHide__close active' : 'filterHide__close inactive'}
                        onClick={() => setFilterHide(!filterHide)}
                    >
                        Filter
                        {filterHide && <ArrowForwardIosIcon />}
                        {!filterHide && <ArrowBackIosIcon />}
                    </div>
                    <div className={!filterHide ? 'gallery__filter active' : 'gallery__filter inactive'}>
                        <ColorFilter />
                        <BrandFilter />
                    </div>

                    <div className="gallery__content">
                        <div className="searchSort__wrapper">
                            <Search
                                setSearchParams={setSearchParams}
                                searchQuery={searchQuery}
                                searchParams={searchParams}
                            />
                            <Sort
                                searchParams={searchParams}
                                setSearchParams={setSearchParams}
                                sortQuery={sortQuery}
                                label="Sort by"
                                name="sort"
                                options={[
                                    {
                                        label: 'NameA-Z',
                                        value: 'nameDesc'
                                    },
                                    {
                                        label: 'NameZ-A',
                                        value: 'nameAsc'
                                    },
                                    {
                                        label: 'Price High',
                                        value: 'priceDesc'
                                    },
                                    {
                                        label: 'Price Low',
                                        value: 'priceAsc'
                                    }
                                ]}
                            />
                        </div>
                        <div className="gallery__wrapper">
                            {currentItems.map((item) => (
                                <Item item={item} key={item.id} />
                            ))}
                        </div>
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={sortAndSearchAndFilterBrandItems.length}
                            currentPage={currentPage}
                            searchParams={searchParams}
                        />
                    </div>
                </div>
            ) : (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
};

export default GalleryItems;
