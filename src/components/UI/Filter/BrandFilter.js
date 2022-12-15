import { useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';

import { Checkbox } from '@mui/material';
import ListFilter from './ListFilter';
import ToggleFilter from './ToggleFilter';
import { MainContext } from '../../../context';

import { getValues } from '../../../utils/getValues';

import './ColorFilter.css';

const ColorFilter = (props) => {
    const { items } = useContext(MainContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchArray = searchParams.get('brands')?.split(',') ?? [];

    const [brands, setBrands] = useState(searchArray);

    const allColors = getValues(items, 'category');

    const groupedColors = allColors
        .map((category) => ({
            label: category,
            name: category,
            value: category
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

    const filteredColorQuery = groupedColors.filter((itemColor) => {
        if (searchArray.length === 0) {
            return true;
        }
        return searchArray.includes(itemColor.value);
    });

    const handleColorChange = (checkedColor) => {
        return function (e) {
            let colorsCopy = [...brands];
            const isChecked = e.target.checked;

            if (isChecked) {
                colorsCopy.push(checkedColor);
            } else {
                colorsCopy = colorsCopy.filter((colorCopyItem) => {
                    return colorCopyItem !== checkedColor;
                });
            }

            setBrands(colorsCopy);
        };
    };

    const hasFilters = searchArray.length > 0;

    return (
        <ListFilter
            defaultVisible={hasFilters}
            title="Brand"
            actionButton={
                <ToggleFilter
                    visible={brands.length > 0}
                    active={hasFilters}
                    onApply={() => {
                        searchParams.set('brands', brands.join(','));
                        setSearchParams(searchParams, {
                            replace: true
                        });
                    }}
                    onClear={() => {
                        searchParams.delete('brands');
                        setBrands([]);
                        setSearchParams(searchParams, {
                            replace: true
                        });
                    }}
                />
            }
        >
            {filteredColorQuery.map((field, key) => (
                <li key={key}>
                    <div className="checkbox__root">
                        <Checkbox
                            type="checkbox"
                            id={field.name}
                            name={field.name}
                            disabled={hasFilters}
                            onChange={handleColorChange(field.value)}
                            checked={brands.includes(field.value)}
                        ></Checkbox>
                        <label htmlFor={field.name}>{field.label}</label>
                    </div>
                </li>
            ))}
        </ListFilter>
    );
};

export default ColorFilter;
