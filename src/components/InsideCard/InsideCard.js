import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewDessertItem, addNewDrinksItem, addNewSnacksItem } from '../../store/basketSlice';
import CaloriesCard from '../CaloriesCard/CaloriesCard';
import addItemWithFilterToBasket from '../../services/addItemWithFilterToBasket';
import info from './info.png';
import close from './close.png';

import './InsideCard.css';

const InsideCard = ({setIsVisible, calories, id, img, name, weight, description, pageName, price}) => {
    const [hideCalories, setHideCalories] = useState(true);
    const basket = useSelector(state => state.basket.basket[pageName]);
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
        }
         // eslint-disable-next-line
    }, []);

    const hidePortal = () => {
        document.body.style.overflow = "";
        document.querySelector('#modal-root').style.display = "none";
        document.querySelector('.header').style.marginRight = "";
        setIsVisible(false);
    }

    const handleClick = (e) => {
        if (e.target.classList.contains("inside-card__close") || e.target.classList.contains("inside-card__close-img") || e.target.id === "modal-root") {
            hidePortal();
        }
    }

    const toggleHideCalories = () => {
        setHideCalories(hideCalories => !hideCalories);
    }

    const handleAddItemInBasket = () => {
        const basketItem = {
            id: id,
            img,
            name: name,
            weight: weight,
            cost: price,
            count: 1
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

        hidePortal();
        // добавить информирование о добавлении в корзину
    }

    return (
        <div className="inside-card">
            <div className="inside-card__wrap">
                <div className="inside-card__action-btn">
                    <div className="inside-card__close">
                        <img src={close} 
                            alt="exit" 
                            className="inside-card__close-img" />
                    </div>
                    {calories ? <img 
                                    onClick={toggleHideCalories}
                                    src={info} 
                                    alt="calories-info" 
                                    className="inside-card__info-img" /> : null}
                    {hideCalories ? null : (
                                <div className="calories-hide-wrapper">
                                    <CaloriesCard calories={calories} />
                                </div>
                    )}
                </div>
            </div>
            <div className="inside-card__img">
                <img src={img} alt={name} />
            </div>
            <div className="inside-card__descr">
                <div className="inside-card__descr-top">
                    <h2 className="inside-card__title">{name}</h2>
                    <p className="inside-card__weight">{weight}</p>
                    <p className="inside-card__description">{description}</p>
                </div>
                <button onClick={handleAddItemInBasket} className="inside-card__btn">{price} &#x20bd;</button>
            </div>
        </div>
    );
}

export default InsideCard;