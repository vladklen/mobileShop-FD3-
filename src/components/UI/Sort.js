import './Sort.css';

const Sort = ({ options, label, name, setSearchParams, searchParams }) => {
    const handlerSort = (e) => {
        searchParams.set('sort', e.target.value);
        setSearchParams(searchParams, {
            replace: true
        });
    };

    return (
        <select className="Sort" name={name} defaultValue={''} onChange={handlerSort}>
            <option value="" disabled>
                {label}
            </option>
            {options.map((option, i) => (
                <option key={i} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Sort;
