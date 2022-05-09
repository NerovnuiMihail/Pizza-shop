import { useState, useEffect } from 'react';
import CaloriesCard from '../CaloriesCard/CaloriesCard';
import info from './info.png';
import close from './close.png';

import './InsideCard.css';

const InsideCard = ({setIsVisible, calories, img, name, weight, description, price}) => {
    const [hideCalories, setHideCalories] = useState(true);

    useEffect(() => {
        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
        }
         // eslint-disable-next-line
    }, []);

    const handleClick = (e) => {
        if (e.target.classList.contains("inside-card__close") || e.target.classList.contains("inside-card__close-img") || e.target.id === "modal-root") {
            document.body.style.overflow = "";
            document.querySelector('#modal-root').style.display = "none";
            document.querySelector('.header').style.marginRight = "";
            setIsVisible(false);
        }
    }

    const toggleHideCalories = () => {
        setHideCalories(hideCalories => !hideCalories);
    }

    return (
        <div className="inside-card">
            <div className="inside-card__wrap">
                <div className="inside-card__action-btn">
                    <div className="inside-card__close">
                        <img src={close} 
                            alt="exit" 
                            className="inside-card__close-img" />
                    </div>
                    {calories ? <img 
                                    onClick={toggleHideCalories}
                                    src={info} 
                                    alt="calories-info" 
                                    className="inside-card__info-img" /> : null}
                    {hideCalories ? null : (
                                <div className="calories-hide-wrapper">
                                    <CaloriesCard calories={calories} />
                                </div>
                    )}
                </div>
            </div>
            <div className="inside-card__img">
                <img src={img} alt={name} />
            </div>
            <div className="inside-card__descr">
                <div className="inside-card__descr-top">
                    <h2 className="inside-card__title">{name}</h2>
                    <p className="inside-card__weight">{weight}</p>
                    <p className="inside-card__description">{description}</p>
                </div>
                <button className="inside-card__btn">{price} &#x20bd;</button>
            </div>
        </div>
    );
}

export default InsideCard;