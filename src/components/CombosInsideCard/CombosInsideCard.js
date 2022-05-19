import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import useNum from '../../services/useNum';
import { addNewCombosItem } from '../../store/basketSlice';
import { setCombosItem } from '../../store/combosSlice';
import InsideSmallCard from './InsideSmallCard/InsideSmallCard';
import InsideExtraSmallCard from './InsideExtraSmallCard/InsideExtraSmallCard';

import close from './close.png';

import './CombosInsideCard.css';


const CombosInsideCard = ({setIsVisible, id, name, description, startPrice, startPriceWithSale, imgPreview, combosItem}) => {
    const [someNum] = useNum("combos");
    const dispatch = useDispatch();
    const combosBasketItems = useSelector(state => state.basket.basket.combos);
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
                        dough: "traditional",
                        isClicked: false,
                        name: pizza[i].name,
                        description: pizza[i].additionally.default.join(', '),
                        img: pizza[i].img,
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

    const content = combosItems.map((item,ind) => <InsideSmallCard key={item.num + ind} 
                                                            isClicked={item.isClicked} 
                                                            name={item.name} 
                                                            description={item.description} 
                                                            img={item.img} 
                                                            btns={item.btns} dough={item.dough} />
    ); 

    const isVisible = combosItems.filter(item => item.isClicked).length > 0;

    const activeItem = isVisible ? combosItems.filter(item => item.isClicked)[0].pageName : null;
    const activeItemDough = isVisible ? combosItems.filter(item => item.isClicked)[0].dough : null;

    const activeItemsChange = (activeItem) => {
        switch (activeItem) {
            case "pizza":
                return pizza.map((item, ind) => <InsideExtraSmallCard
                        key={item.id + ind} 
                        {...item} 
                        img={activeItemDough ? item.img[activeItemDough] : item.img.traditional} pageName="pizza" />);
            case "drinks":
                return drinks.map((item, ind) => <InsideExtraSmallCard 
                        key={item.id + ind} 
                        {...item} 
                        pageName="drinks" />);
            case "dessert":
                return dessert.slice(0,2).map(item => <InsideExtraSmallCard 
                        key={item.id} 
                        {...item} 
                        pageName="dessert" />);
        
            default:
                break;
        }
    };

    const sendToBasket = () => {
        const currentDescription = combosItems.map(item => {
            const chekedDough = item.dough ? {dough: item.dough} : null;

            return {
                name: item.name,
                ...chekedDough,
            }
        });

        const toBasket = {
            key: v4(),
            id,
            img: imgPreview,
            name,
            cost: startPriceWithSale,
            count: 1,
            description,
            descr: currentDescription,
            pageName: "combos",
            num: someNum() + 1
        };

        let filtred = false;

        const oldBasket = combosBasketItems.map(item => {
            if (item.descr.length === toBasket.descr.length) {
                const check = [];

                for (let i = 0; i < item.descr.length; i++) {
                    if (item.descr[i].name === toBasket.descr[i].name && item.descr[i].dough === toBasket.descr[i].dough) {
                        check.push(1);
                    } else {
                        check.push(0);
                    }
                }

                if (check.includes(0)) {
                    return item;
                } else {
                    filtred = true;

                    return {
                        ...item,
                        count: item.count + 1
                    };
                }
            } else {
                return item;
            }
        });

        if (filtred) {
            dispatch(addNewCombosItem(oldBasket));  
        } else {
            const oldBaskets = combosBasketItems.slice();
            oldBaskets.push(toBasket);
            dispatch(addNewCombosItem(oldBaskets));  
        }

        hidePortal();
    };

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
                    <button onClick={sendToBasket} className="combos-inside-card__btn">В корзину</button>
                </div>
            </div>

        </div>
    );
}

export default CombosInsideCard;