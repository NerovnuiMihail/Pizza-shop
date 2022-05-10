import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeSelectExtra, setCostExtra } from '../../../store/basketSlice';
import './ExtraSelect.css';

const ExtraSelectItem = ({id, img, name, cost}) => {
    const [isActive, setIsActive] = useState(false);
    const selectExtra = useSelector(state => state.basket.basket.selectExtra);
    const costExtra = useSelector(state => state.basket.basket.costExtra);
    const dispatch = useDispatch();

    const handleChoise = () => {
        setIsActive(isActive => !isActive);

        if (!isActive) {
            const selectItem = [...selectExtra, name];
            dispatch(ChangeSelectExtra(selectItem));
            dispatch(setCostExtra(+costExtra + (+cost)));
        } else {
            const selectItem = [...selectExtra.filter(item => item !== name)];
            dispatch(ChangeSelectExtra(selectItem));
            dispatch(setCostExtra(+costExtra - (+cost)));
        }
    }

    return (
        <div 
            onClick={handleChoise} 
            className={isActive ? "extra-select__cards-item extra-active" : "extra-select__cards-item"}>
            <div>
                <img src={img} alt={name} className="extra-select__img" />
                <p className="extra-select__descr">{name}</p>
            </div>
            <p className="extra-select__cost">{cost} &#x20bd;</p>
        </div>
    );
}


export default ExtraSelectItem;