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
                    <div className="form-wrapper__titles-item">Доставка</div>
                    <div className="form-wrapper__titles-item">Самовывоз</div>
                    <div className="form-wrapper__titles-hide-item">При самовывозе - скидка!</div>
                </div>

                <div className="form-wrapper__delivery">
                <form name="form-wrapper__delivery" className="form-delivery">
                        <input type="text" className="custom-inp" />
                        <input type="text" className="custom-inp" />

                        <select name="city" className="custom-select" >
                            <option value="default" disabled className="custom-option">Выберите город</option>
                            <option value="voronezh" className="custom-option">Воронеж</option>
                        </select>

                        <input type="text" className="custom-inp" />

                        <input type="text" className="custom-inp-place" />
                        <input type="text" className="custom-inp-place" />
                        <input type="text" className="custom-inp-place" />
                        <input type="text" className="custom-inp-place" />

                        <textarea name="" cols="30" rows="10" className="custom-textarea"></textarea>
                    </form>
                </div>

                <div className="form-wrapper__pickup">
                    <form name="form-wrapper__pickup" className="form-pickup">
                        <input type="text" className="custom-inp" />
                        <input type="text" className="custom-inp" />

                        <select name="city" className="custom-select" >
                            <option value="default" disabled className="custom-option">Выберите город</option>
                            <option value="voronezh" className="custom-option">Воронеж</option>
                        </select>

                        <select name="restaurant" className="custom-select">
                            <option value="default" disabled className="custom-option">Выберите ресторан</option>
                            <option value="moscovprospect" className="custom-option">Московский проспект</option>
                        </select>
                        
                        <textarea name="" cols="30" rows="10" className="custom-textarea"></textarea>
                    </form>
                </div>
            </div>

            <div className="form-wrapper__payment"></div> 

            <div className="form-wrapper__btns">
                <div className="form-wrapper__btn-prev">Назад в корзину</div>
                <div className="form-wrapper__btn-next">Оформить заказ</div>
            </div>
        </div>
    );
}

export default BasketRegistration;