import { useState } from 'react';

const ListFilter = (props) => {
    const { title, children, actionButton } = props;
    const [visible] = useState(true);

    return (
        <div className="filter__root">
            <div className="filter__button">
                <p>{title}</p>
                {actionButton}
            </div>
            {visible ? <ul className="filter__list">{children}</ul> : null}
        </div>
    );
};

export default ListFilter;
