import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { setCombosItem } from '../../../store/combosSlice';

import './InsideSmallCard.css';

const InsideSmallCard = ({name, description, img, isClicked, btns, dough}) => {
    const dispatch = useDispatch();
    const combosItems = useSelector(state => state.combos.combosItems);

    const traditionalRef = useRef(null);
    const thinRef = useRef(null);
    
    const handleClicked = (e) => {

        if (isClicked) {
            if (e.target === traditionalRef.current) {
                const doughItem = combosItems.map(item => {
                    if (item.name === name) {
                        return {
                            ...item,
                            dough: "traditional"
                        }
                    } else {
                        return item;
                    }
                });
                dispatch(setCombosItem(doughItem));
            }
            if (e.target === thinRef.current) {
                const doughItem = combosItems.map(item => {
                    if (item.name === name) {
                        return {
                            ...item,
                            dough: "thin"
                        }
                    } else {
                        return item;
                    }
                });
                dispatch(setCombosItem(doughItem));
            }
            if (e.target !== traditionalRef.current && e.target !== thinRef.current) {
                const offClickedOldItems = combosItems.map(item => {
                    return {
                        ...item,
                        isClicked: false
                    }
                });
    
                dispatch(setCombosItem(offClickedOldItems));   
            }

        } else {
            const offClickedOldItems = combosItems.map(item => {
                if (item.name === name) {
                    return {
                        ...item,
                        isClicked: true
                    }
                } else {
                    return {
                        ...item,
                        isClicked: false
                    }
                }
            });

            dispatch(setCombosItem(offClickedOldItems));
        }
    };

    const image = typeof img === "string" ? img : dough === "traditional" ? img.traditional : img.thin;

    return (
        <div 
            onClick={handleClicked} 
            className={isClicked ? "inside-small-card__wrapper inside-small-card__active" : "inside-small-card__wrapper"}
            style={isClicked && btns !== "pizza" ? {height: "120px"} : null}>
            <div className="inside-small-card__img">
                <img src={image} alt={name} />
            </div>
            <div className="inside-small-card__content">
                <div className="inside-small-card__title"> {name} </div>
                <div className="inside-small-card__dough"></div>
                <div className="inside-small-card__descr"> {description} </div>

                {!isClicked ? ( 
                    <button className="inside-small-card__btn">Изменить</button> 
                ) : btns !== "pizza" ? null : (
                    <div className="dough__btns">
                        <button ref={traditionalRef} className={dough === "traditional" ? "dough__btns-left dough__btns-active" : "dough__btns-left"}>Традиционное</button>
                        <button ref={thinRef} className={dough === "thin" ? "dough__btns-rigth dough__btns-active" : "dough__btns-rigth"}>Тонкое</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InsideSmallCard;