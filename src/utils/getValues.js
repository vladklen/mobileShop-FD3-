export const getValues = (items, key) => {
    const set = new Set();

    items.forEach((item) => {
        const value = item[key];

        if (Array.isArray(value)) {
            value.forEach((v) => set.add(v));
        } else {
            set.add(value);
        }
    });

    return Array.from(set);
};

//get colors, brands from array
