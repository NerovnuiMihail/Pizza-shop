import { useState, useCallback } from "react";
import {useDispatch,useSelector} from "react-redux";
import {
    setPizzaData, 
    setDessertData, 
    setDrinksData, 
    setSnacksData, 
    setBonusData, 
    setExtraData 
} from "../store/shopSlice";


function useApiData(TITLE) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.shop[TITLE]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getRequest = useCallback(async(url) => {
        if (data.length) {
            return;
        } else {
            try {
                setLoading(true);
                const request = await fetch(url);
                const response = await request.json();
                setLoading(false);
    
                switch (TITLE) {
                    case "dessert":
                        dispatch(setDessertData(response));
                        break;
                    case "pizza":
                        dispatch(setPizzaData(response));
                        break;
                    case "drinks":
                        dispatch(setDrinksData(response));
                        break;
                    case "snacks":
                        dispatch(setSnacksData(response));
                        break;
                    case "bonus":
                        dispatch(setBonusData(response));
                        break;
                    case "extra":
                        dispatch(setExtraData(response));
                        break;
                
                    default:
                        break;
                }
    
            } catch (error) {
                setError(true);
                setLoading(false);
                throw new Error('Беда! Не работает!');
            }
        }
    // eslint-disable-next-line
    }, [])

    return [
        data,
        loading,
        error,
        getRequest
    ];
}

export default useApiData;