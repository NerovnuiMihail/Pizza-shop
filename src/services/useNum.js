import { useSelector } from 'react-redux';

const useNum = (pageName) => {
    const pizzaItems = useSelector(state => state.basket.basket.pizza);
    const combosItems = useSelector(state => state.basket.basket.combos);
    const snacksItems = useSelector(state => state.basket.basket.snacks);
    const drinksItems = useSelector(state => state.basket.basket.drinks);
    const dessertItems = useSelector(state => state.basket.basket.dessert);

    const num = {
        pizza: pizzaItems.length,
        snacks: snacksItems.length,
        drinks: drinksItems.length,
        dessert: dessertItems.length,
        combos: combosItems.length
    };

    const someNum = () => {
        return num[pageName];
    }

    return [
        someNum
    ];
}

export default useNum;