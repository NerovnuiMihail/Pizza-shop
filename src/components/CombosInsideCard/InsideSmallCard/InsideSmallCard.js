

import './InsideSmallCard.css';

const InsideSmallCard = ({name, description, img}) => {
    return (
        <div className="inside-small-card__wrapper">
            <div className="inside-small-card__img">
                <img src={img} alt={name} />
            </div>
            <div className="inside-small-card__content">
                <div className="inside-small-card__title"> {name} </div>
                <div className="inside-small-card__dough"></div>
                <div className="inside-small-card__descr"> {description} </div>
                <button className="inside-small-card__btn">Изменить</button>
            </div>
        </div>
    );
}

export default InsideSmallCard;