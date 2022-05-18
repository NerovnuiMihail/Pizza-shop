import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCombosItem } from '../../store/combosSlice';
import InsideSmallCard from './InsideSmallCard/InsideSmallCard';
import InsideExtraSmallCard from './InsideExtraSmallCard/InsideExtraSmallCard';

import close from './close.png';

import './CombosInsideCard.css';


const CombosInsideCard = ({setIsVisible, id, name, description, startPrice, startPriceWithSale, imgPreview, combosItem}) => {
    const dispatch = useDispatch();

    const pizza = useSelector(state => state.shop.pizza);
    const dessert = useSelector(state => state.shop.dessert);
    const drinks = useSelector(state => state.shop.drinks);
    const combosItems = useSelector(state => state.combos.combosItems);

    useEffect(() => {
        const currentContent = [];

        combosItem.forEach((item,ind) => {
            if (item.pizza) {
                for (let i = 0; i < item.pizza; i++) {
                    currentContent.push({
                        id: pizza[i].id,
                        num: ind + 1 + pizza.length + i,
                        pageName: "pizza",
                        isClicked: false,
                        name: pizza[i].name,
                        description: pizza[i].additionally.default.join(', '),
                        img: pizza[i].img.traditional,
                        btns: "pizza"
                    });
                }
            } else if (item.drinks) {
                for (let i = 0; i < item.drinks; i++) {
                    currentContent.push({
                        id: drinks[i].id,
                        num: ind + i + drinks.length * 2,
                        pageName: "drinks",
                        isClicked: false,
                        name: drinks[i].name,
                        description: drinks[i].description,
                        img: drinks[i].img,
                        btns: "drinks"
                    });
                }
            } else if (item.dessert) {
                for (let i = 0; i < item.dessert; i++) {
                    currentContent.push({
                        id: dessert[i].id,
                        num: ind + 1 + dessert.length%3,
                        pageName: "dessert",
                        isClicked: false,
                        name: dessert[i].name,
                        description: dessert[i].description,
                        img: dessert[i].img,
                        btns: "dessert"
                    });
                }
            }
        });

        dispatch(setCombosItem(currentContent));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
        }
        // eslint-disable-next-line
    }, []);

    const hidePortal = () => {
        document.body.style.overflow = "";
        document.querySelector('#modal-root').style.display = "none";
        document.querySelector('.header').style.marginRight = "";
        setIsVisible(false);
    };

    const handleClick = (e) => {
        if (e.target.classList.contains("combos-inside-card__close") || e.target.id === "modal-root") {
            hidePortal();
        }
    };

    const content = combosItems.map(item => <InsideSmallCard key={item.name} 
                                                            isClicked={item.isClicked} 
                                                            name={item.name} 
                                                            description={item.description} 
                                                            img={item.img} 
                                                            btns={item.btns} />
    ); 

    const isVisible = combosItems.filter(item => item.isClicked).length > 0;

    const activeItem = isVisible ? combosItems.filter(item => item.isClicked)[0].pageName : null;

    const activeItemsChange = (activeItem) => {
        switch (activeItem) {
            case "pizza":
                return pizza.map(item => <InsideExtraSmallCard key={item.id} {...item} img={item.img.traditional} pageName="pizza" />);
            case "drinks":
                return drinks.map(item => <InsideExtraSmallCard key={item.id} {...item} pageName="drinks" />);
            case "dessert":
                return dessert.slice(0,2).map(item => <InsideExtraSmallCard key={item.id} {...item} pageName="dessert" />);
        
            default:
                break;
        }
    }

    // console.log(combosItems);
    // console.log(activeItem);

    // добавить информирование о добавлении в корзину

    return (
        <div className="combos-inside-card-wrapper">

            <div className="combos-inside-card__imgs">

                {!isVisible ? (
                        <div className="combos-inside-card__preview">
                            <img src={imgPreview} alt={name} />
                        </div>
                            ) : (
                        <div className="combos-inside-card__all-items">
                            {activeItemsChange(activeItem)}
                        </div>
                )}

            </div>

            <div className="combos-inside-card__descr">
                <img src={close} alt="close" className="combos-inside-card__close" />
                <h2 className="combos-inside-card__descr-title">{name}</h2>
                <p className="combos-inside-card__descr-description"> {description} </p>

                <div className="combos-inside-card__descr-content">
                    {content}
                </div>

                <div className="combos-inside-card__descr-footer">
                    <div className="combos-inside-card__price combos-price">
                        <div className="combos-price__sale"> {startPriceWithSale} &#x20bd;</div>
                        <div className="combos-price__whitout-sale"> {startPrice} &#x20bd;</div>
                    </div>
                    <button className="combos-inside-card__btn">В корзину</button>
                </div>
            </div>

        </div>
    );
}

export default CombosInsideCard;