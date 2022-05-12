import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import {     
    addNewPizzaItem,
    addNewDessertItem,
    addNewDrinksItem,
    addNewSnacksItem,
    addNewCombosItem
} from '../../../store/basketSlice';


import './BasketRegistration.css';

const BasketRegistration = () => {
    const dispatch = useDispatch();
    const pizzaItems = useSelector(state => state.basket.basket.pizza);
    const combosItems = useSelector(state => state.basket.basket.combos);
    const snacksItems = useSelector(state => state.basket.basket.snacks);
    const drinksItems = useSelector(state => state.basket.basket.drinks);
    const dessertItems = useSelector(state => state.basket.basket.dessert);

    const [isDelivery, setIsDelivery] = useState(true);
    const [isPickup, setIsPickup] = useState(false);
    const refDelivery = useRef(null);
    const refPickup = useRef(null);

    const [nameD, setTextD] = useState("");
    const [telD, setTelD] = useState("");
    const [cityD, setCityD] = useState("");
    const [streetD, setStreetD] = useState("");
    const [commentsD, setCommentsD] = useState("");
    const [houseD, setHouseD] = useState("");
    const [roomD, setRoomD] = useState("");
    const [entranceD, setEntranceD] = useState("");
    const [floorD, setFloorD] = useState("");

    const [nameP, setTextP] = useState("");
    const [telP, setTelP] = useState("");
    const [cityP, setCityP] = useState("");
    const [restaurantP, setRestaurantP] = useState("");
    const [commentsP, setCommentsP] = useState("");

    const [deliveryCash, setDeliveryCash] = useState(false);
    const [deliveryCard, setDeliveryCard] = useState(true);
    const [pickupCash, setPickupCash] = useState(false);
    const [pickupCard, setPickupCard] = useState(true);

    const refdeliveryCash = useRef(null);
    const refdeliveryCard = useRef(null);
    const refpickupCash = useRef(null);
    const refpickupCard = useRef(null);

    const handleSwitchMethodDelivery = (e) => {
        switch (e.target.textContent) {
            case "Доставка":
                if (isDelivery) return;

                setIsDelivery(true);
                setIsPickup(false);
                refDelivery.current.classList.add("titles-item-active");
                refPickup.current.classList.remove("titles-item-active");
                break;

            case "Самовывоз":
                if (isPickup) return;

                setIsDelivery(false);
                setIsPickup(true);
                refDelivery.current.classList.remove("titles-item-active");
                refPickup.current.classList.add("titles-item-active");
                break;
        
            default:
                break;
        }
    };

    const handleChangeRadioMethodDelivery = () => {
        setDeliveryCash(deliveryCash => !deliveryCash);
        setDeliveryCard(deliveryCard => !deliveryCard);
    };

    const handleChangeRadioMethodPickup = () => {
        setPickupCash(pickupCash => !pickupCash);
        setPickupCard(pickupCard => !pickupCard);
    };

    const calculateTotalCost = () => {
        const pizzaCost = pizzaItems.reduce((prev, current) => prev + (+current.cost * +current.count), 0);
        const snacksCost = snacksItems.reduce((prev, current) => prev + (+current.cost * +current.count), 0);
        const drinksCost = drinksItems.reduce((prev, current) => prev + (+current.cost * +current.count), 0);
        const dessertCost = dessertItems.reduce((prev, current) => prev + (+current.cost * +current.count), 0);

        return pizzaCost + dessertCost + drinksCost + snacksCost;
    }

    const sendBasketAndBuyerToBD = async () => {
        const URL = "http://localhost:3001/api/basket";
        const currentBasket = [];
        let happyBuyer;

        if (pizzaItems.length > 0) {
            const newBasket = pizzaItems.map(item => {
                return {
                    id: item.id,
                    title: "pizza",
                    name: item.name,
                    size: item.size,
                    dough: item.dough,
                    cost: item.cost,
                    count: item.count
                }
            });

            currentBasket.push(...newBasket);
        }
        if (combosItems.length > 0) {
            const newBasket = combosItems.map(item => {
                return {
                    id: item.id,
                    title: "snacks",
                    name: item.name,
                    cost: item.cost,
                    count: item.count
                }
            });

            currentBasket.push(...newBasket);
        }
        if (snacksItems.length > 0) {
            const newBasket = snacksItems.map(item => {
                return {
                    id: item.id,
                    title: "snacks",
                    name: item.name,
                    cost: item.cost,
                    count: item.count
                }
            });

            currentBasket.push(...newBasket);
        }
        if (drinksItems.length > 0) {
            const newBasket = drinksItems.map(item => {
                return {
                    id: item.id,
                    title: "drinks",
                    name: item.name,
                    cost: item.cost,
                    count: item.count
                }
            });

            currentBasket.push(...newBasket);
        }
        if (dessertItems.length > 0) {
            const newBasket = dessertItems.map(item => {
                return {
                    id: item.id,
                    title: "dessert",
                    name: item.name,
                    cost: item.cost,
                    count: item.count
                }
            });

            currentBasket.push(...newBasket)
        }
        
        if (isDelivery) {
            happyBuyer = {
                name: nameD,
                phone: telD,
                city: cityD,
                restaurant: "",
                street: streetD,
                house: houseD,
                room: roomD,
                entrance: entranceD,
                floor: floorD,
                comments: commentsD,
                payment: deliveryCash ? "Оплата наличными курьеру" : "Оплата картой курьеру",
                totalCost: calculateTotalCost()
            };
        } else {
            happyBuyer = {
                name: nameP,
                phone: telP,
                city: cityP,
                restaurant: restaurantP,
                street: "",
                house: "",
                room: "",
                entrance: "",
                floor: "",
                comments: commentsP,
                payment:  pickupCash ? "Оплата наличными при получении" : "Оплата картой при получении",
                totalCost: Math.floor(calculateTotalCost()/100*90)
            };
        }

        const send = {
            id: v4(),
            happyBuyer,
            currentBasket
        }

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;utf=8"
                },
                body: JSON.stringify(send)
            });

            if (response.ok) {
                console.log('Успешно отправлено!');

                dispatch(addNewPizzaItem([]));
                dispatch(addNewDessertItem([]));
                dispatch(addNewDrinksItem([]));
                dispatch(addNewSnacksItem([]));
                dispatch(addNewCombosItem([]));
            } else {
                throw new Error('Ошибка при отправке!');
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    // console.log('render');

    return (
        <div className="basket-registration-wrapper">
            <div className="basket-status">
                <div className="status-steps">
                    <div className="status-steps__number active-number">1</div>
                    <div className="status-steps__line"></div>
                    <div className="status-steps__number active-number">2</div>
                    <div className="status-steps__line"></div>
                    <div className="status-steps__number">3</div>
                </div>
                <div className="status-descr">
                    <div className="status-descr__text">Корзина</div>
                    <div className="status-descr__text">Оформление</div>
                    <div className="status-descr__text">Заказ оформлен</div>
                </div>
            </div>

            <div className="basket-registration__form-wrapper form-wrapper">
                <div className="form-wrapper__titles">
                    <div 
                        ref={refDelivery}
                        onClick={handleSwitchMethodDelivery}
                        className="form-wrapper__titles-item titles-item-active">Доставка</div>
                    <div 
                        ref={refPickup}
                        onClick={handleSwitchMethodDelivery}
                        className="form-wrapper__titles-item">Самовывоз</div>
                    {isDelivery ? null : <div className="form-wrapper__titles-hide-item">При самовывозе - скидка!    <span> 10% </span></div>}
                </div>

                {isPickup ? null : (
                    <div className="form-wrapper__delivery">
                        <form name="form-wrapper__delivery" className="form-delivery">
                            <fieldset>
                                <input 
                                    onChange={(e) => setTextD(e.target.value)}
                                    type="text" 
                                    className="custom-inp" 
                                    value={nameD} 
                                    placeholder="Имя" />
                                <input 
                                    onChange={(e) => setTelD(e.target.value)}
                                    type="tel" 
                                    className="custom-inp" 
                                    value={telD} 
                                    placeholder="Телефон" />
                            </fieldset>

                            <fieldset>
                                <select 
                                    onChange={(e) => setCityD(e.target.value)} 
                                    name="city" 
                                    value={cityD} 
                                    className="custom-select" >
                                    <option value="default" className="custom-option">Выберите город</option>
                                    <option value="voronezh" className="custom-option">Воронеж</option>
                                </select>

                                <input 
                                    onChange={(e) => setStreetD(e.target.value)}
                                    type="text" 
                                    className="custom-inp" 
                                    value={streetD} 
                                    placeholder="Улица"/>
                            </fieldset>

                            <fieldset>
                                <input 
                                    onChange={(e) => setHouseD(e.target.value)}
                                    type="text" 
                                    className="custom-inp-place" 
                                    value={houseD} 
                                    placeholder="Дом"/>
                                <input 
                                    onChange={(e) => setRoomD(e.target.value)}
                                    type="text" 
                                    className="custom-inp-place" 
                                    value={roomD} 
                                    placeholder="Квартира"/>
                                <input 
                                    onChange={(e) => setEntranceD(e.target.value)}
                                    type="text" 
                                    className="custom-inp-place" 
                                    value={entranceD} 
                                    placeholder="Подъезд"/>
                                <input
                                    onChange={(e) => setFloorD(e.target.value)} 
                                    type="text" 
                                    className="custom-inp-place" 
                                    value={floorD} 
                                    placeholder="Этаж"/>
                            </fieldset>

                            <textarea 
                                onChange={(e) => setCommentsD(e.target.value)} 
                                value={commentsD} 
                                name="comments" cols="30" rows="10" 
                                className="custom-textarea" 
                                placeholder="Комментарии"></textarea>
                        </form>
                    </div>
                )}

                {isDelivery ? null : (
                    <div className="form-wrapper__pickup">
                        <form name="form-wrapper__pickup" className="form-pickup">
                            <fieldset>
                                <input 
                                    onChange={(e) => setTextP(e.target.value)} 
                                    value={nameP} 
                                    type="text" 
                                    className="custom-inp" 
                                    placeholder="Имя"/>
                                <input 
                                    onChange={(e) => setTelP(e.target.value)} 
                                    value={telP} 
                                    type="tel" 
                                    className="custom-inp" 
                                    placeholder="Телефон"/>
                            </fieldset>
    
                            <fieldset>
                                <select 
                                    onChange={(e) => setCityP(e.target.value)} 
                                    value={cityP} 
                                    name="city" 
                                    className="custom-select" >
                                    <option value="default" className="custom-option">Выберите город</option>
                                    <option value="voronezh" className="custom-option">Воронеж</option>
                                </select>
    
                                <select 
                                onChange={(e) => setRestaurantP(e.target.value)} 
                                value={restaurantP} 
                                name="restaurant" 
                                className="custom-select">
                                    <option value="default" className="custom-option">Выберите ресторан</option>
                                    <option value="moscovprospect" className="custom-option">Московский проспект</option>
                                </select>
                            </fieldset>
    
                            <textarea 
                                onChange={(e) => setCommentsP(e.target.value)} 
                                value={commentsP} 
                                name="comments" cols="30" rows="10" 
                                className="custom-textarea" 
                                placeholder="Комментарии"></textarea>
                        </form>
                    </div>
                )}
            </div>

            <div className="form-wrapper__payment">
                {isPickup ? null : (
                    <div className="payment-delivery">
                        <input 
                            onChange={handleChangeRadioMethodDelivery}
                            checked={deliveryCash}
                            ref={refdeliveryCash}
                            type="radio" 
                            id="radio1" 
                            name="delivery-payment" 
                            value="cash"/>
                        <label htmlFor="radio1">Оплата наличными курьеру</label>
    
                        <input 
                            onChange={handleChangeRadioMethodDelivery}
                            checked={deliveryCard}
                            ref={refdeliveryCard}
                            type="radio" 
                            id="radio2" 
                            name="delivery-payment" 
                            value="card"/>
                        <label htmlFor="radio2">Оплата картой курьеру</label>
                    </div>
                )}

                {isDelivery ? null : (
                    <div className="payment-pickup">
                        <input 
                            onChange={handleChangeRadioMethodPickup}
                            checked={pickupCash}
                            ref={refpickupCash}
                            type="radio" 
                            id="radio3" 
                            name="delivery-pickup"
                            value="cash"/>
                        <label htmlFor="radio3">Оплата наличными при получении</label>
    
                        <input 
                            onChange={handleChangeRadioMethodPickup}
                            checked={pickupCard}
                            ref={refpickupCard}
                            type="radio" 
                            id="radio4" 
                            name="delivery-pickup"
                            value="card"/>
                        <label htmlFor="radio4">Оплата картой при получении</label>
                    </div>
                )}
            </div> 

            {isDelivery ? <div className="basket-total-cost">Сумма заказа: {calculateTotalCost()} &#x20bd;</div> :
             <div className="basket-total-cost">Сумма заказа: {Math.floor(calculateTotalCost()/100*90)} &#x20bd;</div> }

            <div className="form-wrapper__btns">
                <Link to="/basket">
                    <button className="form-wrapper__btn-prev">Назад в корзину</button>
                </Link>
                <button 
                    onClick={sendBasketAndBuyerToBD}
                    className="form-wrapper__btn-next">Оформить заказ</button>
            </div>
        </div>
    );
}

export default BasketRegistration;