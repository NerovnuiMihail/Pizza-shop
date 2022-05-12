import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BasketItem from './BasketItem';
import {
    addNewPizzaItem,
    addNewDessertItem,
    addNewDrinksItem,
    addNewSnacksItem,
    addNewCombosItem,
    ChangeSelectExtra,
    setCostExtra
} from '../../store/basketSlice';
import pizzaImg from './img/pizza.png';
import snacksImg from './img/snacks.png';
import drinksImg from './img/drinks.png';
import dessertsImg from './img/desserts.png';

import './BasketPage.css';

const BasketPage = () => {
    const pizzaItems = useSelector(state => state.basket.basket.pizza);
    const combosItems = useSelector(state => state.basket.basket.combos);
    const snacksItems = useSelector(state => state.basket.basket.snacks);
    const drinksItems = useSelector(state => state.basket.basket.drinks);
    const dessertItems = useSelector(state => state.basket.basket.dessert);
    const dispatch = useDispatch();

    const sortedPizza = pizzaItems.slice().sort((a,b) => a.num - b.num);
    const sortedCombos = combosItems.slice().sort((a,b) => a.num - b.num);
    const sortedSnacks = snacksItems.slice().sort((a,b) => a.num - b.num);
    const sortedDrinks = drinksItems.slice().sort((a,b) => a.num - b.num);
    const sortedDessert = dessertItems.slice().sort((a,b) => a.num - b.num);

    const calculateTotalCost = () => {
        const pizzaCost = pizzaItems.reduce((prev, current) => prev + (+current.cost * +current.count), 0);
        const snacksCost = snacksItems.reduce((prev, current) => prev + (+current.cost * +current.count), 0);
        const drinksCost = drinksItems.reduce((prev, current) => prev + (+current.cost * +current.count), 0);
        const dessertCost = dessertItems.reduce((prev, current) => prev + (+current.cost * +current.count), 0);

        return pizzaCost + dessertCost + drinksCost + snacksCost;
    }

    const handleDeleteBasketAllItems = (oldData, newData) => {
        const filtredOldData = oldData.filter(item => item.key !== newData.key);
        switchDeleteBasket(newData, filtredOldData);
    };

    const handleDeleteBasketItem = (oldData, newData) => {
        const counter = newData.count - 1;
        const filtredOldData = oldData.filter(item => item.key !== newData.key);
        const currentData = {...newData, count: counter};

        if (counter === 0) {
            switchDeleteBasket(newData, filtredOldData);
        } else {
            switchAddBasket(newData, filtredOldData, currentData);
        }
    };

    const handleAddBasketItem = (oldData, newData) => {
        const counter = newData.count + 1;
        const filtredOldData = oldData.filter(item => item.key !== newData.key);
        const currentData = {...newData, count: counter};

        switchAddBasket(newData, filtredOldData, currentData);
    };

    const switchDeleteBasket = (newData, filtredOldData) => {
        switch (newData.pageName) {
            case "pizza":
                dispatch(addNewPizzaItem(filtredOldData));
                break;
            case "dessert":
                dispatch(addNewDessertItem(filtredOldData));
                break;
            case "drinks":
                dispatch(addNewDrinksItem(filtredOldData));
                break;
            case "snacks":
                dispatch(addNewSnacksItem(filtredOldData));
                break;
            case "combos":
                dispatch(addNewCombosItem(filtredOldData));
                break;
        
            default:
                break;
        }
    };

    const switchAddBasket = (newData, filtredOldData, currentData) => {
        switch (newData.pageName) {
            case "pizza":
                dispatch(addNewPizzaItem([...filtredOldData, currentData]));
                break;
            case "dessert":
                dispatch(addNewDessertItem([...filtredOldData, currentData]));
                break;
            case "drinks":
                dispatch(addNewDrinksItem([...filtredOldData, currentData]));
                break;
            case "snacks":
                dispatch(addNewSnacksItem([...filtredOldData, currentData]));
                break;
            case "combos":
                dispatch(addNewCombosItem([...filtredOldData, currentData]));
                break;
        
            default:
                break;
        }
    };

    const handleClearBasket = () => {
        dispatch(addNewPizzaItem([]));
        dispatch(addNewDessertItem([]));
        dispatch(addNewDrinksItem([]));
        dispatch(addNewSnacksItem([]));
        dispatch(addNewCombosItem([]));
        dispatch(ChangeSelectExtra([]));
        dispatch(setCostExtra(0));
    };

    const visibleContent = () => {
        return pizzaItems.length || snacksItems.length || drinksItems.length || dessertItems.length > 0
    }

    const BasketMinimalCost = !visibleContent() ? null : (<div className="basket-minimal-cost">Минимальная сумма заказа 649 &#x20bd;</div>);
    const BasketPlaceHolder = visibleContent() ? null : (<div className="basketplaceholder">
                                                            <h2 className="basketplaceholder__title">Корзина пуста...</h2>
                                                            <div className="basketplaceholder__imgs">
                                                                <img src={pizzaImg} alt="pizza" />
                                                                <img src={snacksImg} alt="snacks" />
                                                                <img src={drinksImg} alt="drinks" />
                                                                <img src={dessertsImg} alt="desserts" />
                                                            </div>
                                                            <h2 className="basketplaceholder__title">Мы доставим ваш заказ от 649 ₽</h2>
                                                        </div>);

    const BasketContent = [sortedPizza, sortedCombos, sortedSnacks, sortedDrinks, sortedDessert].map(itemArr => !itemArr ? null : 
        itemArr.map(itemBasket => <BasketItem 
                    key={itemBasket.key} 
                    {...itemBasket} 
                    handleDeleteBasketAllItems={() => handleDeleteBasketAllItems(itemArr, itemBasket)}
                    handleDeleteBasketItem={() => handleDeleteBasketItem(itemArr, itemBasket)}
                    handleAddBasketItem={() => handleAddBasketItem(itemArr, itemBasket)} />
                ));

    return (
        <div className="basket-wrapper">
            <div className="basket-status">
                <div className="status-steps">
                    <div className="status-steps__number active-number">1</div>
                    <div className="status-steps__line"></div>
                    <div className="status-steps__number">2</div>
                    <div className="status-steps__line"></div>
                    <div className="status-steps__number">3</div>
                </div>
                <div className="status-descr">
                    <div className="status-descr__text">Корзина</div>
                    <div className="status-descr__text">Оформление</div>
                    <div className="status-descr__text">Заказ оформлен</div>
                </div>
            </div>

            {BasketPlaceHolder}

            {BasketContent}

            {calculateTotalCost() > 649 ? null : BasketMinimalCost}

            <div className="basket-info">
                <button 
                    onClick={handleClearBasket} 
                    disabled={calculateTotalCost() !== 0 ? false : true} 
                    className="basket-clear-btn">Очистить корзину</button>
                <div className="basket-total-cost">Сумма заказа: {calculateTotalCost()} &#x20bd;</div>
            </div>
            
            <Link to="/basketregistration">
                <button 
                    disabled={calculateTotalCost() > 649 ? false : true} 
                    className="basket-next-page">Перейти к оформлению</button>
            </Link>
        </div>
    );
}

export default BasketPage;