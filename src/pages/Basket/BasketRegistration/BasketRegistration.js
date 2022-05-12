import { useState, useRef } from 'react';


import './BasketRegistration.css';

const BasketRegistration = () => {
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
                    {isDelivery ? null : <div className="form-wrapper__titles-hide-item">При самовывозе - скидка!</div>}
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
                            type="radio" 
                            id="radio1" 
                            name="delivery-payment" 
                            value="cash"/>
                        <label htmlFor="radio1">Оплата наличными курьеру</label>
    
                        <input 
                            type="radio" 
                            id="radio2" 
                            name="delivery-payment" 
                            // checked 
                            value="card"/>
                        <label htmlFor="radio2">Оплата картой курьеру</label>
                    </div>
                )}

                {isDelivery ? null : (
                    <div className="payment-pickup">
                        <input 
                            type="radio" 
                            id="radio3" 
                            name="delivery-pickup"
                            value="cash"/>
                        <label htmlFor="radio3">Оплата наличными при получении</label>
    
                        <input 
                            type="radio" 
                            id="radio4" 
                            name="delivery-pickup" 
                            // checked 
                            value="card"/>
                        <label htmlFor="radio4">Оплата картой при получении</label>
                    </div>
                )}
            </div> 

            <div className="form-wrapper__btns">
                <button className="form-wrapper__btn-prev">Назад в корзину</button>
                <button className="form-wrapper__btn-next">Оформить заказ</button>
            </div>
        </div>
    );
}

export default BasketRegistration;