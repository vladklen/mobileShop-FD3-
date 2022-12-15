import './Item.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { Button } from '@mui/material';

const Item = (props) => {
    const { item } = props;
    const dispatch = useDispatch();
    const client = useSelector((state) => state.person.name);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="Item">
            <Link className="item__title" to={item.description}>
                <p>{item.description}</p>
            </Link>
            <div className="item__content">
                <div className="content__image">
                    <img src={item.img} alt={item.description} />
                </div>
                <ul className="content__description">
                    <li>Brand: {item.category}</li>
                    <li>Color: {item.color}</li>
                    <li>Price: {item.price} BYN</li>
                </ul>
            </div>
            <Button disabled={client ? false : true} variant="outlined" onClick={() => handleAddToCart(item)}>
                Add To Cart
            </Button>
        </div>
    );
};

export default Item;
