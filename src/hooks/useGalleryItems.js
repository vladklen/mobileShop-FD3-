import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useGalleryItems = ({ items }) => {
    const [searchParams, setSearchParams] = useSearchParams('');
    const pageQuery = searchParams.get('page');
    const sortQuery = searchParams.get('sort');
    const searchQuery = searchParams.get('search') || '';
    const colorsQuery = searchParams.get('colors') || '';
    const categoryQuery = searchParams.get('brands') || '';

    const sortItems = useMemo(() => {
        const sortedItems = [...items];

        if (!sortQuery) {
            return sortedItems;
        }
        if (sortQuery === 'priceDesc') {
            return sortedItems.sort((a, b) => (a.price > b.price ? -1 : 1));
        }
        if (sortQuery === 'priceAsc') {
            return sortedItems.sort((a, b) => (a.price < b.price ? -1 : 1));
        }
        if (sortQuery === 'nameDesc') {
            return sortedItems.sort((a, b) => (a.category < b.category ? -1 : 1));
        }
        if (sortQuery === 'nameAsc') {
            return sortedItems.sort((a, b) => (a.category > b.category ? -1 : 1));
        }
    }, [items, sortQuery]);

    const sortAndSearchItems = useMemo(() => {
        if (!searchQuery) {
            return sortItems;
        }
        return sortItems.filter((item) => item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [sortItems, searchQuery]);

    const sortAndSearchAndFilterColorItems = useMemo(() => {
        if (!colorsQuery) {
            return sortAndSearchItems;
        }
        return sortAndSearchItems.filter((item) => colorsQuery.includes(item.color));
    }, [sortAndSearchItems, colorsQuery]);

    const sortAndSearchAndFilterBrandItems = useMemo(() => {
        if (!categoryQuery) {
            return sortAndSearchAndFilterColorItems;
        }

        return sortAndSearchAndFilterColorItems.filter((item) => categoryQuery.includes(item.category));
    }, [sortAndSearchAndFilterColorItems, categoryQuery]);

    const handleRemoveQuery = () => {
        if (searchParams.has('sort')) {
            searchParams.delete('sort');
        }
        if (searchParams.has('colors')) {
            searchParams.delete('colors');
        }
        if (searchParams.has('search')) {
            searchParams.delete('search');
        }
        if (searchParams.has('brands')) {
            searchParams.delete('brands');
        }
        setSearchParams(searchParams, {
            replace: true
        });
    };

    return {
        sortAndSearchAndFilterBrandItems,
        pageQuery,
        sortQuery,
        searchQuery,
        searchParams,
        setSearchParams,
        handleRemoveQuery
    };
};
