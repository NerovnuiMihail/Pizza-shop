import { useState, useCallback } from "react";
import {useDispatch,useSelector} from "react-redux";
import {
    addPopularPizza,
    addPopularDessert,
    addPopularDrinks,
    addPopularSnacks,
    addPopularCombos
} from "../store/popularSlice";

function useApiPopular(TITLE) {
    const dispatch = useDispatch();
    const popular = useSelector(state => state.popular[TITLE]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const getPopular = useCallback(async () => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3001/api/popular/${TITLE}`);

        if (!response.ok) {
            setIsError(true);
            throw new Error('Ошибка при загрузке данных!')
        }

        const data = await response.json();

        switch (TITLE) {
            case "dessert":
                setIsLoading(false);
                dispatch(addPopularDessert(data));
                break;
            case "pizza":
                setIsLoading(false);
                dispatch(addPopularPizza(data));
                break;
            case "drinks":
                setIsLoading(false);
                dispatch(addPopularDrinks(data));
                break;
            case "snacks":
                setIsLoading(false);
                dispatch(addPopularSnacks(data));
                break;
            case "combos":
                setIsLoading(false);
                dispatch(addPopularCombos(data));
                break;
        
            default:
                break;
        }
    // eslint-disable-next-line
    }, []);

    return [popular, isLoading, isError, getPopular];
}

export default useApiPopular;