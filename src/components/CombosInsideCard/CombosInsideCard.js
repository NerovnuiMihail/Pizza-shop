import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useApiData from '../../services/useApiData';
import InsideSmallCard from './InsideSmallCard/InsideSmallCard';

import close from './close.png';

import './CombosInsideCard.css';


const CombosInsideCard = ({setIsVisible, id, name, description, startPrice, startPriceWithSale, imgPreview, combosItem}) => {
    const [,,, getRequestP] = useApiData("pizza");
    const [,,, getRequestDe] = useApiData("dessert");
    const [,,, getRequestDr] = useApiData("drinks");

    const pizza = useSelector(state => state.shop.pizza);
    const dessert = useSelector(state => state.shop.dessert);
    const drinks = useSelector(state => state.shop.drinks);

    useEffect(() => {
        if (pizza.length < 1 || dessert.length < 1 || drinks.length < 1) {
            getRequestP("http://localhost:3001/api/pizza");
            getRequestDe("http://localhost:3001/api/dessert");
            getRequestDr("http://localhost:3001/api/drinks");
        }

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
        }
        // eslint-disable-next-line
    }, []);

    const hidePortal = () => {
        document.body.style.overflow = "";
        document.querySelector('#modal-root').style.display = "none";
        document.querySelector('.header').style.marginRight = "";
        setIsVisible(false);
    }

    const handleClick = (e) => {
        if (e.target.classList.contains("combos-inside-card__close") || e.target.id === "modal-root") {
            hidePortal();
        }
    }

    const content = combosItem.map((item, ind) => {
        if (Object.keys(item).includes("pizza")) {
            const combosItemIndex = combosItem.findIndex(item => Object.keys(item).includes("pizza"));

            return pizza.map(pizzaItem => <InsideSmallCard key={ind + pizzaItem.name} 
                name={pizzaItem.name} 
                description={pizzaItem.additionally.default.join(', ')} 
                img={pizzaItem.img.traditional}  />).slice(0, combosItem[combosItemIndex].pizza);

        } else if (Object.keys(item).includes("drinks")) {
            const combosItemIndex = combosItem.findIndex(item => Object.keys(item).includes("drinks"));

            return drinks.map(drinksItem => <InsideSmallCard key={ind + drinksItem.name} 
                name={drinksItem.name} 
                description={drinksItem.description}
                img={drinksItem.img}  />).slice(0, combosItem[combosItemIndex].drinks);

        } else if (Object.keys(item).includes("dessert")) {
            const combosItemIndex = combosItem.findIndex(item => Object.keys(item).includes("dessert"));

            return dessert.map(dessertItem => <InsideSmallCard key={ind + dessertItem.name} 
                name={dessertItem.name} 
                description={dessertItem.description}
                img={dessertItem.img}  />).slice(0, combosItem[combosItemIndex].dessert);

        } else {
            return null;
        }
    });

    // добавить информирование о добавлении в корзину

    return (
        <div className="combos-inside-card-wrapper">

        <div className="combos-inside-card__imgs">
            <div className="combos-inside-card__preview">
                <img src={imgPreview} alt={name} />
            </div>
        </div>

        <div className="combos-inside-card__descr">
            <img src={close} alt="close" className="combos-inside-card__close" />
            <h2 className="combos-inside-card__descr-title">{name}</h2>
            <p className="combos-inside-card__descr-description"> {description} </p>

            <div className="combos-inside-card__descr-content">
                {content}
            </div>

            <div className="combos-inside-card__descr-footer">
                <div className="combos-inside-card__price combos-price">
                    <div className="combos-price__sale"> {startPriceWithSale} &#x20bd;</div>
                    <div className="combos-price__whitout-sale"> {startPrice} &#x20bd;</div>
                </div>
                <button className="combos-inside-card__btn">В корзину</button>
            </div>
        </div>

        </div>
    );
}

export default CombosInsideCard;