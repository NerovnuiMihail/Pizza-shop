import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { v4 } from 'uuid';
import {     
    addNewPizzaItem,
    addNewDessertItem,
    addNewDrinksItem,
    addNewSnacksItem,
    addNewCombosItem
} from '../../../store/basketSlice';
import {
    setDetail,
    setNameD,
    setTelD,
    setCityD,
    setStreetD,
    setCommentsD,
    setHouseD,
    setRoomD,
    setEntranceD,
    setFloorD,
    setRestaurantP,
    setNameP,
    setTelP,
    setCityP,
    setCommentsP
} from '../../../store/buyerSlice';
import Portal from '../../../components/Portal/Portal';

import './BasketRegistration.css';

const BasketRegistration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goBasketDelivery = () => navigate('/basketdelivery');
    const [isVisible, setIsVisible] = useState(false);

    const pizzaItems = useSelector(state => state.basket.basket.pizza);
    const combosItems = useSelector(state => state.basket.basket.combos);
    const snacksItems = useSelector(state => state.basket.basket.snacks);
    const drinksItems = useSelector(state => state.basket.basket.drinks);
    const dessertItems = useSelector(state => state.basket.basket.dessert);

    const nameD = useSelector(state => state.buyer.nameD);
    const telD = useSelector(state => state.buyer.telD);
    const cityD = useSelector(state => state.buyer.cityD);
    const streetD = useSelector(state => state.buyer.streetD);
    const commentsD = useSelector(state => state.buyer.commentsD);
    const houseD = useSelector(state => state.buyer.houseD);
    const roomD = useSelector(state => state.buyer.roomD);
    const entranceD = useSelector(state => state.buyer.entranceD);
    const floorD = useSelector(state => state.buyer.floorD);

    const nameP = useSelector(state => state.buyer.nameP);
    const telP = useSelector(state => state.buyer.telP);
    const cityP = useSelector(state => state.buyer.cityP);
    const restaurantP = useSelector(state => state.buyer.restaurantP);
    const commentsP = useSelector(state => state.buyer.commentsP);

    const [isNextPageDelivery, setIsNextPageDelivery] = useState(true);
    const [isNextPagePickup, setIsNextPagePickup] = useState(true);

    const [isDelivery, setIsDelivery] = useState(true);
    const [isPickup, setIsPickup] = useState(false);
    const refDelivery = useRef(null);
    const refPickup = useRef(null);

    const [deliveryCash, setDeliveryCash] = useState(false);
    const [deliveryCard, setDeliveryCard] = useState(true);
    const [pickupCash, setPickupCash] = useState(false);
    const [pickupCard, setPickupCard] = useState(true);

    const refdeliveryCash = useRef(null);
    const refdeliveryCard = useRef(null);
    const refpickupCash = useRef(null);
    const refpickupCard = useRef(null);

    const refcorrectlyNameD = useRef(null);
    const refcorrectlyTelD = useRef(null);
    const refcorrectlyCityD = useRef(null);
    const refcorrectlyStreetD = useRef(null);
    const refcorrectlyHouseD = useRef(null);

    const refcorrectlyNameP = useRef(null);
    const refcorrectlyTelP = useRef(null);
    const refcorrectlyCityP = useRef(null);
    const refcorrectlyRestaurantP = useRef(null);

    useEffect(() => {
        isCorrectlyInputs();
    });

    useEffect(() => {
        document.body.addEventListener('click', hidePortal);

        return () => {
            document.body.removeEventListener('click', hidePortal);
        }
         // eslint-disable-next-line
    }, []);

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
        const combosCost = combosItems.reduce((prev, current) => prev + (+current.cost * +current.count), 0);

        return pizzaCost + dessertCost + drinksCost + snacksCost + combosCost;
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
                    count: item.count,
                    img: item.img
                }
            });

            currentBasket.push(...newBasket);
        }
        if (combosItems.length > 0) {
            const newBasket = combosItems.map(item => {
                return {
                    id: item.id,
                    title: "combos",
                    name: item.name,
                    cost: item.cost,
                    count: item.count,
                    img: item.img,
                    description: item.description,
                    descr: item.descr
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
                    count: item.count,
                    img: item.img
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
                    count: item.count,
                    img: item.img
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
                    count: item.count,
                    img: item.img
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

                const data = await response.json();
                
                dispatch(setDetail({number: data.id.slice(0,8), method: data.happyBuyer.payment.includes("курьеру") ? "Delivery" : "Pickup"}));

                dispatch(addNewPizzaItem([]));
                dispatch(addNewDessertItem([]));
                dispatch(addNewDrinksItem([]));
                dispatch(addNewSnacksItem([]));
                dispatch(addNewCombosItem([]));

                dispatch(setNameD(""));
                dispatch(setTelD(""));
                dispatch(setCityD(""));
                dispatch(setStreetD(""));
                dispatch(setCommentsD(""));
                dispatch(setHouseD(""));
                dispatch(setRoomD(""));
                dispatch(setEntranceD(""));
                dispatch(setFloorD(""));
                dispatch(setRestaurantP(""));
                dispatch(setNameP(""));
                dispatch(setTelP(""));
                dispatch(setCityP(""));
                dispatch(setCommentsP(""));

                goBasketDelivery();
            } else {
                throw new Error('Ошибка при отправке!');
                // сделать информирование об ошибке отправки
            }
            
        } catch (error) {
            showPortal();
            console.log(error);
        }
    };

    const showPortal = () => {
        document.querySelector('#modal-root').style.display = 'block';
        document.querySelector('.header').style.marginRight = "17px";
        document.body.style.overflow = 'hidden';
        setIsVisible(true);
    };

    const hidePortal = () => {
        document.body.style.overflow = "";
        document.querySelector('#modal-root').style.display = "none";
        document.querySelector('.header').style.marginRight = "";
        setIsVisible(false);
    };

    const isCorrectlyInputs = () => {
        if (isDelivery) {
            let correctlyNameD = true;
            let correctlyTelD = true;
            let correctlyCityD = true;
            let correctlyStreetD = true;
            let correctlyHouseD = true;

            //      warning-mistake

            if (nameD.trim().length < 2) {
                correctlyNameD = false;
            }

            if (telD.length < 10) {
                correctlyTelD = false;
            }

            if (cityD === "") {
                correctlyCityD = false;
            }

            if (streetD.trim().length < 5) {
                correctlyStreetD = false;
            }

            if (houseD.trim().length < 1) {
                correctlyHouseD = false;
            }
            
            if ( correctlyNameD === false || correctlyTelD === false || correctlyCityD === false || correctlyStreetD === false || correctlyHouseD === false ) {
                setIsNextPageDelivery(true);

                correctlyNameD ? refcorrectlyNameD.current.style.opacity = 0 : refcorrectlyNameD.current.style.opacity = 1;
                correctlyTelD ? refcorrectlyTelD.current.style.opacity = 0 : refcorrectlyTelD.current.style.opacity = 1;
                correctlyCityD ? refcorrectlyCityD.current.style.opacity = 0 : refcorrectlyCityD.current.style.opacity = 1;
                correctlyStreetD ? refcorrectlyStreetD.current.style.opacity = 0 : refcorrectlyStreetD.current.style.opacity = 1;
                correctlyHouseD ? refcorrectlyHouseD.current.style.opacity = 0 : refcorrectlyHouseD.current.style.opacity = 1;
            } else {
                setIsNextPageDelivery(false);

                refcorrectlyNameD.current.style.opacity = 0;
                refcorrectlyTelD.current.style.opacity = 0;
                refcorrectlyCityD.current.style.opacity = 0;
                refcorrectlyStreetD.current.style.opacity = 0;
                refcorrectlyHouseD.current.style.opacity = 0;
            }

        } else {
            let correctlyNameP = true;
            let correctlyTelP = true;
            let correctlyCityP = true;
            let correctlyRestaurantP = true;

            if (nameP.trim().length < 2) {
                correctlyNameP = false;
            }

            if (telP.length < 10) {
                correctlyTelP = false;
            }

            if (cityP === "") {
                correctlyCityP = false;
            }

            if (restaurantP === "") {
                correctlyRestaurantP = false;
            }

            if  (correctlyNameP === false || correctlyTelP === false || correctlyCityP === false || correctlyRestaurantP === false ) {
                setIsNextPagePickup(true);

                correctlyNameP ? refcorrectlyNameP.current.style.opacity = 0 : refcorrectlyNameP.current.style.opacity = 1;
                correctlyTelP ? refcorrectlyTelP.current.style.opacity = 0 : refcorrectlyTelP.current.style.opacity = 1;
                correctlyCityP ? refcorrectlyCityP.current.style.opacity = 0 : refcorrectlyCityP.current.style.opacity = 1;
                correctlyRestaurantP ? refcorrectlyRestaurantP.current.style.opacity = 0 : refcorrectlyRestaurantP.current.style.opacity = 1;
            } else {
                setIsNextPagePickup(false);

                refcorrectlyNameP.current.style.opacity = 0;
                refcorrectlyTelP.current.style.opacity = 0;
                refcorrectlyCityP.current.style.opacity = 0;
                refcorrectlyRestaurantP.current.style.opacity = 0;
            }
        }
    };

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Форма сбора данных для доставки"
                />
                <title>Оформление</title>
            </Helmet>

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
                                    <div>
                                        <input 
                                            onChange={(e) => dispatch(setNameD(e.target.value))}
                                            type="text" 
                                            className="custom-inp" 
                                            value={nameD} 
                                            placeholder="Имя" />
                                        <div ref={refcorrectlyNameD} className="warning-mistake">Минимальное количество символов 2!</div>   
                                    </div>
                                    <div>
                                        <input 
                                            onChange={(e) => dispatch(setTelD(e.target.value))}
                                            type="number" 
                                            className="custom-inp" 
                                            value={telD} 
                                            placeholder="Телефон" />
                                        <div ref={refcorrectlyTelD} className="warning-mistake">Некорректный номер! (Пример:  960 111 22 33)</div> 
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <div>
                                        <select 
                                            onChange={(e) => dispatch(setCityD(e.target.value))} 
                                            name="city" 
                                            value={cityD} 
                                            className="custom-select" >
                                            <option value="default" className="custom-option">Выберите город</option>
                                            <option value="voronezh" className="custom-option">Воронеж</option>
                                        </select>
                                        <div ref={refcorrectlyCityD} className="warning-mistake">Необходимо выбрать город!</div> 
                                    </div>
                                    <div>
                                        <input 
                                            onChange={(e) => dispatch(setStreetD(e.target.value))}
                                            type="text" 
                                            className="custom-inp" 
                                            value={streetD} 
                                            placeholder="Улица"/>
                                        <div ref={refcorrectlyStreetD} className="warning-mistake">Минимальное количество символов 5!</div> 
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <div>
                                        <input 
                                            onChange={(e) => dispatch(setHouseD(e.target.value))}
                                            type="text" 
                                            className="custom-inp-place" 
                                            value={houseD} 
                                            placeholder="Дом"/>
                                        <div ref={refcorrectlyHouseD} className="warning-mistake">Дом не заполнен!</div> 
                                    </div>
                                    <div>
                                        <input 
                                            onChange={(e) => dispatch(setRoomD(e.target.value))}
                                            type="number" 
                                            className="custom-inp-place" 
                                            value={roomD} 
                                            placeholder="Квартира"/>
                                        <div className="somediv"></div>
                                    </div>
                                    <div>
                                        <input 
                                            onChange={(e) => dispatch(setEntranceD(e.target.value))}
                                            type="text" 
                                            className="custom-inp-place" 
                                            value={entranceD} 
                                            placeholder="Подъезд"/>
                                        <div className="somediv"></div>
                                    </div>
                                    <div>
                                        <input
                                            onChange={(e) => dispatch(setFloorD(e.target.value))} 
                                            type="number" 
                                            className="custom-inp-place" 
                                            value={floorD} 
                                            placeholder="Этаж"/>
                                        <div className="somediv"></div>
                                    </div>
                                </fieldset>

                                <textarea 
                                    onChange={(e) => dispatch(setCommentsD(e.target.value))} 
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
                                    <div>
                                        <input 
                                            onChange={(e) => dispatch(setNameP(e.target.value))} 
                                            value={nameP} 
                                            type="text" 
                                            className="custom-inp" 
                                            placeholder="Имя"/>
                                        <div ref={refcorrectlyNameP} className="warning-mistake">Минимальное количество символов 2!</div> 
                                    </div>
                                    <div>
                                        <input 
                                            onChange={(e) => dispatch(setTelP(e.target.value))} 
                                            value={telP} 
                                            type="number" 
                                            className="custom-inp" 
                                            placeholder="Телефон"/>
                                        <div ref={refcorrectlyTelP} className="warning-mistake">Некорректный номер! (Пример: 960 111 22 33)</div> 
                                    </div>
                                </fieldset>
        
                                <fieldset>
                                <div>
                                    <select 
                                        onChange={(e) => dispatch(setCityP(e.target.value))} 
                                        value={cityP} 
                                        name="city" 
                                        className="custom-select" >
                                        <option value="default" className="custom-option">Выберите город</option>
                                        <option value="voronezh" className="custom-option">Воронеж</option>
                                    </select>
                                    <div ref={refcorrectlyCityP} className="warning-mistake">Необходимо выбрать город!</div> 
                                </div>
                                <div>
                                    <select 
                                        onChange={(e) => dispatch(setRestaurantP(e.target.value))} 
                                        value={restaurantP} 
                                        name="restaurant" 
                                        className="custom-select">
                                            <option value="default" className="custom-option">Выберите ресторан</option>
                                            <option value="moscovprospect" className="custom-option">Московский проспект</option>
                                    </select>
                                    <div ref={refcorrectlyRestaurantP} className="warning-mistake">Необходимо выбрать ресторан!</div> 
                                </div>
                                </fieldset>
                                <textarea 
                                    onChange={(e) => dispatch(setCommentsP(e.target.value))} 
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
                        disabled={isDelivery ? isNextPageDelivery : isNextPagePickup}
                        onClick={sendBasketAndBuyerToBD}
                        className="form-wrapper__btn-next">Оформить заказ</button>
                </div>
            </div>

            {isVisible ? <Portal>
                            <div onClick={hidePortal} className="basket-portal">
                                <h2>Непредвиденная ошибка</h2>
                                <h2>Повторите запрос позднее</h2>
                            </div>
                         </Portal> : null}
        </>
    );
}

export default BasketRegistration;