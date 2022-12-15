import React from 'react';
import { Button } from '@mui/material';

const ToggleFilter = (props) => {
    const { active, visible, onClear, onApply } = props;
    if (active) {
        return (
            <Button variant="contained" size="small" onClick={onClear} color="error">
                Clear filter
            </Button>
        );
    }

    if (visible) {
        return (
            <Button variant="contained" size="small" onClick={onApply} color="success">
                Apply filter
            </Button>
        );
    }

    return null;
};

export default ToggleFilter;
