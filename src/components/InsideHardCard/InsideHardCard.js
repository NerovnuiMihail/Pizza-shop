import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPizzaItem, setCostExtra, ChangeSelectExtra } from '../../store/basketSlice';
import CaloriesCard from '../CaloriesCard/CaloriesCard';
import InsideSelect from './InsideSelect/InsideSelect';
import ExtraSelect from './extraSelect/ExtraSelect';
import addFiltredPizzaToBasket from '../../services/addFiltredPizzaToBasket';
import useNum from '../../services/useNum';
import info from './info.png';
import close from './close.png';

import './InsideHardCard.css';


const InsideHardCard = ({setIsVisible, id, pageName, price, dough, img: {thin,traditional}, name, calories, description, additionally}) => {
    const [hideCalories, setHideCalories] = useState(true);
    const basket = useSelector(state => state.basket.basket.pizza);
    const costExtra = useSelector(state => state.basket.basket.costExtra);
    const selectExtra = useSelector(state => state.basket.basket.selectExtra);
    const {dough: rDough, size: rSize} = useSelector(state => state.shop.selectPizza);
    const dispatch = useDispatch();
    const [someNum] = useNum(pageName);

    // console.log('description',description);
    // console.log('additionally',additionally);

    let descr;

    if (description) {
        descr = description.slice().split(',').join(', ').toLowerCase();
    } else {
        descr = additionally.default.slice().join(', ').toLowerCase();
    }

    useEffect(() => {
        document.body.addEventListener('click', handleClick);
        dispatch(setCostExtra(price[rSize]));

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
        if (e.target.classList.contains("inside-hard-card__close") || e.target.classList.contains("inside-hard-card__close-img") || e.target.id === "modal-root") {
            hidePortal();
        }
    }

    const toggleHideCalories = () => {
        setHideCalories(hideCalories => !hideCalories);
    }

    const handleAddItemInBasket = () => {
        const basketItem = {
            id: id,
            img: {thin, traditional},
            name: name,
            weight: dough[rDough].weight[rSize],
            size: rSize,
            dough: rDough,
            extra: [...selectExtra],
            cost: costExtra,
            count: 1,
            pageName,
            num: someNum() + 1
        };

        dispatch(addNewPizzaItem(addFiltredPizzaToBasket(basket, basketItem)));
        dispatch(ChangeSelectExtra([]));

        hidePortal();
        // добавить информирование о добавлении в корзину
    };

    return (
        <div className="inside-hard-card">
            <div className="inside-hard-card__view-img">
                <img src={rDough === "traditional" ? traditional : thin} alt={name} />
            </div>
            <div className="inside-hard-card__content-wrapper">
                <h2 className="inside-hard-card__title">{name}</h2>
                <p className="inside-hard-card__filtred-value">
                    <span>{rSize} см</span>,
                    <span> {rDough === "traditional" ? "традиционное тесто" : "тонкое тесто"}</span>,
                    <span> {dough[rDough].weight[rSize]} г</span>
                </p>
                <div className="inside-hard-card__action-btn">
                    <div className="inside-hard-card__close">
                        <img src={close} 
                            alt="exit" 
                            className="inside-hard-card__close-img" />
                    </div>
                    {calories ? <img 
                                    onClick={toggleHideCalories}
                                    src={info} 
                                    alt="calories-info" 
                                    className="inside-hard-card__info-img" /> : null}
                    {hideCalories ? null : (
                                <div className="calories-hide-wrapper">
                                    <CaloriesCard calories={calories} />
                                </div>
                    )}
                </div>
                <p className="inside-hard-card__description">{descr}</p>

                <InsideSelect price={price} />
                
                <ExtraSelect />

                <button
                    onClick={handleAddItemInBasket} 
                    className="inside-hard-card__btn">Добавить в корзину за {costExtra} &#x20bd;</button>
            </div>
        </div>
    )
}

export default InsideHardCard;