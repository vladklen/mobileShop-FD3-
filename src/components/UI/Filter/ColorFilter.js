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
    const searchArray = searchParams.get('colors')?.split(',') ?? [];

    const [colors, setColors] = useState(searchArray);

    const allColors = getValues(items, 'color');

    const groupedColors = allColors
        .map((color) => ({
            label: color,
            name: color,
            value: color
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
            let colorsCopy = [...colors];
            const isChecked = e.target.checked;

            if (isChecked) {
                colorsCopy.push(checkedColor);
            } else {
                colorsCopy = colorsCopy.filter((colorCopyItem) => {
                    return colorCopyItem !== checkedColor;
                });
            }

            setColors(colorsCopy);
        };
    };

    const hasFilters = searchArray.length > 0;

    return (
        <ListFilter
            defaultVisible={hasFilters}
            title="Color"
            actionButton={
                <ToggleFilter
                    visible={colors.length > 0}
                    active={hasFilters}
                    onApply={() => {
                        searchParams.set('colors', colors.join(','));
                        setSearchParams(searchParams, {
                            replace: true
                        });
                    }}
                    onClear={() => {
                        searchParams.delete('colors');
                        setColors([]);
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
                            checked={colors.includes(field.value)}
                        ></Checkbox>
                        <label htmlFor={field.name}>{field.label}</label>
                    </div>
                </li>
            ))}
        </ListFilter>
    );
};

export default ColorFilter;
