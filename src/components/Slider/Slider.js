import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

import arrow from './arrow.png';
import down from './down.png';

import './Slider.css';

const Slider = () => {
    const popularPizza = useSelector(state => state.popular.pizza);
    const popularDessert = useSelector(state => state.popular.dessert);
    const popularSnacks = useSelector(state => state.popular.snacks);
    const popularDrinks = useSelector(state => state.popular.drinks);
    const [slideCounter, setSlideCounter] = useState(0);

    const pizzaRef = useRef(null);
    const dessertRef = useRef(null);
    const snacksRef = useRef(null);
    const drinksRef = useRef(null);

    useEffect(() => {
        ChangeSlide();
    })

    const handleDown = () => {
        if (slideCounter > 0 && slideCounter < 4) {
            setSlideCounter(slideCounter => slideCounter - 1);
        }
    };

    const handleUp = () => {
        if (slideCounter === 0) {
            setSlideCounter(1);
        } else {
            if (slideCounter === 4) {
                setSlideCounter(0);
            } else {
                setSlideCounter(slideCounter => slideCounter + 1);
            }
        }
    };

    const ChangeSlide = () => {

        switch (slideCounter) {
            case 0:
                pizzaRef.current.style.top = "25px";
                drinksRef.current.style.top = "25px";

                dessertRef.current.style.top = "-875px";
                snacksRef.current.style.top = "-875px";
                break;
            case 1:
                pizzaRef.current.style.top = "-275px";
                drinksRef.current.style.top = "-275px";

                dessertRef.current.style.top = "-575px";
                snacksRef.current.style.top = "-575px";
                break;
            case 2:
                pizzaRef.current.style.top = "-575px";
                drinksRef.current.style.top = "-575px";

                dessertRef.current.style.top = "-275px";
                snacksRef.current.style.top = "-275px";
                break;
            case 3:
                pizzaRef.current.style.top = "-875px";
                drinksRef.current.style.top = "-875px";

                dessertRef.current.style.top = "25px";
                snacksRef.current.style.top = "25px";
                break;
            case 4:
                setSlideCounter(0);
                pizzaRef.current.style.top = "25px";
                drinksRef.current.style.top = "25px";

                dessertRef.current.style.top = "-875px";
                snacksRef.current.style.top = "-875px";
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
            <button onClick={handleDown} className="slider-btn__down">
                <img src={slideCounter === 0 ? down : arrow} alt="arrow down" className="slider-btn__img btn__down" />
            </button>

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

            <button onClick={handleUp} className="slider-btn__up">
                <img src={arrow} alt="arrow up" className="btn__up" />
            </button>
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