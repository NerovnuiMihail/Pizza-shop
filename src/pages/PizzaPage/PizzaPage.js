import { useEffect } from 'react';
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import './PizzaPage.css';

const PizzaPage = () => {
    const [data, loading, error, getRequest] = useApiData();

    useEffect(() => {
        getRequest('http://localhost:3001/api/pizza');
         // eslint-disable-next-line
    }, []);

    const cards = !data.pizza ? null : data.pizza.map(({id, name, img, additionally, price}) => {
        const image = img.traditional;
        const description = additionally.default.slice().join(',');
        const cost = price[25];

        return <ExternalCard key={id} 
                img={image} 
                title={name}
                description={description} 
                cost={`от ${cost}`} 
                btnName="Выбрать" />
    });

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <main className="content-wrapper pizza-page">
            <h1>Часто заказывают:</h1>
            <section className="pizza-content">
                {errorMessage}
                {loadingData}
                {cards}
            </section>
        </main>
    )
}

export default PizzaPage;