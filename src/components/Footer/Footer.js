import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import './Footer.css';


const Footer = () => {
    const [prevIncome, setPrevIncome] = useState(null);
    const [incomeNow, setIncomeNow] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/api/popular/income")
            .then(res => res.json())
            .then(data => {
                setPrevIncome(data.prevIncome);
                setIncomeNow(data.incomeNow);
            })
            .catch(err => console.log("Ошибка запроса дохода магазина", err))
    }, []);

    return (
        <footer>
            <div className="footer-wrapper content-wrapper">
                <nav className="footer-menu">
                    <Link 
                        to="/pizza"
                        className="footer-menu__item">Пицца</Link> 
                    <Link 
                        to="/combos" 
                        className="footer-menu__item">Комбо</Link> 
                    <Link 
                        to="/snacks" 
                        className="footer-menu__item">Закуски</Link> 
                    <Link 
                        to="/drinks" 
                        className="footer-menu__item">Напитки</Link> 
                    <Link 
                        to="/dessert" 
                        className="footer-menu__item">Десерты</Link> 
                    <Link 
                        to="/bonusactions" 
                        className="footer-menu__item">Акции</Link> 
                </nav>
                <div className="footer-contacts">
                    <div>Контакты:</div>
                    <ul>
                        <li>+7 800 777 66 55</li>
                        <li>nmy.webdev@gmail.com</li>
                        <li>Воронеж</li>
                    </ul>
                </div>
                <div className="footer-total">
                    <div>Выручка в прошлом месяце: {prevIncome} рублей</div>
                    <div>Выручка в текущем месяце: {incomeNow} рублей</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;