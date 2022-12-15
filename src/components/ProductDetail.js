import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { MainContext } from '../context';

const ProductDetail = (props) => {
    const { items } = useContext(MainContext);

    const params = useParams();
    const navigate = useNavigate();

    const productDetailItem = items.find((item) => item.description === params.descriptionSlug);

    useEffect(() => {
        if (!productDetailItem) {
            navigate('..', { relative: 'path' });
        }
    }, [productDetailItem, navigate]);

    return (
        <div>
            <p>{productDetailItem?.description}</p>
            <div>
                <img src={productDetailItem?.img} alt={productDetailItem?.description} />
            </div>
            <p>{productDetailItem?.category}</p>
            <p>{productDetailItem?.color}</p>
            <p>{productDetailItem?.price}</p>
            <Link to=".." relative="path">
                {'All Products'}
            </Link>
        </div>
    );
};

export default ProductDetail;
