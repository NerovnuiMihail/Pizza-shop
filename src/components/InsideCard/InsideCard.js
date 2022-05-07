import { useEffect } from 'react';
import info from './info.png';
import close from './close.png';

import './InsideCard.css';

const InsideCard = ({setIsVisible, img, title, weight, description, cost}) => {
    useEffect(() => {
        document.body.addEventListener('click', handleClick);

        return document.body.addEventListener('click', handleClick);
         // eslint-disable-next-line
    }, []);

    const handleClick = (e) => {
        if (e.target.classList.contains("inside-card__close") || e.target.classList.contains("inside-card__close-img") || e.target.id === "modal-root") {
            document.body.style.overflow = "";
            document.querySelector('#modal-root').style.display = "none";
            setIsVisible(false);
        }
    }

    return (
        <div className="inside-card">
            <div className="inside-card__close">
                <img src={close} alt="exit" className="inside-card__close-img" />
            </div>
            <div className="inside-card__img">
                <img src={img} alt={title} />
            </div>
            <div className="inside-card__descr">
                <div className="inside-card__descr-top">
                    <div>
                        <h2 className="inside-card__title">{title}</h2>
                        <img src={info} alt="calories-info" />
                    </div>
                    <p className="inside-card__weight">{weight}</p>
                    <p className="inside-card__description">{description}</p>
                </div>
                <button className="inside-card__btn">{cost} &#x20bd;</button>
            </div>
        </div>
    );
}

export default InsideCard;