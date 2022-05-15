import { useState } from 'react';
import Portal from '../../Portal/Portal';

import './SlideItem.css';

const SlideItem = ({id, img, name, pageName, Inside, data}) => {
    const [isVisible, setIsVisible] = useState(false);

    const image = typeof(img) === "string" ? img : img.traditional;
    const itemForInside = data.filter(item => item.id === id)[0];

    const handleClick = () => {
        document.querySelector('#modal-root').style.display = 'block';
        document.querySelector('.header').style.marginRight = "17px";
        document.body.style.overflow = 'hidden';
        setIsVisible(true);
    }

    return (
        <>
            <div onClick={handleClick} className="slide-item">
                <img src={image} alt={name} className="slide-item__img" />
                <div className="slide-item__title"> {name} </div>
            </div>
        
            {!isVisible ? null : (
                <Portal>
                    <Inside 
                        setIsVisible={setIsVisible} 
                        {...itemForInside}
                        pageName={pageName}/>
                </Portal>
            )}
        </>
    );
}

export default SlideItem;