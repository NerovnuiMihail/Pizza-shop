import { useState } from 'react';
import Portal from '../Portal/Portal';

import './ExternalCard.css';


const ExternalCard = ({img, image, price, cost, name, description, btnName, Inside, ...props}) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = (e) => {
        if (e.target.localName !== 'button') {
            document.querySelector('#modal-root').style.display = 'block';
            document.querySelector('.header').style.marginRight = "17px";
            document.body.style.overflow = 'hidden';
            setIsVisible(true);
        }
    }

    return (
        <>
            <div onClick={handleClick} className="ExternalCard">
                <div className="ExternalCard__main">
                    <div className='ExternalCard__img'>
                        <img src={image ? image : img} alt={name} />
                    </div>
                    <h2>{name}</h2>
                    <p className='ExternalCard__description'>{description}</p>
                </div>
                <div className='ExternalCard__footer'>
                    <p className='ExternalCard__cost'>{cost ? cost : price} &#x20bd; </p>
                    <button>{btnName}</button>
                </div>
            </div>

            {!isVisible ? null : (
                <Portal>
                    <Inside 
                        setIsVisible={setIsVisible} 
                        {...props}
                        img={img} 
                        image={image}
                        name={name} 
                        description={description} 
                        price={price} />
                </Portal>
            )}
        </>
    )
}

export default ExternalCard;