import { useEffect } from 'react';
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InsideHardCard from '../../components/InsideHardCard/InsideHardCard';

import './PizzaPage.css';

const PizzaPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData();

    useEffect(() => {
        getRequest('http://localhost:3001/api/pizza');
         // eslint-disable-next-line
    }, []);

    const cards = !data.pizza ? null : data.pizza.map(({id, name, img, calories, additionally, price}) => {
        const image = img.traditional;
        const description = additionally.default.slice().join(',');
        const cost = price[25];

        return <ExternalCard key={id} 
                Inside={InsideHardCard}
                img={image} 
                image={img}
                calories={calories}
                title={name}
                description={description} 
                cost={`от ${cost}`} 
                price={price}
                btnName="Выбрать" />
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <main className="content-wrapper pizza-page">
            {head ? <h1>Часто заказывают:</h1> : null}
            <section className="pizza-content">
                {errorMessage}
                {loadingData}
                {cards}
            </section>
        </main>
    )
}

export default PizzaPage;