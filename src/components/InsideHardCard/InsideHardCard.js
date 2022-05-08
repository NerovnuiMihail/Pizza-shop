import { useState, useEffect } from 'react';
import CaloriesCard from '../CaloriesCard/CaloriesCard';
import info from './info.png';
import close from './close.png';

import './InsideHardCard.css';

const InsideHardCard = ({setIsVisible, price, image: {thin,traditional}, title, calories, description, }) => {
    const descr = description.slice().split(',').join(', ').toLowerCase();
    const [hideCalories, setHideCalories] = useState(true);

    useEffect(() => {
        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
        }
         // eslint-disable-next-line
    }, []);

    const handleClick = (e) => {
        if (e.target.classList.contains("inside-hard-card__close") || e.target.classList.contains("inside-hard-card__close-img") || e.target.id === "modal-root") {
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
        <div className="inside-hard-card">
            <div className="inside-hard-card__view-img">
                <img src={traditional} alt={title} />
            </div>
            <div className="inside-hard-card__content-wrapper">
                <h2 className="inside-hard-card__title">{title}</h2>
                <p className="inside-hard-card__filtred-value"> <span>35 cm</span>, <span>традиционное тесто</span>, <span>800 г</span> </p>
                <div className="inside-hard-card__action-btn">
                    <div className="inside-hard-card__close">
                        <img src={close} 
                            alt="exit" 
                            className="inside-hard-card__close-img" />
                    </div>
                    {calories ? <img 
                                    onClick={toggleHideCalories}
                                    src={info} 
                                    alt="calories-info" 
                                    className="inside-hard-card__info-img" /> : null}
                    {hideCalories ? null : (
                                <div className="calories-hide-wrapper">
                                    <CaloriesCard calories={calories} />
                                </div>
                    )}
                </div>
                <p className="inside-hard-card__description">{descr}</p>
                <button className="inside-hard-card__btn">{price[25]} &#x20bd;</button>
            </div>
        </div>
    )
}

export default InsideHardCard;