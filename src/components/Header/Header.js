import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from './logo.png';

import './Header.css';


const Header = () => {
    const pizzaItems = useSelector(state => state.basket.basket.pizza);
    const combosItems = useSelector(state => state.basket.basket.combos);
    const snacksItems = useSelector(state => state.basket.basket.snacks);
    const drinksItems = useSelector(state => state.basket.basket.drinks);
    const dessertItems = useSelector(state => state.basket.basket.dessert);

    const basketLength = () => {
        const pizzaLength = pizzaItems.length ? pizzaItems.reduce((a, b) => a + b.count, 0) : 0;
        const combosLength = combosItems.length ? combosItems.reduce((a, b) => a + b.count, 0) : 0;
        const snacksLength = snacksItems.length ? snacksItems.reduce((a, b) => a + b.count, 0) : 0;
        const drinksLength = drinksItems.length ? drinksItems.reduce((a, b) => a + b.count, 0) : 0;
        const dessertLength = dessertItems.length ? dessertItems.reduce((a, b) => a + b.count, 0) : 0;

        return pizzaLength + combosLength + snacksLength + drinksLength + dessertLength;
    };

    const counter = basketLength() ? " | " + basketLength() : null;

    return (
        <div className="header">
            <header className="header-wrapper content-wrapper">
                <NavLink to="/" className="logo">
                    <img src={logo} alt="logo" />    
                </NavLink> 
                <nav className="header-menu">
                    <NavLink 
                        to="/pizza"
                        className={({ isActive }) => isActive ? "header-menu__item nav-active" : "header-menu__item"}>Пицца</NavLink> 
                    <NavLink 
                        to="/combos" 
                        className={({ isActive }) => isActive ? "header-menu__item nav-active" : "header-menu__item"}>Комбо</NavLink> 
                    <NavLink 
                        to="/snacks" 
                        className={({ isActive }) => isActive ? "header-menu__item nav-active" : "header-menu__item"}>Закуски</NavLink> 
                    <NavLink 
                        to="/drinks" 
                        className={({ isActive }) => isActive ? "header-menu__item nav-active" : "header-menu__item"}>Напитки</NavLink> 
                    <NavLink 
                        to="/dessert" 
                        className={({ isActive }) => isActive ? "header-menu__item nav-active" : "header-menu__item"}>Десерты</NavLink> 
                    <NavLink 
                        to="/bonusactions" 
                        className={({ isActive }) => isActive ? "header-menu__item nav-active" : "header-menu__item"}>Акции</NavLink> 
                </nav>
                <NavLink to="/basket" className="basket">Корзина {counter}</NavLink>
            </header>
        </div>
    )
}

export default Header;