import { useDispatch, useSelector } from 'react-redux';
import { setCombosItem } from '../../../store/combosSlice';

import './InsideExtraSmallCard.css';


const InsideExtraSmallCard = ({id, img, name, pageName, description, additionally}) => {
    const dispatch = useDispatch();
    const combosItems = useSelector(state => state.combos.combosItems);

    const handleChange = () => {
        const activeItem = combosItems.filter(item => item.isClicked)[0];
        const dough = combosItems.filter(item => item.isClicked)[0].dough;

        const filtredOldCombos = combosItems.filter(item => item.name !== activeItem.name);

        filtredOldCombos.push({
            id: id,
            num: activeItem.num,
            pageName: pageName,
            isClicked: true,
            dough,
            name: name,
            description: description ? description : additionally ? additionally.default.join(', ') : null,
            img: img,
            btns: pageName
        });

        dispatch(setCombosItem(filtredOldCombos.sort((a,b) => a.num - b.num )));
    };

    return (
        <div onClick={handleChange} className="inside-extra-small-card">
            <img src={img} alt={name} />
            <p>{name}</p>
        </div>
    );
}

export default InsideExtraSmallCard;