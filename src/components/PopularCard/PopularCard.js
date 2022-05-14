import { useState } from 'react';
import Portal from '../Portal/Portal';

import './PopularCard.css';


const PopularCard = ({pageName, data, Inside, item: {id, name, cost}}) => {
    const [isVisible, setIsVisible] = useState(false);

    const img = data.filter(item => item.id === id)[0].img;
    const itemForInside = data.filter(item => item.id === id)[0];

    const handleClick = () => {
        document.querySelector('#modal-root').style.display = 'block';
        document.querySelector('.header').style.marginRight = "17px";
        document.body.style.overflow = 'hidden';
        setIsVisible(true);
    }

    return (
        <>
            <div 
                onClick={handleClick} 
                className="popular-card">
                <img src={img} alt="images" className="popular-card__img"/>
                <div className="popular-card__wrap">
                    <h3 className="popular-card__title"> {name} </h3>
                    <p className="popular-card__cost">{cost} &#x20bd;</p>
                </div>
            </div>
        

            {!isVisible ? null : (
                <Portal>
                    <Inside 
                        setIsVisible={setIsVisible} 
                        {...itemForInside}
                        pageName={pageName}/>
                </Portal>
            )}

        </>
    );
}

export default PopularCard;