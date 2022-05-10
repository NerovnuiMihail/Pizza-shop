import {v4} from 'uuid';

function addFiltredPizzaToBasket(store, basketObj) {
    const extaBasket = basketObj.extra.slice().join(',');
    let newItemBasket;

    const findItem = store.filter(fItem => {
        const extraStore = fItem.extra.slice().join(',');

        if (fItem.name === basketObj.name &&
            fItem.cost === basketObj.cost &&
            fItem.dough === basketObj.dough &&
            fItem.size === basketObj.size &&
            extraStore === extaBasket
        ) {
            return true;
        } else {
            return false;
        }
    });

    const anotherItems = store.filter(aItem => {
        const extraStore = aItem.extra.slice().join(',');

        if (aItem.name !== basketObj.name ||
            aItem.cost !== basketObj.cost ||
            aItem.dough !== basketObj.dough ||
            aItem.size !== basketObj.size ||
            extraStore !== extaBasket
        ) {
            return true;
        } else {
            return false;
        }
    });

    if (findItem.length) {
        const counter = findItem[0].count;

        newItemBasket = {
            ...findItem[0],
            count: counter + 1
        };
    } else {
        newItemBasket = {
            key: v4(),
            ...basketObj
        }
    }

    return [...anotherItems, newItemBasket];
}

export default addFiltredPizzaToBasket;