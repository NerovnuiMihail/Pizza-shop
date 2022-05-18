import { useDispatch, useSelector } from 'react-redux';
import { setCombosItem } from '../../../store/combosSlice';

import './InsideSmallCard.css';

const InsideSmallCard = ({name, description, img, isClicked, btns}) => {
    const dispatch = useDispatch();
    const combosItems = useSelector(state => state.combos.combosItems);
    
    const handleClicked = () => {
        if (isClicked) {
            const offClickedOldItems = combosItems.map(item => {
                return {
                    ...item,
                    isClicked: false
                }
            });

            dispatch(setCombosItem(offClickedOldItems));

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

    return (
        <div 
            onClick={handleClicked} 
            className={isClicked ? "inside-small-card__wrapper inside-small-card__active" : "inside-small-card__wrapper"}
            style={isClicked && btns !== "pizza" ? {height: "120px"} : null}>
            <div className="inside-small-card__img">
                <img src={img} alt={name} />
            </div>
            <div className="inside-small-card__content">
                <div className="inside-small-card__title"> {name} </div>
                <div className="inside-small-card__dough"></div>
                <div className="inside-small-card__descr"> {description} </div>

                {!isClicked ? ( 
                    <button className="inside-small-card__btn">Изменить</button> 
                ) : btns !== "pizza" ? null : (
                    <div className="dough__btns">
                        <button className="dough__btns-left dough__btns-active">Традиционное</button>
                        <button className="dough__btns-rigth">Тонкое</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InsideSmallCard;