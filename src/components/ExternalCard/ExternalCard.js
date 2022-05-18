import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addNewDessertItem, addNewDrinksItem, addNewSnacksItem } from '../../store/basketSlice';
import addItemWithFilterToBasket from '../../services/addItemWithFilterToBasket';
import useApiData from '../../services/useApiData';
import useNum from '../../services/useNum';
import Portal from '../Portal/Portal';

import './ExternalCard.css';


const ExternalCard = ({img, image, price, cost, name, description, btnName, Inside, pageName, id, weight, ...props}) => {
    const [isVisible, setIsVisible] = useState(false);
    const basket = useSelector(state => state.basket.basket[pageName]);
    const dispatch = useDispatch();
    const [someNum] = useNum(pageName);

    const location = useLocation();

    const [,,, getRequestP] = useApiData("pizza");
    const [,,, getRequestDe] = useApiData("dessert");
    const [,,, getRequestDr] = useApiData("drinks");

    const pizza = useSelector(state => state.shop.pizza);
    const dessert = useSelector(state => state.shop.dessert);
    const drinks = useSelector(state => state.shop.drinks);

    useEffect(() => {
        if(location.pathname === "/combos") {
            if (pizza.length < 1 || dessert.length < 1 || drinks.length < 1) {
                getRequestP("http://localhost:3001/api/pizza");
                getRequestDe("http://localhost:3001/api/dessert");
                getRequestDr("http://localhost:3001/api/drinks");
            }
        }
        // eslint-disable-next-line
    }, []);

    const handleClick = (e) => {
        if (e.target.localName !== 'button' || btnName === "Выбрать") {
            document.querySelector('#modal-root').style.display = 'block';
            document.querySelector('.header').style.marginRight = "17px";
            document.body.style.overflow = 'hidden';
            setIsVisible(true);
        }
    }

    const handleAddItemInBasket = () => {
        const basketItem = {
            id: id,
            img,
            name: name,
            weight: weight,
            cost: price,
            count: 1,
            pageName,
            num: someNum() + 1
        };

        switch (pageName) {
            case "snacks":
                dispatch(addNewSnacksItem(addItemWithFilterToBasket(basket, basketItem)));
                break;
            case "drinks":
                dispatch(addNewDrinksItem(addItemWithFilterToBasket(basket, basketItem)));
                break;
            case "dessert":
                dispatch(addNewDessertItem(addItemWithFilterToBasket(basket, basketItem)));
                break;
        
            default:
                break;
        }

        // добавить информирование о добавлении в корзину
    }

    return (
        <>
            <div onClick={handleClick} className="ExternalCard">
                <div className="ExternalCard__main">
                    <div className='ExternalCard__img'>
                        <img src={image ? image : img} alt={name} />
                    </div>
                    <h2>{name}</h2>
                    <p className='ExternalCard__description'>{description}</p>
                </div>
                <div className='ExternalCard__footer'>
                    <p className='ExternalCard__cost'>{cost ? cost : price} &#x20bd; </p>
                    {btnName === "Выбрать" ? <button>{btnName}</button> : <button onClick={handleAddItemInBasket}>{btnName}</button>}
                </div>
            </div>

            {!isVisible ? null : (
                <Portal>
                    <Inside 
                        setIsVisible={setIsVisible} 
                        {...props}
                        pageName={pageName}
                        id={id}
                        weight={weight}
                        img={img} 
                        image={image}
                        name={name} 
                        description={description} 
                        price={price} />
                </Portal>
            )}
        </>
    )
}

export default ExternalCard;