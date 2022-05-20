import { useSelector } from 'react-redux';
import {Helmet} from "react-helmet";

import delivery from '../img/delivery.png';
import deliverypickup from '../img/delivery-pickup.png';
import numberoforder from '../img/numberoforder.png';

import './BasketDelivery.css';

const BasketDelivery = () => {
    const detail = useSelector(state => state.buyer.detail);

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Способы доставки и информирование о коде заказа!"
                />
                <title>Заказ оформлен</title>
            </Helmet>
        
            <div className="basketdelivery-wrapper">
                {detail.method === "Pickup" ? (
                            <div className="basketdelivery__content">
                                <img src={deliverypickup} alt="deliverypickup" className="basketdelivery__img-delivery" />
                                <h1 className="basketdelivery__title">Спасибо за заказ!</h1>
                                <h2 className="basketdelivery__delivery-descr">Будет готово к выдаче в течении 60 минут</h2>
                                <h2 className="basketdelivery__delivery-descr">Контактный телефон ресторана: +7 900 111 22 33</h2>
                                <img src={numberoforder} alt="numberoforder" className="basketdelivery__img-order"/>
                                <h2 className="basketdelivery__order-descr">Номер вашего заказа: <span> {detail.number} </span></h2>
                            </div>
                        ) : (
                            <div className="basketdelivery__content">
                                <img src={delivery} alt="delivery" className="basketdelivery__img-delivery" />
                                <h1 className="basketdelivery__title">Спасибо за заказ!</h1>
                                <h2 className="basketdelivery__delivery-descr">Доставка в течении 90 минут</h2>
                                <h2 className="basketdelivery__delivery-descr">В случае опоздания, весь заказ - <span>БЕСПЛАТНО!</span></h2>
                                <img src={numberoforder} alt="numberoforder" className="basketdelivery__img-order"/>
                                <h2 className="basketdelivery__order-descr">Номер вашего заказа: <span> {detail.number} </span></h2>
                            </div>
                )}
            </div>
        </>
    );
}

export default BasketDelivery;