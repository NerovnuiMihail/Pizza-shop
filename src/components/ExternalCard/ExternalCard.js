import { useState } from 'react';
import Portal from '../Portal/Portal';

import './ExternalCard.css';


const ExternalCard = ({img, title, weight, description, cost, btnName, Inside}) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = (e) => {
        if (e.target.localName !== 'button') {
            document.querySelector('#modal-root').style.display = 'block';
            document.body.style.overflow = 'hidden';
            setIsVisible(true);
        }
    }

    return (
        <>
            <div onClick={handleClick} className="ExternalCard">
                <div className="ExternalCard__main">
                    <div className='ExternalCard__img'>
                        <img src={img} alt={title} />
                    </div>
                    <h2>{title}</h2>
                    <p className='ExternalCard__description'>{description}</p>
                </div>
                <div className='ExternalCard__footer'>
                    <p className='ExternalCard__cost'>{cost} &#x20bd; </p>
                    <button>{btnName}</button>
                </div>
            </div>

            {!isVisible ? null : (
                <Portal>
                    <Inside 
                        setIsVisible={setIsVisible} 
                        img={img} 
                        title={title} 
                        weight={weight} 
                        description={description} 
                        cost={cost} />
                </Portal>
            )}
        </>
    )
}

export default ExternalCard;