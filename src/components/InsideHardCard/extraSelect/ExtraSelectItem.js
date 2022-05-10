import { useState } from 'react';
import './ExtraSelect.css';

const ExtraSelectItem = ({id, img, name, cost}) => {
    const [isActive, setIsActive] = useState(false);

    const handleChoise = () => {
        setIsActive(isActive => !isActive);
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