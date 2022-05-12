


import './BasketRegistration.css';

const BasketRegistration = () => {









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
                    <div className="form-wrapper__titles-item titles-item-active">Доставка</div>
                    <div className="form-wrapper__titles-item">Самовывоз</div>
                    <div className="form-wrapper__titles-hide-item">При самовывозе - скидка!</div>
                </div>

                <div className="form-wrapper__delivery">
                    <form name="form-wrapper__delivery" className="form-delivery">
                        <fieldset>
                            <input type="text" className="custom-inp" defaultValue="Имя" />
                            <input type="tel" className="custom-inp" defaultValue="Телефон" />
                        </fieldset>

                        <fieldset>
                            <select name="city" className="custom-select" >
                                <option value="default" className="custom-option">Выберите город</option>
                                <option value="voronezh" className="custom-option">Воронеж</option>
                            </select>

                            <input type="text" className="custom-inp" defaultValue="Улица"/>
                        </fieldset>

                        <fieldset>
                            <input type="text" className="custom-inp-place" defaultValue="Дом"/>
                            <input type="text" className="custom-inp-place" defaultValue="Квартира"/>
                            <input type="text" className="custom-inp-place" defaultValue="Подъезд"/>
                            <input type="text" className="custom-inp-place" defaultValue="Этаж"/>
                        </fieldset>

                        <textarea name="" cols="30" rows="10" className="custom-textarea" defaultValue="Комментарии"></textarea>
                    </form>
                </div>

                <div className="form-wrapper__pickup">
                    <form name="form-wrapper__pickup" className="form-pickup">
                        <fieldset>
                            <input type="text" className="custom-inp" defaultValue="Имя"/>
                            <input type="text" className="custom-inp" defaultValue="Телефон"/>
                        </fieldset>

                        <fieldset>
                            <select name="city" className="custom-select" >
                                <option value="default" className="custom-option">Выберите город</option>
                                <option value="voronezh" className="custom-option">Воронеж</option>
                            </select>

                            <select name="restaurant" className="custom-select">
                                <option value="default" className="custom-option">Выберите ресторан</option>
                                <option value="moscovprospect" className="custom-option">Московский проспект</option>
                            </select>
                        </fieldset>

                        <textarea name="" cols="30" rows="10" className="custom-textarea" defaultValue="Комментарии"></textarea>
                    </form>
                </div>
            </div>

            <div className="form-wrapper__payment">
                <div className="payment-delivery">
                    <input type="radio" id="radio1" name="delivery-payment" value="cash"/>
                    <label htmlFor="radio1">Оплата наличными курьеру</label>

                    <input type="radio" id="radio2" name="delivery-payment" value="card"/>
                    <label htmlFor="radio2">Оплата картой курьеру</label>
                </div>
                <div className="payment-pickup">
                    <input type="radio" id="radio3" name="delivery-pickup" value="cash"/>
                    <label htmlFor="radio3">Оплата наличными при получении</label>

                    <input type="radio" id="radio4" name="delivery-pickup" value="card"/>
                    <label htmlFor="radio4">Оплата картой при получении</label>
                </div>
            </div> 

            <div className="form-wrapper__btns">
                <button className="form-wrapper__btn-prev">Назад в корзину</button>
                <button className="form-wrapper__btn-next">Оформить заказ</button>
            </div>
        </div>
    );
}

export default BasketRegistration;