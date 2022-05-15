import { useSelector } from 'react-redux';
import { useRef } from 'react';

import arrow from './arrow.png';

import './Slider.css';

const Slider = () => {
    const popularPizza = useSelector(state => state.popular.pizza);
    const popularDessert = useSelector(state => state.popular.dessert);
    const popularSnacks = useSelector(state => state.popular.snacks);
    const popularDrinks = useSelector(state => state.popular.drinks);

    const pizzaRef = useRef(null);
    const dessertRef = useRef(null);
    const snacksRef = useRef(null);
    const drinksRef = useRef(null);

    let slideCounter;

    const handleChangeSlide = () => {
        
        switch (slideCounter) {
            case 0:
                slideCounter = slideCounter + 1;
                pizzaRef.current.style.top = `${parseInt(pizzaRef.current.style.top) - 300}px`;
                drinksRef.current.style.top = `${parseInt(drinksRef.current.style.top) - 300}px`;

                dessertRef.current.style.top = `${parseInt(dessertRef.current.style.top) + 300}px`;
                snacksRef.current.style.top = `${parseInt(snacksRef.current.style.top) + 300}px`;
                break;
            case 1:
                slideCounter = slideCounter + 1;
                pizzaRef.current.style.top = `${parseInt(pizzaRef.current.style.top) - 300}px`;
                drinksRef.current.style.top = `${parseInt(drinksRef.current.style.top) - 300}px`;
                
                dessertRef.current.style.top = `${parseInt(dessertRef.current.style.top) + 300}px`;
                snacksRef.current.style.top = `${parseInt(snacksRef.current.style.top) + 300}px`;
                break;
            case 2:
                slideCounter = slideCounter + 1;
                pizzaRef.current.style.top = `${parseInt(pizzaRef.current.style.top) - 300}px`;
                drinksRef.current.style.top = `${parseInt(drinksRef.current.style.top) - 300}px`;

                dessertRef.current.style.top = `${parseInt(dessertRef.current.style.top) + 300}px`;
                snacksRef.current.style.top = `${parseInt(snacksRef.current.style.top) + 300}px`;
                break;
            case 3:
                slideCounter = 0;
                pizzaRef.current.style.top = `${parseInt(pizzaRef.current.style.top) + 900}px`;
                drinksRef.current.style.top = `${parseInt(drinksRef.current.style.top) + 900}px`;

                dessertRef.current.style.top = `${parseInt(dessertRef.current.style.top) - 900}px`;
                snacksRef.current.style.top = `${parseInt(snacksRef.current.style.top) - 900}px`;
                break;
            case undefined:
                slideCounter = 1;
                pizzaRef.current.style.top = `-275px`;
                drinksRef.current.style.top = `-275px`;

                dessertRef.current.style.top = `-575px`;
                snacksRef.current.style.top = `-575px`;
                break;
            default:
                break;    
        }

    };

    const pizzaView = !popularPizza ? null : popularPizza.map(item => {
                                                    return <SlideItem key={item.id} {...item} />
                                                });

    const dessertView = !popularDessert ? null : popularDessert.map(item => {
                                                    return <SlideItem key={item.id} {...item} />
                                                });

    const snacksView = !popularSnacks ? null : popularSnacks.map(item => {
                                                    return <SlideItem key={item.id} {...item} />
                                                });

    const drinksView = !popularDrinks ? null : popularDrinks.map(item => {
                                                    return <SlideItem key={item.id} {...item} />
                                                });


    return (
        <div className="slider-wrapper">
            <div onClick={handleChangeSlide} className="slider-btn__down">
                <img src={arrow} alt="arrow down" className="slider-btn__img" />
            </div>

            <div className="slider-content">
                <div ref={pizzaRef} className="slider-content__pizza">
                    {pizzaView}
                </div>
                <div ref={dessertRef} className="slider-content__dessert">
                    {dessertView}
                </div>
                <div ref={drinksRef} className="slider-content__drinks">
                    {drinksView}
                </div>
                <div ref={snacksRef} className="slider-content__snacks">
                    {snacksView}
                </div>
            </div>

            <div onClick={handleChangeSlide} className="slider-btn__up">
                <img src={arrow} alt="arrow up" />
            </div>
        </div>
    );
}

const SlideItem = ({img, name}) => {
    const image = typeof(img) === "string" ? img : img.traditional;

    return (
        <div className="slide-item">
            <img src={image} alt={name} className="slide-item__img" />
            <div className="slide-item__title"> {name} </div>
        </div>
    );
}

export default Slider;