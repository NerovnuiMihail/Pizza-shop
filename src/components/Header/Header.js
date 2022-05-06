import { NavLink } from "react-router-dom";
import logo from './logo.png';
import './Header.css';


const Header = () => {
    return (
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
            <NavLink to="/basket" className="basket">Корзина</NavLink>
        </header>
    )
}

export default Header;