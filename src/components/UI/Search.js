import { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { Button } from '@mui/material';

import './Search.css';

const Search = ({ setSearchParams, searchQuery, searchParams }) => {
    const [searchForm, setSearchForm] = useState(searchQuery.toString());
    const [focused, setFocused] = useState(false);
    const [inputValid, setInputValid] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchParams.set('search', searchForm);
        setSearchParams(searchParams, {
            replace: true
        });
        if (searchForm.trim().length === 0) {
            setInputValid(false);
            return null;
        }
    };

    const handleChange = (e) => {
        setSearchForm(e.target.value);
        searchParams.delete('search', searchForm);
        setSearchParams(searchParams, {
            replace: true
        });
    };
    const placeholderText = inputValid ? 'Enter items name' : 'Please enter items name...';

    return (
        <div className="Search">
            <form
                className={'search__form' + (focused ? ' form_focused' : '')}
                autoComplete={'off'}
                onSubmit={handleSubmit}
            >
                <label htmlFor="search">
                    <RiSearch2Line className={'search__icon' + (focused ? ' blue' : '')} />
                </label>
                <input
                    className="search__input"
                    type="search"
                    value={searchForm}
                    placeholder={placeholderText}
                    onFocus={() => setFocused((focus) => !focus)}
                    onBlur={() => setFocused(false)}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" size="small">
                    Search
                </Button>
            </form>
        </div>
    );
};

export default Search;
