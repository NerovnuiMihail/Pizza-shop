import {v4} from 'uuid';

function addItemWithFilterToBasket(store, basketObj) {
    const findItem = store.filter(fItem => fItem.name === basketObj.name);
    const anotherItems = store.filter(aItem => aItem.name !== basketObj.name);
    let newItemBasket;

    if (findItem.length > 0) {
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

export default addItemWithFilterToBasket;