import close from './img/close.png';

import './BasketPage.css';

const BasketItem = ({ id, name, dough, img, cost, count, extra, handleAddBasketItem, handleDeleteBasketItem, handleDeleteBasketAllItems}) => {
    return (
        <div className="basket-item">
            <img src={typeof img === "string" ? img : img[dough]} alt={name} className="basket-item__img" />
            <div className="basket-item__descr">
                <div className="basket-item__name"> {name} </div>
                {!extra ? null : <div className="basket-item__extra"> 
                                    <div className="basket-item__extra-dough">
                                        {dough === "traditional" ? "Традиционное тесто" : "Тонкое тесто"}
                                    </div>
                                    <div className="basket-item__extra-items">
                                        {extra.join(", ")}
                                    </div>
                                </div>}
            </div>
            <div className="basket-item__btns">
                <div onClick={handleAddBasketItem} className="basket-item__btns-left"> + </div>
                <div className="basket-item__btns-count"> {count} </div>
                <div onClick={handleDeleteBasketItem} className="basket-item__btns-right"> - </div>
            </div>
            <div className="basket-item__costs"> {+cost * count} &#x20bd;</div>
            <img onClick={handleDeleteBasketAllItems} src={close} alt="close" className="basket-item__remove" />
        </div>
    );
}

export default BasketItem;