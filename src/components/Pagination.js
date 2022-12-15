import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

import './Pagination.css';

const Pagination = ({ itemsPerPage, totalItems, currentPage, searchParams }) => {
    const pageNumbers = [];
    const { search } = useLocation();

    const parseString = useMemo(() => {
        const stringQuery = search
            .split('&')
            .filter((el) => !el.includes('page'))
            .join('&');
        if (
            searchParams.has('sort') ||
            searchParams.has('search') ||
            searchParams.has('colors') ||
            searchParams.has('brands')
        ) {
            return `&${stringQuery}`;
        } else {
            return '';
        }
    }, [searchParams, search]);

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="Pagination">
            <ul className="Pagination__list">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <Link
                            to={`?page=${number}${parseString}`}
                            className={number === currentPage ? 'Pagination__item active' : 'Pagination__item'}
                        >
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
