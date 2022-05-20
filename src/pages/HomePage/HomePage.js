import { useEffect, useRef } from "react";
import {    
    DessertPage,
    DrinksPage,
    PizzaPage,
    SnacksPage,
    CombosPage
} from "../index";
import Slider from "../../components/Slider/Slider";

import './HomePage.css';

const HomePage = () => {
    const bodyRef = useRef(null);

    useEffect(() => {
        bodyRef.current.scrollIntoView();
    }, []);

    return (
        <div ref={bodyRef} className="home-page">
            <h1 className="home-page__titile">Самые популярные</h1>

            <Slider />
            
            <h2 className="home-page__titile">Пицца</h2>
            <PizzaPage/>

            <h2 className="home-page__titile">Комбо</h2>
            <CombosPage/>

            <h2 className="home-page__titile">Закуски</h2>
            <SnacksPage/>

            <h2 className="home-page__titile">Десерты</h2>
            <DessertPage/>
            
            <h2 className="home-page__titile">Напитки</h2>
            <DrinksPage/>
        </div>
    )
}

export default HomePage;